defmodule Streamer.DynamicStreamerSupervisor do
  use DynamicSupervisor

  require Logger

  def start_link(init_arg) do
    DynamicSupervisor.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  def init(_init_arg) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  def autostart_streaming do
    fetch_exchanges()
    |> Enum.map(&start_streaming/1)
  end

  def start_streaming(exchange) when is_binary(exchange) do
    case get_pid(exchange) do
      nil ->
        Logger.info("Starting streaming on #{exchange}")
        {:ok, _pid} = start_streamer(exchange)

      pid ->
        Logger.warn("Streaming on #{exchange} already started")
        {:ok, pid}
    end
  end

  def stop_streaming(exchange) when is_binary(exchange) do
    case get_pid(exchange) do
      nil ->
        Logger.warn("Streaming on #{exchange} already stopped")

      pid ->
        Logger.info("Stopping streaming on #{exchange}")

        :ok =
          DynamicSupervisor.terminate_child(
            Streamer.DynamicStreamerSupervisor,
            pid
          )
    end
  end

  defp get_pid(exchange) do
    Process.whereis(:"Elixir.Streamer.Coincap-#{exchange}")
  end

  defp start_streamer(exchange) do
    DynamicSupervisor.start_child(
      Streamer.DynamicStreamerSupervisor,
      {Streamer.Coincap, exchange}
    )
  end

  defp fetch_exchanges(), do: Application.fetch_env!(:streamer, :exchanges)
end
