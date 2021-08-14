defmodule Publisher do
  @moduledoc """
  Documentation for `Publisher`.
  """

  alias Publisher.Buffer

  def publish(exchange) when is_binary(exchange), do: Buffer.start_link([exchange])

  def publish(exchanges) when is_list(exchanges), do: Buffer.start_link(exchanges)
end
