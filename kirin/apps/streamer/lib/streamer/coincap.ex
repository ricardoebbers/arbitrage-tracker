defmodule Streamer.Coincap do
  use WebSockex
  require Logger

  alias Streamer.{EventFilter, TradeEvent}

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
    event
    |> TradeEvent.new()
    |> EventFilter.filter()
    |> case do
      {:ok, %TradeEvent{} = event} ->
        # Logger.debug("Pushing event from #{event.exchange} - #{event.pair} @ #{event.price} ")

        Phoenix.PubSub.broadcast(
          Kirin.PubSub,
          "TRADE_EVENTS:#{event.exchange}",
          event
        )

      {:pass} ->
        {:ok}
    end
  end
end
