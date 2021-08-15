
FROM elixir:latest

RUN apt-get update && \
    mix local.hex --force && \
    mix local.rebar --force

RUN mkdir /app
WORKDIR /app

COPY mix.exs mix.lock ./
RUN mix do deps.get, deps.compile

COPY . .

CMD ["mix", "run", "--no-halt"]
