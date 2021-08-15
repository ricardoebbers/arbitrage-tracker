defmodule Streamer do
  @moduledoc """
  Documentation for `Streamer`.
  """

  alias Streamer.DynamicStreamerSupervisor

  defdelegate start_streaming(exchange), to: DynamicStreamerSupervisor
  defdelegate stop_streaming(exchange), to: DynamicStreamerSupervisor
end
