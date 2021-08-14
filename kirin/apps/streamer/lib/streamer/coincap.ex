defmodule Streamer.Coincap do
  use WebSockex
  require Logger

  alias Streamer.TradeEvent

  @base_url "wss://ws.coincap.io/trades/"
  def start_link(exchange) do
    WebSockex.start_link(@base_url <> exchange, __MODULE__, nil)
  end

  def handle_frame({_type, msg}, state) do
    case Jason.decode(msg) do
      {:ok, event} ->
        process_event(event)

      {:error, _} ->
        Logger.error("Unable to parse msg: #{msg}")
    end

    {:ok, state}
  end

  defp process_event(event) do
    trade_event = TradeEvent.new(event)

    Logger.debug(
      "Trade event received " <>
        "#{trade_event.pair}@#{trade_event.price}"
    )

    Phoenix.PubSub.broadcast(
      Streamer.PubSub,
      "TRADE_EVENTS:#{trade_event.exchange}",
      trade_event
    )
  end
end
