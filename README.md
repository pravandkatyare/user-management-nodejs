# User Management System

This is a Node.js-based user management system.

## Project Structure

- `api`: Contains Swagger file.
- `config`: Contains DB connection code.
- `controllers`: Contains route handlers.
- `middleware`: Contains middleware login for authentication.
- `model`: Contains database model user for data storage and retrival.
- `routes`: Contains handling of routes.
- `server.js`: Starting point to application.
- `.env`: All environment variables required to run application.
- `Docker`: Docker file to containerize application.
- `docker-compose.yml`: Combines all the required tools and deploys it all at once.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running Application in Docker Containers

1. Clone the repository:
    ```bash
    git clone https://github.com/pravandkatyare/user-management-nodejs
    cd user-management
    ```

2. Run application in containers:
   ```
   docker compose up
   ```
