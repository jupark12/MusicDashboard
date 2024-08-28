package models

import (
	"context"
	"fmt"
	"musicDashboard/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Album struct {
    ID     primitive.ObjectID `bson:"_id,omitempty" json:"id"`
    Title  string             `json:"title"`
    Cover  string             `json:"cover"`
    Audio  string             `json:"audio"`
    Date   string             `json:"date"`
}

func SaveAlbum(album *Album) error {
    result, err := database.DB.InsertOne(context.Background(), album)

	if err != nil {
        return err
    }

    fmt.Printf("Inserted document with _id: %v\n", result.InsertedID)
	
    return err
}