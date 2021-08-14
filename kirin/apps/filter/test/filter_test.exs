defmodule FilterTest do
  use ExUnit.Case
  doctest Filter

  test "greets the world" do
    assert Filter.hello() == :world
  end
end
