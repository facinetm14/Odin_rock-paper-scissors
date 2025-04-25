FROM nginx:alpine

# Set working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy your static website files into the Nginx web root
COPY . .