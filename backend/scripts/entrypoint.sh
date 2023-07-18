set -e

echo "MIGRATING DATABASE..."
python3 manage.py migrate --no-input

echo "COLLECTING STATIC FILES..."
python3 manage.py collectstatic --no-input

echo "STARTING GUNICORN SERVER..."
gunicorn config.wsgi:application -t 36000 --bind :8080
