build:
	env GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o bootstrap main.go
	zip function.zip bootstrap
deploy_prod: build
	serverless deploy --stage prod --verbose
