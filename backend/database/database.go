package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
    fmt.Println("Connecting to database")
    mongoURI := os.Getenv("MONGO_URI")
    if mongoURI == "" {
        log.Fatal("MONGO_URI environment variable is not set")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
    if err != nil {
        log.Fatal(err)
    }

    // Check the connection
    err = client.Ping(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }

    DB = client.Database("musicdashdb")
}

func GetCollection(collectionName string) *mongo.Collection {
    return DB.Collection(collectionName)
}