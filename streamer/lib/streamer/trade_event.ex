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
end
