defmodule Publisher.AMQP do
  alias Streamer.TradeEvent

  @expiration 900_000
  @queue "arbitrage"

  def publish(nil), do: {:pass}

  def publish(events) do
    case AMQP.Application.get_channel(:mychan) do
      {:ok, chan} ->
        AMQP.Queue.declare(chan, @queue, durable: true)
        message = Jason.encode!(events)
        AMQP.Basic.publish(chan, "", @queue, message, expiration: @expiration)

      _ ->
        :pass
    end
  end
end
