# Stage 1: Build the Next.js app
FROM node:20-slim AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Set the build-time environment variable for the API URL.
# This URL is used for connecting to the backend within a Docker network.
ARG NEXT_PUBLIC_CHAT_API_URL=http://chat-backend:8000/api/chat
ENV NEXT_PUBLIC_CHAT_API_URL=${NEXT_PUBLIC_CHAT_API_URL}

# Build the app
RUN npm run build

# Stage 2: Serve the app
FROM node:20-slim AS runner
WORKDIR /app

# Production environment
ENV NODE_ENV=production

# Copy built app and necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start", "-p", "3000"]
