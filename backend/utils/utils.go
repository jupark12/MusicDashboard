package utils

import (
	"strings"

	"github.com/gin-gonic/gin"
)

func RespondWithError(c *gin.Context, code int, message string) {
    c.JSON(code, gin.H{"error": message})
}

func RespondWithSuccess(c *gin.Context, code int, payload interface{}) {
    c.JSON(code, payload)
}

func extractFileID(url string) string {
    // Extract the file ID from the Google Drive URL
    // This is a simplified example and may need to be adjusted for different URL formats
    return url[strings.LastIndex(url, "/")+1:]
}