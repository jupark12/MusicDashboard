package main

import (
	"musicDashboard/controllers"
	"musicDashboard/database"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	database.ConnectDB()

    router := gin.Default()

	router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Content-Type", "Authorization"},
        AllowCredentials: true,
    }))

    router.POST("/albums/upload", controllers.CreateAlbum)
    router.GET("/albums/:id", controllers.GetAlbum)
    router.GET("/albums", controllers.ListAlbums)
    router.PUT("/albums/:id", controllers.UpdateAlbum)
    router.DELETE("/albums/:id", controllers.DeleteAlbum)

    router.Run(":8080")
}