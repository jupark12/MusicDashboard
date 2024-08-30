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
        AllowHeaders:     []string{"Content-Type", "Authorization",  "UserID"},
        AllowCredentials: true,
    }))

    //Album routes
    router.POST("/albums/upload", controllers.CreateAlbum)
    router.GET("/albums/:id", controllers.GetAlbum)
    router.GET("/albums", controllers.ListAlbums)
    router.PUT("/albums/:id", controllers.UpdateAlbum)
    router.DELETE("/albums/:id", controllers.DeleteAlbum)

    // User settings routes
    router.POST("/user/signup", controllers.CreateUserSettings)
    router.GET("/user/settings", controllers.GetUserSettings)
    router.PUT("/user/settings", controllers.UpdateUserSettings)
    router.DELETE("/user/settings/:id", controllers.DeleteUserSettings)

    router.Run(":8080")
}
