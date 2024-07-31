
# BlogVista

BlogVista is a modern blog application developed using React, Redux, and Appwrite. It offers a user-friendly experience for managing and interacting with blog posts, including user authentication and a clean, responsive design.

## Features

- **User Authentication**: Secure sign-up and login with email OTP through Appwrite.
- **Post Management**: Create, read, update, and delete blog posts.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dynamic Content**: Support for multimedia content in blog posts.
- **Search & Filter**: Easily search and filter posts.
- **Redux State Management**: Efficient state management with Redux.

## Installation

To set up and run the BlogVista application locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/blogvista.git
   cd blogvista

2.Install Dependencies

Ensure you have Node.js and npm installed. Install the project's dependencies using:

bash
Copy code
npm install
Setup Environment Variables

3.Create a .env file in the root directory and add the necessary environment variables. Example:

env
Copy code
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_API_KEY=your_api_key
Run the Application

4.Start the development server with:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000 to view the application.

Usage
Authentication: Sign up or log in using your email address. 
Creating Posts: Click on the "Create Post" button to add new blog entries.
Viewing Posts: Browse the list of posts on the home page and click on individual posts to read them.
Editing Posts: Edit your posts by selecting the "Edit" option in the post menu.
Deleting Posts: Remove posts by selecting the "Delete" option in the post menu.


License
This project is licensed under the MIT License.

Acknowledgments
React for the front-end framework.
Redux for state management.
Appwrite for backend services and authentication.
Tailwind CSS for styling.