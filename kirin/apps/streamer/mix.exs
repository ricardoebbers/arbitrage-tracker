defmodule Streamer.MixProject do
  use Mix.Project

  def project do
    [
      app: :streamer,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {Streamer.Application, []}
    ]
  end

  defp deps do
    [
      {:jason, "~> 1.2"},
      {:phoenix_pubsub, "~> 2.0"},
      {:websockex, "~> 0.4"}
    ]
  end
end
