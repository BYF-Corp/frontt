FROM node:18-slim

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .


EXPOSE 3000

# Run the Next.js app
CMD ["npm", "run", "dev"]
