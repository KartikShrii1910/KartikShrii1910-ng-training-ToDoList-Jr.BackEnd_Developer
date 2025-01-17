# BackEnd 

## Todo API Tests

This repository contains a suite of tests to validate the functionality of the Todo API. The tests ensure the API endpoints for creating, reading, updating, and deleting todos work as expected.

## Prerequisites

To run the tests, ensure the following dependencies are installed on your system:

- Node.js (v16 or higher)
- npm (Node Package Manager)
- A running instance of the Todo API server

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Ensure the Todo API server is running. The server should be accessible on `http://localhost:3000` by default.

## Test Cases

The test suite validates the following endpoints:

### GET /api/tasks
- **Purpose**: Fetch all todos.
- **Expected Result**: Returns a status code `200` with an array of todos.

### GET /api/todos/getById/:id
- **Purpose**: Fetch a specific todo by its ID.
- **Expected Result**: 
  - Returns a status code `200` with the todo object if it exists.
  - Returns a status code `404` with a message if the todo is not found.

### POST /api/task
- **Purpose**: Create a new todo.
- **Expected Result**: Returns a status code `201` with a success message and the ID of the created todo.

### PUT /api/task/:id
- **Purpose**: Update an existing todo by its ID.
- **Expected Result**: Returns a status code `200` with a success message.

### DELETE /api/task/:id
- **Purpose**: Delete a specific todo by its ID.
- **Expected Result**: Returns a status code `200` with a success message.

## Running the Tests

1. Run the test suite using the following command:

   ```bash
   npm test
   ```

2. The output will show the results of each test case, highlighting any failures or errors.

## Troubleshooting

### Error: `EADDRINUSE: address already in use :::3000`
This error occurs when the port `3000` is already in use. To resolve it:
- Stop any other processes using the port `3000`.
- Change the port number in the API server configuration and the test file.

### Error: `expected { Object (...) } to have status code 200 but got 404`
This error indicates that a specific todo ID does not exist in the database. Ensure the database is populated with valid test data before running the tests.

## Sample Data Setup

To ensure tests run successfully, populate the database with some sample todos. For example:

```json
[
 {
    // "id":1,
    "assignedTo": "John Doe",
    "status": "In Progress",
    "dueDate": "2025-01-14",
    "priority": "High",
    "description": "Complete the report and submit it by the deadline."
},
  {

    "assignedTo": "John Doe",
    "status": "In Progress",
    "dueDate": "2025-01-14",
    "priority": "High",
    "description": "Complete the report and submit it by the deadline."
}
]
```

## Dependencies

The following libraries are used in the test suite:
- [chai](https://www.chaijs.com/) - Assertion library
- [chai-http](https://www.chaijs.com/plugins/chai-http/) - HTTP integration for Chai
- [mocha](https://mochajs.org/) - Test framework




 # Front End

 # Todo Task Management Application

This project is a web-based Todo Task Management application. It allows users to manage their tasks by creating, updating, deleting, and searching tasks, as well as viewing task details in a table format. The application is built using Angular and integrates with a backend API.

---

## Features

- **Task List:** Display tasks in a table with details such as assigned person, status, due date, priority, and description.
- **Search Functionality:** Filter tasks by the assigned person's name.
- **Pagination:** Manage large datasets by paginating the task list.
- **CRUD Operations:**
  - Create a new task
  - Update existing tasks
  - Delete tasks with confirmation
- **Task Selection:** Select multiple tasks using checkboxes.
- **Dialog-based Modals:** Create or edit tasks through a dialog modal.
- **Data Persistence:** Integrates with a backend API for storing and retrieving tasks.

---

## Project Structure

### Frontend

- **Technologies:** Angular, Angular Material, Reactive Forms
- **Key Components:**
  - **`TodosComponent`**: Main component for managing and displaying tasks.
  - **`TodoModalComponent`**: Dialog-based component for creating and editing tasks.
- **Services:**
  - **`TodosService`**: Manages API calls for task operations.
- **Models:**
  - **`todosModel`**: Defines the structure of a task object.

### Backend

- **Base URL:** `http://localhost:3000`
- **Endpoints:**
  - `GET /api/tasks`: Fetch all tasks.
  - `POST /api/task`: Create a new task.
  - `PUT /api/task/:id`: Update an existing task by ID.
  - `DELETE /api/task/:id`: Delete a task by ID.

---

## Installation and Setup

### Prerequisites

1. Node.js and npm installed.
2. Angular CLI installed globally.
3. Backend API running at `http://localhost:3000`.

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   ng serve
   ```

4. Open the application in your browser:

   ```
   http://localhost:4200
   ```

---

## Usage

1. **View Tasks:** Open the application to view the list of tasks.
2. **Search Tasks:** Use the search bar to filter tasks by "Assigned To".
3. **Create Task:** Click "New Task" to open the modal, fill in the details, and save the task.
4. **Edit Task:** Click the "Edit" option from the task's action menu.
5. **Delete Task:** Click "Delete" from the action menu and confirm the deletion.
6. **Refresh List:** Click the "Refresh" button to reload the task list.

---

## Code Highlights

### TodosComponent

- Handles task display, search, and pagination.
- Fetches tasks from the backend using `TodosService`.
- Provides task selection and refresh functionality.

### TodoModalComponent

- Displays a form for task creation and editing.
- Validates inputs using Angular's reactive forms.
- Sends create/update requests to the backend via `TodosService`.

### TodosService

- Manages HTTP requests for task operations.
- Uses the Angular `HttpClient` for API interactions.

### TodosModel

- Defines the structure of a task object with properties:
  - `assignedTo`
  - `status`
  - `dueDate`
  - `priority`
  - `description`

---

## Dependencies

### Angular Material

- Provides UI components for tables, dialogs, forms, buttons, and more.

### SweetAlert2

- Used for confirmation dialogs and notifications.
- Example: Confirmation before deleting a task.

### DatePipe

- Formats dates in the task list and forms.

---

## Future Enhancements

- Implement user authentication for task ownership.
- Add bulk actions for selected tasks.
- Integrate with a database for persistent storage.
- Enhance search functionality with filters for status and priority.
- Add drag-and-drop functionality for task reordering.

---

## Contributing

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

