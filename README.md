# Funny movies

## Introduction

A web application for sharing Youtube videos.

### Key features

- User registration and login
- Sharing YouTube videos
- Viewing a list of shared videos
- Real-time notifications for new video shares 

### Technologies

- Programming Language: [Typescript](https://www.typescriptlang.org/)
- Framework: [NextJS](https://nextjs.org/), [ReactJS](https://react.dev/)
- State management library: [React Query](https://tanstack.com/query/v3)
- CSS framework: [TailwindCSS](https://tailwindcss.com/)
- Deployment: [Vercel](https://vercel.com/) 

## Prerequisites

- [Node.js](https://nodejs.org/en/download/package-manager/current) ^20.11.1

## Installation & Configuration

After cloning repository, follow the commands below:
1. Copy `env.sample` file to `env.` or run this command:
```bash
    cp .env.sample .env
```
2. Install dependencies:
```bash
    npm install
```

## Running the Application

Start the development server:
```bash
   npm run dev
```
To run tests, start back-end server first and then run command below:
```bash
   npm run test 
```

## Usage 

The web application displays Youtube videos shared by other users on Home page. 
To share your funny Youtube videos, follow these steps:

#### Login/Register

- **Register**: Click on the "Register" button to create an account. Fill out the registration form with your details and submit it.
- **Login**: Once registered, click on the "Login" button to access your account. Enter your credentials and submit the form.

#### Sharing YouTube Videos

- Find a YouTube Video: Search for a YouTube video you want to share.
- Copy the Video Link: Copy the link of the YouTube video.
- Share the Video: Click on the "Share" button on the navbar and paste the YouTube video link. Click the "Submit" button to share the video with other users.

#### Real-time Notifications

When a user shares a new video, all logged-in users will receive a real-time notification about the newly shared video.