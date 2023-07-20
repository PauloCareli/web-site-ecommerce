# Web Commerce Project

Welcome to the project!

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Introduction

The project is a full-stack web application that allows users to browse through a wide range of products, add them to their shopping carts, and complete the checkout process. For business owners, it offers a simple and efficient way to manage products, orders, and inventory.

This project was developed with scalability, security, and usability in mind. It follows best practices for web development to ensure a robust and stable online store.

## Features

-   **User Registration and Authentication**: Users can create accounts, log in securely, and reset their passwords if needed.
-   **Product Catalog**: A rich product catalog with categories, product details, and search functionality to help users find what they need easily.
-   **Shopping Cart**: Users can add products to their carts, update quantities, and remove items before proceeding to checkout.
-   **Checkout Process**: Seamless checkout with multiple payment options to complete purchases.
-   **Order Tracking**: Customers can view the status of their orders and get updates on their shipment.
-   **Admin Dashboard**: Business owners can manage products, track orders, and view sales statistics through an intuitive admin dashboard.
-   **Responsive Design**: The website is optimized for various devices, providing a smooth user experience on desktops, tablets, and mobiles.

## Technologies Used

-   **Front-end**: HTML, CSS, JavaScript, React.js
-   **Back-end**: Django
-   **Database**: Postgres
-   **Payment Gateway**: Paypal
-   **Authentication**: JSON Web Tokens (JWT)

## Installation

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install docker.
4. Install the dependencies using the package manager:

```bash
npm install
```

1. Set up environment variables:
   Create a .env file in the root directory and add the necessary configuration:

```dotenv
# Application secrets:
SECRET_KEY=123
DEBUG=1

# Environment:
DEPLOYMENT_ENVIRONMENT=development
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

EMAIL_HOST_USER=email@email.com
EMAIL_HOST_PASSWORD=yourPassword

# Database credentials:
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

1. Start the development server:

```bash
docker-compose up --build
```

The website will be accessible at http://localhost:3000.

## Usage

1. As a Customer:

-   Sign up or log in to your account.
-   Browse the product catalog and click on items to view their details.
-   Add products to your cart and proceed to checkout.
-   Select your preferred payment method and complete the purchase.
-   Track your orders and manage your account.

2. As an Admin:

-   Log in to your admin account.
-   Manage products, categories, and inventory from the dashboard.

## Contributing

We welcome contributions from the community! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and push the branch to your fork.
4. Submit a pull request, explaining your changes and their purpose.
   Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is....

---

I hope you enjoy using this project. If you have any questions or encounter any issues, please don't hesitate to contact me or submit a bug report. Happy coding!
