defmodule SlingWeb.SessionController do
  use SlingWeb, :controller

  alias Sling.Accounts
  alias Sling.Auth.Guardian

  def create(conn, params) do
    case authenticate(params) do
      {:ok, user} ->
        conn = Guardian.Plug.sign_in(conn, user)
        token = Guardian.Plug.current_token(conn)

        IO.puts("got USer")

        conn
        |> put_status(:created)
        |> render("show.json", user: user, token: token)

      {:error, _} ->
        IO.puts("NO USER FOUND")

        conn
        |> put_status(:unauthorized)
        |> render("error.json", error: "email or password")
    end
  end

  def authenticate(%{"email" => email, "password" => password}) do
    Accounts.authenticate_by_email_and_pass(email, password)
  end
end
