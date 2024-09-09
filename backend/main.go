package main

import (
	"fmt"
	"log"
	"musicDashboard/controllers"
	"musicDashboard/database"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda
var router *gin.Engine

func init() {
    // Initialize the database connection
    database.ConnectDB()

    // Create a new Gin router
    router = gin.Default()

    // Configure CORS
    corsOrigins := os.Getenv("CORS_ORIGINS") // Comma-separated list of allowed origins
    if corsOrigins == "" {
        corsOrigins = "http://localhost:3000" // Default for local development
    }

    router.Use(cors.New(cors.Config{
        AllowOrigins:     strings.Split(corsOrigins, ","),
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Content-Type", "Authorization", "UserID"},
        AllowCredentials: true,
    }))

    router.Use(func(c *gin.Context) {
        // Log the request details
        log.Printf("Incoming request: %s %s", c.Request.Method, c.Request.URL.String())
    
        // Proceed with the request
        c.Next()
    
        // Log response status
        log.Printf("Response status: %d", c.Writer.Status())
    })

    // Album routes
    router.POST("/albums/upload", controllers.UploadAlbum)
    router.GET("/albums/:id", controllers.GetAlbum)
    router.GET("/albums", controllers.ListAlbums)
    router.PUT("/albums/:id", controllers.UpdateAlbum)
    router.DELETE("/albums/:id", controllers.DeleteAlbum)

    // User settings routes
    router.POST("/user/signup", controllers.CreateUserSettings)
    router.GET("/user/settings", controllers.GetUserSettings)
    router.PUT("/user/settings", controllers.UpdateUserSettings)
    router.DELETE("/user/settings/:id", controllers.DeleteUserSettings)

    // Presigned URL route
    router.POST("/presigned-url", controllers.GetPresignedURL)

    // Initialize the Gin Lambda adapter
    ginLambda = ginadapter.New(router)
}

func main() {
    // Check if running in AWS Lambda environment
    if os.Getenv("AWS_LAMBDA_FUNCTION_NAME") != "" {
        fmt.Println("Running in Lambda environment")
        // Start the Lambda handler
        lambda.Start(ginLambda.ProxyWithContext)
    } else {
        // Start the Gin server locally
        router.Run(":8080")
    }
}