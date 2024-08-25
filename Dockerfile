# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

ENV NODE_ENV production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set the correct permission for prerender cache
RUN mkdir -p .next/cache
RUN chown -R nextjs:nodejs .next
RUN chmod -R 755 .next

# Copy the .env file
COPY .env .

# Switch to the non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]