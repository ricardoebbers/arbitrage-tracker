defmodule Publisher.AMQP do
  @expiration 60_000
  @queue "arbitrage"

  def publish(nil), do: {:pass}

  def publish(events) do
    case AMQP.Application.get_channel(:mychan) do
      {:ok, chan} ->
        AMQP.Queue.declare(chan, @queue, durable: true)
        AMQP.Basic.publish(chan, "", @queue, Jason.encode!(events), expiration: @expiration)

      _ ->
        :pass
    end
  end
end
