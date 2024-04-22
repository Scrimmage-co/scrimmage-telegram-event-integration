# Build stage
FROM node:20 AS BUILD

WORKDIR /usr/app

# Copy necessary files for installation
COPY --chown=node:node package*.json ./
RUN npm ci

# Copy necessary configuration files
COPY tsconfig*.json ./
COPY .eslintrc.js ./
COPY .prettierrc ./
COPY nest-cli.json ./
COPY src ./src

# Allow environment variable to be set from outside
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

# Build the application
RUN npm run build

# Runtime stage
FROM node:20-alpine AS RUNTIME

WORKDIR /usr/app

# Copy necessary files for runtime
COPY --from=BUILD /usr/app/package*.json ./
RUN npm ci --production

COPY --from=BUILD /usr/app/dist ./dist

# Setting up timezone
ARG TZ
ENV TZ=${TZ:-UTC}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Command to run the application
CMD [ "node", "dist/main.js" ]
