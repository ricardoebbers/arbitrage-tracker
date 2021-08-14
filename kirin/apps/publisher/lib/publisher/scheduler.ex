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
    state
    |> Enum.reduce(nil, fn event, acc -> TradeEvent.merge_volumes(event, acc) end)
    |> case do
      nil ->
        nil

      event ->
        event
        |> IO.inspect()
        |> Publisher.AMQP.publish()
    end

    Process.send_after(self(), :tick, @one_second)

    {:noreply, []}
  end
end
