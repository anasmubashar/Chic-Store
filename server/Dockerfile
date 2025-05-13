# Stage 1: install dependencies
FROM node:18-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Stage 2: build (if you have a build step—skip if not)
# FROM node:18-alpine AS builder
# WORKDIR /usr/src/app
# COPY --from=deps /usr/src/app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# Stage 3: runtime image
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

# Copy only production deps
COPY --from=deps /usr/src/app/node_modules ./node_modules
# If you have a build step, copy built assets here instead:
# COPY --from=builder /usr/src/app/dist ./dist

# Copy source code
COPY . .

# Expose the port your server listens on
EXPOSE 5000

# (Optional) define environment variables defaults
ENV NODE_ENV=production
ENV PORT=5000

# Start the server
CMD ["node", "index.js"]
