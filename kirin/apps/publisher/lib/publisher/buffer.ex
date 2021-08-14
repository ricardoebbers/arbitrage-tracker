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
     Map.update(state, exchange, event, fn existing_event ->
       TradeEvent.merge_volumes(existing_event, event)
     end)}
  end

  def handle_info(:tick, state) do
    # %{"binance" => binance_event, "huobi" => huobi_event} => %{timestamp: :os.system_time(:seconds), events: [binance_event, huobi_event]}
    payload =
      state
      |> Enum.reduce(
        %{timestamp: :os.system_time(:seconds), events: []},
        fn {_exchange, event}, acc ->
          Map.update(acc, :events, [], fn existing_events -> [event | existing_events] end)
        end
      )

    Publisher.AMQP.publish(payload)

    # zera os volumes dos eventos
    new_state =
      state
      |> Enum.reduce(%{}, fn {exchange, event}, acc ->
        Map.put(acc, exchange, event |> Map.put(:volume, 0))
      end)

    Process.send_after(self(), :tick, @one_second)

    {:noreply, new_state}
  end
end
