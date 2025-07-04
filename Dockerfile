# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Bundle app source
COPY . .

# Make ports 8080 and 8443 available to the world outside this container
EXPOSE 8080 8443

# Define environment variable
ENV NODE_ENV production

# Run the app when the container launches
CMD ["node", "server.js"]
