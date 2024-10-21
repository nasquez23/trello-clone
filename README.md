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

### v3 - NextJS

- Initialized NextJS application
- Configured folder and file structure according to "Frontend Style Guide" in Handbook with the following folders:
  - `api` - files that use Firebase functions, such as authentication, data and file storage
  - `app` - main application folder with the App Router
  - `components` - contains components that are used in multiple locations
  - `context` - contains the React Query Provider
  - `lib` - contains the Firebase configuration
  - `types` - types that are used in multiple locations
  - `views` - pages that are used in the App Router, with components that are used in each page
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

### v3 - NextJS

- Implemented tasks storage to Firestore, authentication with Firebase Auth similarly to the previous version
- Implemented data fetching with React Query
- Added user profile page, where the user can change their name or profile picture(uploaded to Firebase Storage) and send verification email
- Implemented Google and Github sign in
- Added loading spinner when a certain action is executing
- Show toast notifications when a action is completed, either if it's a success or an error
- Implemented Drag and Drop for moving tasks using React Beautiful DnD
