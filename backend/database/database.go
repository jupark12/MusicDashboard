package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
    fmt.Println("Connecting to database")
    
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://junsp1213:Ilovemongodb1213!@musicwheel.2k9ti.mongodb.net/"))
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