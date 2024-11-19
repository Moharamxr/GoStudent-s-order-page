# GoStudent Order Page

## Overview
The **GoStudent Order Page** is a React-based application built with **Vite**. It allows users to select a course from a predefined list, view its price, and proceed with placing an order. The application provides a smooth and responsive experience, designed to allow users to easily choose educational courses and process their orders efficiently.

## Features
- **Course Selection**: Users can choose from a list of available courses (Math, Science, English, History).
- **Dynamic Pricing**: The price for the selected course is displayed dynamically based on the user's choice.
- **Order Submission**: After selecting a course, the user can proceed with the order, which currently triggers a confirmation alert with the course name and price.
- **Responsive Design**: The page is responsive, ensuring a smooth experience on both desktop and mobile devices.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Provides static type checking for JavaScript and ensures type safety.
- **Vite**: A fast build tool and development server.
- **CSS**: Custom styles to style the page (Tailwind CSS or plain CSS could be used depending on preference).
- **React Context API**: Used for managing global state (e.g., RTL support or user authentication).

## Project Structure
```
/src
  /assets           # Static assets (images, fonts, etc.)
  /components       # React components (CourseSelection, OrderConfirmation, etc.)
  /context          # Global state management with Context API
  /pages            # Page components (OrderPage, etc.)
  App.tsx           # Main entry point of the application
  main.tsx          # Entry point for React and Vite integration
/public
  index.html        # HTML template
package.json        # Project dependencies and scripts
vite.config.ts      # Vite configuration file
```

## Installation

To get started with the GoStudent Order Page, follow the steps below:

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://npmjs.com/) or [Yarn](https://yarnpkg.com/) as the package manager

### Step 1: Clone the repository
Clone this repository to your local machine using Git:

```bash
git clone https://github.com/Moharamxr/GoStudent-s-order-page.git
```

### Step 2: Install dependencies
Navigate to the project directory and install the necessary dependencies:

```bash
cd GoStudent-s-order-page
npm install
```

or if you're using Yarn:

```bash
yarn install
```

### Step 3: Start the development server
To run the application locally, use the following command:

```bash
npm run dev
```

This will start the Vite development server and you can open the application at [http://localhost:5173](http://localhost:5173).

### Step 4: Open the application
Once the server is running, open your browser and navigate to `http://localhost:5173` to view the application.

## Usage

1. **Course Selection**: Use the dropdown to choose a course from the available list.
2. **View Price**: The price of the selected course will be displayed below the dropdown.
3. **Order Confirmation**: Once a course is selected, click the "Proceed with Order" button to trigger a confirmation alert with the course name and price.

## Contributing

We welcome contributions to improve the **GoStudent Order Page**! If you'd like to contribute, follow these steps:

1. Fork this repository to your own GitHub account.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to your forked repository (`git push origin feature-name`).
5. Create a pull request describing your changes.
