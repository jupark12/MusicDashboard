package services

import (
	"fmt"
	"path/filepath"

	"mime/multipart"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func HandleFileUpload(file *multipart.FileHeader) (string, error) {
    // Upload file to S3
    s3URL, err := uploadToS3(file)
    if err != nil {
        return "", err
    }
    return s3URL, nil
}

func uploadToS3(fileHeader *multipart.FileHeader) (string, error) {
    // Initialize AWS session with credentials
    sess, err := session.NewSession(&aws.Config{
        Region: aws.String("us-east-1"),
    })
    if err != nil {
        return "", err
    }

    // Create S3 service client
    svc := s3.New(sess)

    // Open the file
    file, err := fileHeader.Open()
    if err != nil {
        return "", err
    }
    defer file.Close()

    // Define the S3 bucket and key
    bucket := "musicdashboardaudiobucket"
    key := filepath.Base(fileHeader.Filename)

	fmt.Println("Uploading file to S3")

    // Upload the file to S3
    _, err = svc.PutObject(&s3.PutObjectInput{
        Bucket: aws.String(bucket),
        Key:    aws.String(key),
        Body:   file,
        ContentType: aws.String(fileHeader.Header.Get("Content-Type")), // Set content type
    })
	
    if err != nil {
        return "", err
    }

    // Construct the URL of the uploaded file
    s3URL := fmt.Sprintf("https://%s.s3.amazonaws.com/%s", bucket, key)
    return s3URL, nil
}