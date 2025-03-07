# Overview
A full-stack YouTube clone built using the MERN stack (MongoDB, Express.js, React, Node.js) with Tailwind CSS and Vite. The application allows users to view, upload,search functionality, like/dislike, comment on videos, and manage their channels.

# Demo


# Features

**Frontend(React)**

* **HomePage**: A header with sign-in button and toggle sidebar with a grid of video thumbnails.

* **Video Player**: Users can watch a video.

* **User Authentication**: Sign-up and login using JWT authentication.

* **Comments Section**: Users can post comments, which are stored in MongoDB, and are displayed persistently.

* **Like & Dislike System**: Users can like/dislike videos.

* **Search & Filter**: Search for videos and filter based on categories.

* **Channel Page**: Users can create channel only after login. Users can upload, edit or delete videos.

* **Responsive Design**: Optimized for desktop, tablets, and mobile devices using Tailwind CSS.

**Backend (Node.js, Express, MongoDB)**

* **User Authentication**: Signup, Login, and Token-based Authentication using JWT.

* **Video Management**: API to Upload, fetch, edit, and delete videos.

* **Channel Management**: API to create, fetch, update, and delete channels.

* **Comment Management**: API to add, edit, and delete comments on videos.

# Technologies Used

* **Frontend**: React, React Router, Axios
* **Backend**: Node.js, Express.js, MongoDB
* **Styling**: Tailwind CSS
* **Authentication**: JWT(JSON Web Token)

# Installation & Setup

**Prerequisites**
Ensure you have the foloowing installed:
* Node.js
* MongoDB

1. Clone the repository:
    * git clone https://github.com/Charu-30/YouTube-Clone.git

2. Navigate to the project directory:
    * cd YouTube

3. Set Up Backend
    * cd NodeJS
    * npm install
    * Create a .env file in the NodeJS/ directory an add:
        PORT= 5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secret_key
    * npm start

4. Set Up Frontend
    * cd vite-project
    * npm install
    * npm run dev

5. Open the application in your browser.

6. Register/Login and start using the YouTube clone!

# Contributing
Feel free to fork this repository, make changes, and submit a pull request. Suggestions and improvements are welcome!

# Contact
* **Author**: Charu Mangla
* **GitHub**: https://github.com/Charu-30
* **Email**: charumangla432@gmail.com