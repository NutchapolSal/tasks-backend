# Tasks Backend

## Running

1. Download zip from Releases
2. Extract into a folder
3. Edit environment variables and build arguments for each service in included `docker-compose.yaml`
4. `docker compose up` in folder with `docker-compose.yaml`

## Key Architectural decisions

- code is split into 3 modules:
    - `users`: database manipulation for user data
    - `tasks`: handle tasks
    - `auth`: authentication and authorization
- uses a combination Access-Refresh JWT token, allowing tokens to be used to obtain a new token before expiry
    - support for clearing sessions by checking `iat`
    - tokens are checked with database only on `/auth` routes, reducing database load
- routes take advantage of HTTP methods available, and some are dependent on authentication info
- an OpenAPI description is available for frontend(s).

