# E-Commerce Web API

E-Commerce Web API is a RESTful API built with Node.js, Express, and MongoDB. The API provides endpoints for managing products, orders, and users in an e-commerce application.

## Features

The E-Commerce Web API provides the following features:

- Authentication and authorization using JSON Web Tokens (JWT)
- CRUD operations for products, orders, and users
- Pagination and sorting for products and orders
- Filtering and searching for products
- File upload for product images
- Error handling and validation
- Unit and integration testing using Jest and Supertest

## Getting Started

To get started with the E-Commerce Web API, follow these steps:

1. Clone the repository: `git clone https://github.com/Karimatif33/NodeJsProjects.git`
2. Navigate to the `E-Commerce Web API` directory: `cd NodeJsProjects/E-Commerce\ Web\ API`
3. Install the dependencies: `npm install`
4. Create a `.env` file and set the following environment variables:
   - `PORT`: The port number for the server (default is `3000`)
   - `MONGODB_URI`: The URI for the MongoDB database
   - `JWT_SECRET`: The secret key for JWT authentication
5. Start the server: `npm start`

The API will be available at `http://localhost:3000` (or the port number you specified in the `.env` file).

## API Endpoints

The following endpoints are available in the E-Commerce Web API:

### Products

- `GET /api/products`: Get a list of all products
- `GET /api/products/:id`: Get a single product by ID
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product by ID
- `DELETE /api/products/:id`: Delete a product by ID

### Orders

- `GET /api/orders`: Get a list of all orders
- `GET /api/orders/:id`: Get a single order by ID
- `POST /api/orders`: Create a new order
- `PUT /api/orders/:id`: Update an order by ID
- `DELETE /api/orders/:id`: Delete an order by ID

### Users

- `GET /api/users`: Get a list of all users
- `GET /api/users/:id`: Get a single user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/:id`: Update a user by ID
- `DELETE /api/users/:id`: Delete a user by ID

### Authentication

- `POST /api/auth/login`: Authenticate a user and get a JWT token
- `POST /api/auth/register`: Register a new user

## Authentication

The E-Commerce Web API uses JSON Web Tokens (JWT) for authentication and authorization. When a user logs in or registers, a JWT token is generated and returned in the response. This token can be used to authenticate subsequent requests to protected endpoints.

To authenticate a request, include the JWT token in the `Authorization` header of the request:
Authorization: Bearer

## Error Handling

The E-Commerce Web API includes error handling and validation for all endpoints. If an error occurs, the API will return an error response with a status code and error message.

## Testing

The E-Commerce Web API includes unit and integration tests using Jest and Supertest. To run the tests, use the following command:
npm test

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code as you see fit. See the `LICENSE` file for more information.
