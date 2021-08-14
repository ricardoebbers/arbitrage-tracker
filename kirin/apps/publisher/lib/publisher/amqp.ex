defmodule Publisher.AMQP do
  alias Streamer.TradeEvent

  @expiration 900_000

  def publish(nil), do: {:pass}

  def publish(event = %TradeEvent{exchange: exchange, pair: pair}) do
    case AMQP.Application.get_channel(:mychan) do
      {:ok, chan} ->
        queue = "#{exchange}.#{pair}"
        AMQP.Queue.declare(chan, queue, durable: true)
        message = Jason.encode!(event)
        AMQP.Basic.publish(chan, "", queue, message, expiration: @expiration)

      _ ->
        :pass
    end
  end
end
