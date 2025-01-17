# Todo API Tests

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
 