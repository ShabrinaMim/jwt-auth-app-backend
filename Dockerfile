# Use a Node 22 version compatible with Alpine 3.18
FROM node:22.1.0-alpine3.18

# Set the working directory inside the container
WORKDIR /app

# Copy package definition files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Start the app
CMD ["npm", "run", "start"]
