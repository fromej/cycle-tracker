#!/bin/sh
# backend/docker-entrypoint.sh

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Optional: Wait for the database ---
# In a real deployment, the database might not be ready immediately
# when the application container starts. It's good practice to wait.
# This requires a tool like 'nc' (netcat).
# You would need to parse your DATABASE_URL environment variable
# to get the host and port. Example assumes a PostgreSQL URL.
#
# Example using 'nc' (requires 'netcat-openbsd' package in Alpine):
# DB_HOST=$(echo $DATABASE_URL | sed -e 's/.*@//' -e 's/:.*//')
# DB_PORT=$(echo $DATABASE_URL | sed -e 's/.*://' -e 's/\/.*//')
#
# echo "Waiting for database at $DB_HOST:$DB_PORT..."
# while ! nc -z $DB_HOST $DB_PORT; do
#   sleep 0.5 # wait for half a second before retrying
# done
# echo "Database started."
# --- End Optional Wait ---


# Set the FLASK_APP environment variable for the 'flask' command
# This tells the 'flask' command how to find your application factory
export FLASK_APP=app:create_app\(\)

# Run database migrations
echo "Running database migrations..."
# The 'flask' command uses the FLASK_APP env var to find your app
# and should be in the PATH from the venv
/app/.venv/bin/python -m flask db upgrade
echo "Migrations complete."


# Execute the main command (this replaces the entrypoint script process)
# "$@" expands to all arguments passed to the script (which will be the gunicorn command)
echo "Executing command: exec $@"
exec "$@"