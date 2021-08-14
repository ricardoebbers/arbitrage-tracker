defmodule Publisher.Scheduler do
  use GenServer

  require Logger

  alias Phoenix.PubSub

  alias Streamer.TradeEvent

  @one_second 1000

  def start_link(args) do
    GenServer.start_link(__MODULE__, args, name: "SCHEDULER:#{args}" |> String.to_atom())
  end

  def init(opts) do
    PubSub.subscribe(Kirin.PubSub, "TRADE_EVENTS:#{opts}")
    Process.send_after(self(), :tick, @one_second)
    {:ok, []}
  end

  def handle_info(event = %TradeEvent{}, state) do
    {:noreply, [event | state]}
  end

  def handle_info(:tick, state) do
    last_event =
      state
      |> Enum.reduce(hd(state), fn event, acc -> TradeEvent.merge_volumes(event, acc) end)
      |> Map.put(:timestamp, :os.system_time(:seconds))
      |> IO.inspect()

    Publisher.AMQP.publish(last_event)

    Process.send_after(self(), :tick, @one_second)

    {:noreply, [last_event |> Map.put(:volume, 0)]}
  end
end
