defmodule SlingWeb.Router do
  use SlingWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug Sling.Auth.Pipeline
  end

  scope "/api", SlingWeb do
    pipe_through :api

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/Sessions/refresh", SessionController, :refresh
    resources "/users", UserController, only: [:create]
  end
end
