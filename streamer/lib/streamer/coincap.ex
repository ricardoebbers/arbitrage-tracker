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
        trade_event = TradeEvent.new(event)

        Logger.debug(
          "Trade event received " <>
            "#{trade_event.pair}@#{trade_event.price}"
        )

      {:error, _} ->
        Logger.error("Unable to parse msg: #{msg}")
    end

    {:ok, state}
  end
end
