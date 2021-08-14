defmodule Streamer.EventFilter do
  require Logger

  alias Streamer.TradeEvent
  @wanted_pairs ["bitcoin/usd", "bitcoin/tether", "bitcoin/busd", "bitcoin/usdt"]
  @pair_name "btc/usd"

  def filter(event = %TradeEvent{pair: pair})
      when pair in @wanted_pairs,
      do: {:ok, event |> Map.put(:pair, @pair_name)}

  def filter(_event), do: {:pass}
end
