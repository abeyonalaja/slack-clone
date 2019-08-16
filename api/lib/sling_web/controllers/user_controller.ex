defmodule SlingWeb.UserController do
  use SlingWeb, :controller

  alias Sling.Accounts
  alias Sling.Accounts.User

  action_fallback SlingWeb.FallbackController

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.register_user(user_params) do
      conn = Sling.Auth.Guardian.Plug.sign_in(conn, user)
      token = Guardian.Plug.current_token(conn)

      conn
      |> put_status(:created)
      |> put_view(SlingWeb.SessionView)
      |> render("show.json", user: user, jwt: token)
    else
      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unauthorized)
        |> put_view(SlingWeb.ChangesetView)
        |> render("error.json", %{changeset: changeset})
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
