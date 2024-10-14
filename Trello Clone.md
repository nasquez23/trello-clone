# Trello Clone

## Project Structure

### v1 - Vanilla Javascript

- Initialized index.html file
- Initialized styles.css file
- Initialized main.js file for DOM manipulation with Vanilla Javascript

### v2 - Firebase & Typescript

- Initialized folders: js/ts, pages and styles
- Initialized two more pages: login and register
- Separated js/ts code in multiple files
  - index.js - entry point(checks the authentication state and fetches tasks for authenticated user)
  - firebase.js for Firebase configuration and initalization
  - tasks.js for task handling(creation, updating, deletion and moving between sections)
  - ui.js for handling user interaction
  - auth.js for Firebase Auth
- Added environment variables(for Firebase configuration)

## Tasks

### v1 - Vanilla Javascript

- Created 3 columns: "To Do", "In Progress" and "Done"
- Added input for creating tasks dynamically to each column
- Implemented Drag and Drop for moving tasks from one column to another
- Used localStorage to save tasks so that they persist even after a page reload

### v2 - Firebase & Typescript

- Initialized Firebase project and configured it with the Firebase CDN
- Implemented Firestore for storing tasks
- Implemented Firebase Auth for user management(registering, logging in and logging out)
- Implemented displaying tasks only that the user has created
- Implemented error handling for user actions
- Set up Webpack for bundling javascript files
- Refactored code to now use module-based Firebase integration
- Configured ESLint for code quality
- Implemented task updating and deletion
