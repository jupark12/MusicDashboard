# Music Dashboard

## Inspiration for this project
The main reason I started this project was that it was inconvenient to listen to my locally produced songs before publishing them to streaming services. I used to upload my audio files to Google Drive to stream them because it was free. However, Google Drive lacked essential audio playback features like autoplay, track reordering, and a user-friendly interface.

This project is still a work in progress, but another key motivation for starting it was to learn how to build a web application from the ground up. There are still many features to implement, but working on this project has given me the opportunity to dive deep into a variety of technologies I’ve encountered in my previous jobs.

If I were to start over, I would make a few key changes. First, I would use TypeScript to ensure better type safety, as I initially prioritized speed over long-term maintainability. As the project grew, I began to experience the limitations of not having strong types. I would also opt for Redux for more scalable state management, rather than relying solely on the Context API for global state.

On the backend, I deployed my Golang server using AWS Lambda and API Gateway, leveraging tools I was familiar with from previous roles. Through this project, I also learned how to use the Serverless Framework to streamline AWS deployments. Overall, this project has been an excellent learning experience, and I plan to continue developing it to stream my songs locally while I work or study.

## Features:
- Create a profile (Firebase Auth)
- Upload and manage music to server, using any local audio files (up to 5mb per file)
- Audio visualization using wavesurfer.js

## TODOs
- Allow Oauth for Google, and users able to directly upload any audio files on their Google drive to the app
- Fix editing for track names
- Add notes under timestamp
- Right now the lambda function isn't handling the CORS logic for OPTIONS requests. Remove all CORS logic from serverless.yml file and have my golang lambda function handle all of it. 
