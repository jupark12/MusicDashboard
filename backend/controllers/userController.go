package controllers

import (
	"context"
	"fmt"
	"musicDashboard/database"
	"musicDashboard/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetUserSettings(c *gin.Context) {
    userID := c.Query("userId")
	fmt.Println("userID:", userID)
    if userID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "userId query parameter is required"})
        return
    }

    collection := database.DB.Collection("user_settings")
	fmt.Println("collection", collection)
    var settings models.UserSettings
    err := collection.FindOne(context.TODO(), bson.M{"userid": userID}).Decode(&settings)
    if err != nil {
		fmt.Println("EROOR ERROR", err)
        if err == mongo.ErrNoDocuments {
            c.JSON(http.StatusNotFound, gin.H{"error": "User settings not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        }
        return
    }

    c.JSON(http.StatusOK, settings)
}

func UpdateUserSettings(c *gin.Context) {
	fmt.Println("UpdateUserSettings")
    var settings models.UserSettings
    if err := c.ShouldBindJSON(&settings); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    collection := database.DB.Collection("user_settings")
    filter := bson.M{"userid": settings.UserID}
    update := bson.M{"$set": settings}
    opts := options.Update().SetUpsert(true)
    _, err := collection.UpdateOne(context.TODO(), filter, update, opts)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User settings updated successfully"})
}

func CreateUserSettings(c *gin.Context) {
	fmt.Println("CreateUserSettings")
	var settings models.UserSettings
	if err := c.ShouldBindJSON(&settings); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := database.DB.Collection("user_settings")
	_, err := collection.InsertOne(context.TODO(), settings)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User settings created successfully"})
}

func DeleteUserSettings(c *gin.Context) {
	userID := c.Query("userId")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "userId query parameter is required"})
		return
	}

	collection := database.DB.Collection("user_settings")
	filter := bson.M{"userid": userID}
	_, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User settings deleted successfully"})
}