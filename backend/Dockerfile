# Step 1: Use the official Golang image as the build environment
FROM golang:1.23.1-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy go.mod and go.sum to the workspace
COPY go.mod go.sum ./

# Step 4: Download Go dependencies
RUN go mod download

# Step 5: Copy the entire Go project into the container
COPY . .

# Step 6: Build the Go app
RUN go build -o myapp .

# Step 7: Use a minimal base image for the final stage
FROM alpine:latest

# Step 8: Set working directory in the final image
WORKDIR /root/

# Step 9: Copy the binary from the builder stage
COPY --from=builder /app/myapp .

# Step 10: Set the environment variable for MongoDB URI
ENV MONGO_URI="mongodb+srv://junsp1213:Ilovemongodb1213!@musicwheel.2k9ti.mongodb.net/"

# Step 11: Expose the port the app will run on
EXPOSE 8080

# Step 12: Run the application
CMD ["./myapp"]
