package models

import (
	"context"
	"fmt"
	"musicDashboard/database"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Album struct {
    ID     primitive.ObjectID `bson:"_id,omitempty" json:"id"`
    Title  string             `json:"title"`
    Cover  string             `json:"cover"`
    Audio  string             `json:"audio"`
    Date   string             `json:"date"`
    UserID string             `json:"userid"`
}

func SaveAlbum(album *Album) error {
    result, err := database.DB.InsertOne(context.Background(), album)

	if err != nil {
        return err
    }

    fmt.Printf("Inserted document with _id: %v\n", result.InsertedID)
	
    return err
}

func GetAlbumsByUserID(userID string) ([]Album, error) {
    var albums []Album
    collection := database.GetCollection("albums")
    filter := bson.M{"userid": userID}
    cursor, err := collection.Find(context.Background(), filter)
    if err != nil {
        return nil, err
    }
    if err = cursor.All(context.Background(), &albums); err != nil {
        return nil, err
    }
    return albums, nil
}