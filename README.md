RezAnalyze System Documentation

Project Overview

RezAnalyze is an AI-powered resume analyzer designed to help users improve their resumes and increase their chances of getting hired. The
application allows users to upload their resumes in PDF format, and then it provides a comprehensive analysis, including an overall score,
feedback on ATS (Applicant Tracking System) compatibility, and tailored recommendations for improvement based on a provided job description.
The system uses Puter for user authentication and to store the analysis results.

Key Technologies

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Routing: react-router
- State Management: zustand
- File Handling: react-dropzone for file uploads, pdfjs-dist for rendering PDF previews.
- Backend & Authentication: Puter.io for user authentication and key-value data storage.

Code Structure and Functionality

app/root.tsx
This is the main entry point for the React application. It sets up the basic layout, including the navigation bar, and renders the different
routes of the application.

app/routes.ts
This file defines the URL routes for the application, mapping paths like /, /upload, and /auth to their corresponding components.

app/routes/home.tsx
The landing page of the application. It displays a list of previously analyzed resumes and provides a starting point for users.

app/routes/upload.tsx
This is where users can upload their resumes for analysis. It features a file upload component and is the starting point for the resume
analysis workflow.

app/routes/auth.tsx
Handles user authentication using the Puter SDK. It provides a simple interface for users to log in with their Puter account.

app/componenets/fileuploader.tsx
A reusable React component that provides a drag-and-drop interface for file uploads, built using the react-dropzone library.

app/componenets/resumecard.tsx
A component used on the home page to display a summary of each analyzed resume, including a preview image and the analysis score.

app/lib/pdftoimage.ts
A utility that converts the first page of an uploaded PDF into a PNG image. This is used to display a visual preview of the resume in the UI.
It uses the pdfjs-dist library to render the PDF.

app/lib/puter.ts
This file encapsulates all interactions with the Puter SDK. It includes functions for user authentication (login, getUser) and for storing and
retrieving data from Puter's key-value store (kv.get, kv.set).

constants/index.ts
This file centralizes constant values used throughout the application, such as navigation links.

Puter Integration

The application is built on the Puter platform, leveraging its backend services for key functionalities:

- Authentication: User authentication is handled entirely by Puter. The puter.auth.login() function is used to initiate the login flow, and
  puter.auth.getUser() retrieves the current user's information. This simplifies the development process by removing the need for a custom
  authentication system.
- Data Storage: The application uses Puter's key-value store (puter.kv) to persist data, such as the results of resume analyses. This allows
  users to view their past results without needing a traditional database setup.
