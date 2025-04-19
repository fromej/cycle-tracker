import json

from flask import url_for

from app.models import User


def test_register_success(client, db):
    """Test successful user registration."""
    response = client.post(
        url_for("auth.register"),
        json={
            "username": "newuser",
            "email": "new@example.com",
            "password": "password123",
            "confirm_password": "password123",
        },
    )
    assert response.status_code == 201
    data = response.get_json()
    assert data["username"] == "newuser"
    assert data["email"] == "new@example.com"
    assert "id" in data
    assert "password_hash" not in data  # Ensure password is not returned

    # Verify user exists in db
    user = User.find_by_email("new@example.com")
    assert user is not None
    assert user.username == "newuser"


def test_register_username_taken(client, test_user):
    """Test registration with an existing username."""
    response = client.post(
        url_for("auth.register"),
        json={
            "username": test_user.username,  # Existing username
            "email": "another@example.com",
            "password": "password123",
            "confirm_password": "password123",
        },
    )
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert test_user.username in data["error"]


def test_register_email_taken(client, test_user):
    """Test registration with an existing email."""
    response = client.post(
        url_for("auth.register"),
        json={
            "username": "anotheruser",
            "email": test_user.email,  # Existing email
            "password": "password123",
            "confirm_password": "password123",
        },
    )
    assert response.status_code == 400
    assert test_user.email in response.get_json()["error"]


def test_register_password_mismatch(client, db):
    """Test registration with mismatched passwords."""
    response = client.post(
        url_for("auth.register"),
        json={
            "username": "user3",
            "email": "user3@example.com",
            "password": "password123",
            "confirm_password": "password456",  # Mismatch
        },
    )
    assert response.status_code == 422  # Validation error from schema
    data = response.get_json()
    assert "messages" in data
    assert "confirm_password" in data["messages"]
    assert "Passwords do not match" in data["messages"]["confirm_password"][0]


def test_login_success_email(client, test_user):
    """Test successful login using email."""
    response = client.post(
        url_for("auth.login"),
        json={
            "login": test_user.email,
            "password": "password",  # The correct password set in fixture
        },
    )
    assert response.status_code == 200
    data = response.get_json()
    assert "access_token" in data


def test_login_success_username(client, test_user):
    """Test successful login using username."""
    response = client.post(
        url_for("auth.login"),
        json={"login": test_user.username, "password": "password"},
    )
    assert response.status_code == 200
    assert "access_token" in response.get_json()


def test_login_wrong_password(client, test_user):
    """Test login with incorrect password."""
    response = client.post(
        url_for("auth.login"),
        json={"login": test_user.email, "password": "wrongpassword"},
    )
    assert response.status_code == 401  # AuthenticationError
    data = response.get_json()
    assert "error" in data
    assert "Invalid credentials" in data["error"]


def test_login_user_not_found(client):
    """Test login with non-existent user."""
    response = client.post(
        url_for("auth.login"),
        json={"login": "nosuchuser@example.com", "password": "password"},
    )
    assert response.status_code == 401
    assert "Invalid credentials" in response.get_json()["error"]
