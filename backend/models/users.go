package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserSettings struct {
    ID        primitive.ObjectID `bson:"_id,omitempty"`
    UserID    string             `json:"userid"`
    AlbumOrder     []string             `json:"albumOrder"`
    BallColor  string             `json:"ballColor"`
	BackgroundColor1 string			 `json:"backgroundColor1"`
	BackgroundColor2 string			 `json:"backgroundColor2"`
    // Add other settings fields as needed
}