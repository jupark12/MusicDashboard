package controllers

import (
	"context"
	"fmt"
	"musicDashboard/models"
	"musicDashboard/services"
	"musicDashboard/utils"
	"net/http"

	"musicDashboard/database"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateAlbum(c *gin.Context) {
    fmt.Println("Creating album")

    var album models.Album

    // Parse form data and files
    title := c.PostForm("title")
    date := c.PostForm("date")

    // Handling file upload
    audioFile, err := c.FormFile("audio")
    if err != nil {
        utils.RespondWithError(c, http.StatusBadRequest, "Audio file is required")
        return
    }

    coverFile, err := c.FormFile("cover")
    if err != nil && err != http.ErrMissingFile {
        utils.RespondWithError(c, http.StatusBadRequest, "Error retrieving cover file")
        return
    }

    // Handle file upload (for example, saving to S3)
    audioURL, err := services.HandleFileUpload(audioFile)
    if err != nil {
        utils.RespondWithError(c, http.StatusInternalServerError, err.Error())
        return
    }

    var coverURL string
    if coverFile != nil {
        coverURL, err = services.HandleFileUpload(coverFile)
        if err != nil {
            utils.RespondWithError(c, http.StatusInternalServerError, err.Error())
            return
        }
    }

    album.UserID = c.Request.Header.Get("UserID")

    // Assign the rest of the data to the album struct
    album = models.Album{
        Title: title,
        Date:  date,
        Audio: audioURL,
        Cover: coverURL,
        ID:    primitive.NewObjectID(), // Assuming you're using MongoDB
        UserID: album.UserID,
    }

    fmt.Println("Saving Album to database")
    // Save album in the database
    if err := models.SaveAlbum(&album); err != nil {
        utils.RespondWithError(c, http.StatusInternalServerError, err.Error())
        return
    }

    utils.RespondWithSuccess(c, http.StatusCreated, album)
}

func GetAlbum(c *gin.Context) {
	id := c.Param("id")

	// Find the album by ID
	var album models.Album
	err := database.DB.FindOne(context.Background(), bson.M{"id": id}).Decode(&album)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Album not found"})
		return
	}

	c.JSON(http.StatusOK, album)
}

func ListAlbums(c *gin.Context) {
    fmt.Println("Listing albums with user ID")
    userID := c.Query("userId")
    albums, err := models.GetAlbumsByUserID(userID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, albums)
}


func UpdateAlbum(c *gin.Context) {
	id := c.Param("id")

	// Find the album by ID
	var album models.Album
	err := database.DB.FindOne(context.Background(), bson.M{"id": id}).Decode(&album)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Album not found"})
		return
	}

	// Update the album with new data
	var updatedAlbum models.Album
	if err := c.ShouldBindJSON(&updatedAlbum); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	album.Title = updatedAlbum.Title
	album.Cover = updatedAlbum.Cover
	album.Audio = updatedAlbum.Audio

	// Save the updated album
	_, err = database.DB.ReplaceOne(context.Background(), bson.M{"id": id}, album)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, album)
}

func DeleteAlbum(c *gin.Context) {
	id := c.Param("id")

	// Delete the album by ID
	_, err := database.DB.DeleteOne(context.Background(), bson.M{"id": id})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Album deleted"})
}