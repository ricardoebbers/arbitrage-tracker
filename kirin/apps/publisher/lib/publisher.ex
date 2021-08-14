defmodule Publisher do
  @moduledoc """
  Documentation for `Publisher`.
  """

  alias Publisher.Scheduler

  def publish(exchange) when is_binary(exchange), do: Scheduler.start_link(exchange)

  def publish(exchanges) when is_list(exchanges) do
    exchanges
    |> Enum.map(&publish/1)
  end
end
