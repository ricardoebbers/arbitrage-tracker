
FROM elixir:latest

RUN apt-get update && \
    mix local.hex --force && \
    mix local.rebar --force

RUN mkdir /app
WORKDIR /app

COPY . .
RUN mix do deps.get, deps.compile
ENV HEX_UNSAFE_HTTPS=1
CMD ["mix", "run", "--no-halt"]


