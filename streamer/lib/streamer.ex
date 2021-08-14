defmodule Streamer do
  @moduledoc """
  Documentation for `Streamer`.
  """

  alias Streamer.Coincap

  def start_streaming(exchange) when is_binary(exchange), do: Coincap.start_link(exchange)

  def start_streaming(exchanges) when is_list(exchanges) do
    exchanges
    |> Enum.map(&start_streaming/1)
  end
end
