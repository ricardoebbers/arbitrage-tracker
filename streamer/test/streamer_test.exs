defmodule StreamerTest do
  use ExUnit.Case

  describe "start_streaming/1" do
    test "should start streaming a valid exchange" do
      assert {:ok, _pid} = Streamer.start_streaming("binance")
    end

    test "should start streaming multiple valid exchanges" do
      result = Streamer.start_streaming(["binance", "bitfinex"])
      assert result |> Enum.all?(fn {:ok, pid} -> not is_nil(pid) end)
    end
  end
end
