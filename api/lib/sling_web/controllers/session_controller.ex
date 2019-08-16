defmodule SlingWeb.SessionController do
  use SlingWeb, :controller

  alias Sling.Accounts
  alias Sling.Auth.Guardian

  def create(conn, params) do
    case authenticate(params) do
      {:ok, user} ->
        conn = Guardian.Plug.sign_in(conn, user)
        token = Guardian.Plug.current_token(conn)
        conn
        |> put_status(:created)
        |> render("show.json", user: user, token: token)
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
    {:ok, claims} = Guardian.Plug.claims(conn)

    case Guardian.refresh!(jwt, claims, %{ttl: {30, :days}}) do
      {:ok, new_jwt, _new_claims} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user, jwt: new_jwt)
      {:error, _reason} ->
        conn
        |> put_status(:unauthorized)
        |> render("forbidden.json", error: "Not authenticated")
    end
  end

  def authenticate(%{"email" => email, "password" => password}) do
    Accounts.authenticate_by_email_and_pass(email, password)
  end
end
