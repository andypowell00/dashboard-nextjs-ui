# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Create .next directory and set ownership for UID 1000
RUN mkdir -p /app/.next && chown -R 1000:1000 /app

# Expose the port the app will run on
EXPOSE 3000

# Run the container as user 1000
USER 1000

# Start the app in development mode
CMD ["npm", "run", "dev"]
