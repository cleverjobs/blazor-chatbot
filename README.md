# Blazor Chat UI

This is a Next.js application that provides a minimal chat UI, designed to interact with a local Telerik UI-for-Blazor Chatbot demo backend.

## Features

- **Modern Chat Interface**: A clean, responsive chat window for user and assistant messages.
- **Markdown & Code Support**: Renders assistant replies with proper markdown, including syntax-highlighted code blocks.
- **State Persistence**: Chat history is saved to `localStorage`, so your session is restored after a refresh.
- **Loading States**: Skeletons indicate when the assistant is "typing".
- **Accessible**: Built with accessibility in mind, including ARIA labels and focus management.

---

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm

### Quick Start

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    By default, the app will try to connect to a backend API at `http://localhost:8000/api/chat`. You can change this by creating a `.env.local` file.
    ```bash
    npm run dev
    ```

3.  **Open the app**:
    Navigate to [http://localhost:9002](http://localhost:9002) in your browser.

---

## Running in Docker

This project includes a `Dockerfile` to run the application in a containerized environment, ready to be orchestrated with a backend service using `docker-compose`.

1.  **Build the Docker image**:
    ```bash
    docker build -t blazor-chat-ui .
    ```

2.  **Run the container**:
    This command runs the container and maps the container's port 3000 to your host's port 3000. The `NEXT_PUBLIC_CHAT_API_URL` is set to connect to a service named `chat-backend` on the same Docker network.

    ```bash
    docker run -p 3000:3000 --env NEXT_PUBLIC_CHAT_API_URL=http://chat-backend:8000/api/chat blazor-chat-ui
    ```
    
3.  **Use with Docker Compose**:
    You can integrate this UI into a `docker-compose.yaml` file like this:

    ```yaml
    version: '3.8'
    services:
      chat-ui:
        build: . # Assuming the Dockerfile is in the same directory
        container_name: chat-ui
        ports:
          - "3000:3000"
        environment:
          - NEXT_PUBLIC_CHAT_API_URL=http://chat-backend:8000/api/chat
        depends_on:
          - chat-backend
        networks:
          - chat-net

      chat-backend:
        # ... your backend service configuration
        networks:
          - chat-net

    networks:
      chat-net:
        driver: bridge
    ```
