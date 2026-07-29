# ==========================================
# Stage 1: Build Environment
# ==========================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies needed for build)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the TypeScript code
RUN npm run build

# ==========================================
# Stage 2: Production Environment
# ==========================================
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Set Node environment to production
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy compiled JavaScript code from the builder stage
COPY --from=builder /app/dist ./dist

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
