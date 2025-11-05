FROM node:16-alpine AS base

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Production stage
FROM node:16-alpine AS production

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from previous stage
COPY --from=base /usr/src/app/dist ./dist

# Expose port
EXPOSE 4000

# Set environment
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/index.js"]
