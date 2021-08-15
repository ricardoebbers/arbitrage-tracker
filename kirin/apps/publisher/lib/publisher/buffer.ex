defmodule Publisher.Buffer do
  use GenServer

  require Logger

  alias Phoenix.PubSub

  alias Streamer.TradeEvent

  @one_second 1000

  def start_link(exchanges) do
    GenServer.start_link(__MODULE__, exchanges, name: :buffer)
  end

  def init(exchanges) do
    exchanges
    |> Enum.map(&subscribe_to_exchange/1)

    Process.send_after(self(), :tick, @one_second)
    {:ok, %{}}
  end

  defp subscribe_to_exchange(exchange) do
    PubSub.subscribe(Kirin.PubSub, "TRADE_EVENTS:#{exchange}")
    exchange
  end

  def handle_info(event = %TradeEvent{exchange: exchange}, state) do
    {:noreply,
     Map.update(state, exchange, [event], fn existing_events -> [event | existing_events] end)}
  end

  def handle_info(:tick, state) do
    Process.send_after(self(), :tick, @one_second)

    Task.start_link(fn -> publish(state) end)

    {:noreply, update_state(state)}
  end

  defp publish(state) do
    state
    |> build_payload()
    |> Publisher.AMQP.publish()
  end

  defp build_payload(state) do
    acc = %{timestamp: :os.system_time(:seconds), events: []}
    Enum.reduce(state, acc, &merge_events/2)
  end

  defp merge_events({_exchange, events}, map) do
    Map.update(map, :events, [], fn other_exchange_events ->
      [merge_volumes(events) | other_exchange_events]
    end)
  end

  defp merge_volumes(events) do
    Enum.reduce(events, &TradeEvent.merge_volumes/2)
  end

  # guarda apenas o último evento de cada exchange e zera os volumes
  defp update_state(state) do
    Enum.reduce(state, %{}, &update_exchange_events/2)
  end

  defp update_exchange_events({exchange, events}, map) do
    Map.put(map, exchange, [hd(events) |> Map.put(:volume, 0)])
  end
end
