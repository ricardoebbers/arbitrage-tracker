defmodule Publisher.MixProject do
  use Mix.Project

  def project do
    [
      app: :publisher,
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
      extra_applications: [:lager, :logger, :amqp],
      mod: {Publisher.Application, []}
    ]
  end

  defp deps do
    [
      {:amqp, "~> 2.1"},
      {:jason, "~> 1.2"},
      {:phoenix_pubsub, "~> 2.0"},
      {:streamer, in_umbrella: true}
    ]
  end
end
