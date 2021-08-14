defmodule Streamer.TradeEvent do
  alias __MODULE__

  @enforce_keys [
    :exchange,
    :pair,
    :price,
    :volume,
    :timestamp,
    :priceUsd
  ]

  @derive Jason.Encoder
  defstruct @enforce_keys

  def new(event) do
    %TradeEvent{
      exchange: event["exchange"],
      pair: event["base"] <> "/" <> event["quote"],
      price: event["price"],
      volume: event["volume"],
      timestamp: event["timestamp"],
      priceUsd: event["priceUsd"]
    }
  end

  def merge_volumes(first = %TradeEvent{}, second = %TradeEvent{}) do
    %TradeEvent{
      exchange: second.exchange,
      pair: second.pair,
      price: second.price,
      volume: second.volume + first.volume,
      timestamp: second.timestamp,
      priceUsd: second.priceUsd
    }
  end
end
