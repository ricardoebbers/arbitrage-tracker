defmodule Publisher.DynamicPublisherSupervisor do
  use DynamicSupervisor

  require Logger

  def start_link(init_arg) do
    DynamicSupervisor.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  def init(_init_arg) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  def autostart_publishing do
    fetch_exchanges()
    |> start_publishing()
  end

  def start_publishing(exchanges) when is_list(exchanges) do
    case get_pid() do
      nil ->
        Logger.info("Starting publishing #{exchanges} events")
        {:ok, _pid} = start_publisher(exchanges)

      pid ->
        Logger.warn("Publishing #{exchanges} events already started")
        {:ok, pid}
    end
  end

  def stop_publishing(exchanges) when is_list(exchanges) do
    case get_pid() do
      nil ->
        Logger.warn("Publishing #{exchanges} events already stopped")

      pid ->
        Logger.info("Stopping publishing #{exchanges} events")

        :ok =
          DynamicSupervisor.terminate_child(
            Publisher.DynamicPublisherSupervisor,
            pid
          )
    end
  end

  defp get_pid() do
    Process.whereis(:buffer)
  end

  defp start_publisher(exchanges) do
    DynamicSupervisor.start_child(
      Publisher.DynamicPublisherSupervisor,
      {Publisher.Buffer, exchanges}
    )
  end

  defp fetch_exchanges(), do: Application.fetch_env!(:publisher, :exchanges)
end
