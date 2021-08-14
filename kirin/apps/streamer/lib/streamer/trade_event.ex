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

  def merge_volumes(first, nil) do
    first
  end

  def merge_volumes(first = %TradeEvent{}, second = %TradeEvent{}) do
    %TradeEvent{
      exchange: first.exchange,
      pair: first.pair,
      price: first.price,
      volume: first.volume + second.volume,
      timestamp: first.timestamp,
      priceUsd: first.priceUsd
    }
  end
end
