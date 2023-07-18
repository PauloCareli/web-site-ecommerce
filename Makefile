install:
	@pip install -r ./backend/requirements.txt

check:
	@black --check --diff ./backend/

format:
	@black .

test:
	@docker compose -f compose-test.yaml up --build --remove-orphans --exit-code-from backend-tests

run:
	@docker compose -f compose.yaml up --build --remove-orphans