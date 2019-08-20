defmodule SlingWeb.SessionController do
  use SlingWeb, :controller

  alias Sling.Accounts
  alias Sling.Auth.Guardian

  def create(conn, params) do
    case authenticate(params) do
      {:ok, user} ->
        conn = Guardian.Plug.sign_in(conn, user)
        jwt= Guardian.Plug.current_token(conn)
        conn
        |> put_status(:created)
        |> render("show.json", user: user,jwt: jwt)
      {:error, _} ->
        conn
        |> put_status(:unauthorized)
        |> render("error.json", error: "email or password")
    end
  end

  def delete(conn, _) do
    jwt = Guardian.Plug.current_token(conn)
    Guardian.Plug.revoke!(jwt)

    conn
    |> put_status(:ok)
    |> render("delete.json")
  end

  def refresh(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    jwt = Guardian.Plug.current_token(conn)
#    {:ok, claims} = Guardian.Plug.claims(conn)

    IO.puts("JWT USER >>> ")
    IO.inspect(user)
    case Guardian.refresh(jwt) do
      {:ok, _old_jwt, {new_token, new_claims}} ->
      IO.puts("REFRESH")
        conn
        |> put_status(:ok)
        |> render("show.json", user: user, jwt: new_token)
      {:error, _reason} ->
        IO.puts("FAILED")
        conn
        |> put_status(:unauthorized)
        |> render("forbidden.json", error: "Not authenticated")
    end
  end

  def authenticate(%{"email" => email, "password" => password}) do
    Accounts.authenticate_by_email_and_pass(email, password)
  end
end
