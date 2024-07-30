# Ecommerce

___
## Overview 

Welcome to the E-Commerce Project! This project is a React-based e-commerce application that uses Redux for state management and `my-json-server` for a dummy API service. 
___

## Live

Live Link:- <a href="https://.netlify.app/" target=_blank>E-commerce</a>

___
## Features

### Navbar
- Displays the count of items in the cart.
- Shows relevant navigation links.

### All Products Page
- Lists products fetched from the API.
- Products can be edited inline by clicking the "pencil" button.
  - **Alert/Notification:** An alert or notification appears after editing a product.
- Products can be deleted by clicking the "delete" button.
  - **Alert/Notification:** An alert or notification appears after deleting a product.
- Sort products by price.
  - **Sort Button:** Sorts products by price.
  - **Cross Button:** Removes the sort filter when clicked.
- Add products to the cart.

### Create Page
- Allows adding a new product to the database.
  - **Alert/Notification:** An alert or notification appears after adding a product.

### Product Detail Page
- Displays all details of a selected product.
- Provides a button to add the product to the cart.

### Cart Page
- Displays all items in the cart.
- Handles errors and success alerts.
- Shows appropriate alerts for API errors and success.

___

## Technologies Used


<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,html,css,js,react,redux" />
  </a>
</p>

- **Frontend**: React, CSS Modules, Toastify, Spinner-Material, React Router,Redux Toolkit

- React: For building the user interface.
- Redux: For state management.
- my-json-server: For the dummy API service.
- React-Router: For routing.
___
## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/MdIrfan-ul/Ecommerce.git
   ```

2. Navigate to the Project Directory:
    cd ecommerce

3. Install Dependencies:
    ```bash
    npm install
    ```
4. Dummy Json Server:
-  create db.json file on your repository.

5. Start the Development Server:
    ```bash
    npm start
    ```
___

## Configuration
- Redux is used for state management. Data persistence is implemented to maintain cart items after a page refresh.

## Usage
- Navigate through the application using the Navbar.
- Edit products inline on the All Products Page.
- Delete products from the list.
- Sort products by price and remove the sort filter.
- Add products to the cart and manage them on the Cart Page.
- Add new products using the Create Page.
- View detailed information about products on the Product Detail Page.

___


Developed with ❤️ by [Mohamed Irfanullah M]

___