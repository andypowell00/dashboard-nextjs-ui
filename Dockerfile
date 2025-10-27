# Use Node LTS
FROM node:18

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app (optional — you can rely on bind mount in dev)
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
