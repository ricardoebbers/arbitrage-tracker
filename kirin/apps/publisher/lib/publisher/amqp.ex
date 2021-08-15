defmodule Publisher.AMQP do
  require Logger

  def publish(payload = %{events: events}) when length(events) < 2 do
    Logger.warn("Skipping payload with size < 2 : #{inspect(payload)}")
  end

  def publish(payload) do
    queue = fetch_queue_name()
    expiration_time = fetch_expiration_time()

    case AMQP.Application.get_channel() do
      {:ok, chan} ->
        AMQP.Queue.declare(chan, queue, durable: true)
        AMQP.Basic.publish(chan, "", queue, Jason.encode!(payload), expiration: expiration_time)

      _ ->
        Logger.warn("Failed to publish payload to queue '#{queue}': #{inspect(payload)}")
        :pass
    end
  end

  defp fetch_queue_name(), do: Application.fetch_env!(:amqp, :queue_name)

  defp fetch_expiration_time(), do: Application.fetch_env!(:amqp, :expiration_time)
end
