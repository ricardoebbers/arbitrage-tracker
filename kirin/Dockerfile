
FROM elixir:latest

ENV HEX_UNSAFE_HTTPS=1

RUN apt-get update && \
    mix local.hex --force && \
    mix local.rebar --force

RUN mkdir /app
WORKDIR /app

COPY . .
RUN mix do deps.get, deps.compile

CMD ["mix", "run", "--no-halt"]


