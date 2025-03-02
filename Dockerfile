# Stage 1: Build the backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build || true # Run build if it exists, ignore error if not present

# Stage 2: Build the frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 3: Combine and serve (multi-stage build)
FROM nginx:alpine
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html
COPY backend/ . /app/backend/
COPY --from=backend-builder /app/backend/package*.json /app/backend/
COPY --from=backend-builder /app/backend/node_modules/ /app/backend/node_modules/
EXPOSE 80
EXPOSE 5000
CMD sh -c "cd /app/backend && node express.js & nginx -g 'daemon off;'"
