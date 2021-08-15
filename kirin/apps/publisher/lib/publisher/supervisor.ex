defmodule Publisher.Supervisor do
  use Supervisor

  alias Publisher.DynamicPublisherSupervisor

  def start_link(init_arg) do
    Supervisor.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  def init(_init_arg) do
    children = [
      {DynamicPublisherSupervisor, []},
      {Task, &DynamicPublisherSupervisor.autostart_publishing/0}
    ]

    Supervisor.init(children, strategy: :rest_for_one)
  end
end
