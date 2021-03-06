# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :sling,
  ecto_repos: [Sling.Repo]

# Configures the endpoint
config :sling, SlingWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "S1z8UDR/EkgOwIIZMh6q+RDRX3hsJV0+XGtSQ/xjLwsmJG6MxVi3qaumq3pclCuF",
  render_errors: [view: SlingWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Sling.PubSub, adapter: Phoenix.PubSub.PG2]

config :sling, Sling.Auth.Guardian,
  issuer: "sling",
  ttl: {30, :days}

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
