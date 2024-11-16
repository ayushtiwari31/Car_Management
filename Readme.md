
# Car Management Application

## Objective

Build a Car Management Application where users can:

- **Create** cars with up to 10 images, title, description, and tags.
- **View** their cars or search globally across all cars.
- **Edit** details of cars (title, description, tags, or images).
- **Delete** their cars.

The application includes user authentication, allowing users to manage only their products securely.

---

## Features

### Functionalities

```plaintext
1. User Authentication
   - Sign up and log in to access the application.

2. Car Management
   - Add a car with:
     - Up to 10 images.
     - Title, description, and relevant tags.
   - View a list of all cars created by the logged-in user.
   - Update car details: title, description, tags, or images.
   - Delete cars.

3. Global Search
   - Search cars globally by keyword.
   - Matches titles, descriptions, or tags of cars.

4. Detailed View
   - View detailed information for each car.
   - Options to edit or delete the car.

5. Sign Up / Login Page
   - Enable user registration and login.

6. Product List Page
   - Display all cars created by the logged-in user.
   - Include a search bar for global search functionality.

7. Product Creation Page
   - Form to upload up to 10 images, add a title, and write a description.

8. Product Detail Page
   - Display
```
---
## API Endpoints

### 1. POST /users/signup
   - Create a new user.

### 2. POST /users/login
   - Authenticate a user and provide access.

### 3. POST /cars
   - Create a new car.

### 4. GET /cars
   - Retrieve a list of all cars created by the logged-in user.

### 5. GET /cars/:id
   - Retrieve details of a specific car.

### 6. PUT /cars/:id
   - Update the details of a specific car (title, description, tags, or images).

### 7. DELETE /cars/:id
   - Delete a specific car.

---
---

## Technologies Used

### 1. Backend:
   - NodeJs
   - MongoDB (Database)
   - Cloudinary (for image storage)

### 2. Frontend:
   - React.js
