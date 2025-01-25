# CinemaBuzz

## Overview

Cinema Buzz is a dynamic movie web application built using Angular 18.2.0 while following syntax and modular architecture compatible with Angular versions < 16. The application provides users with an engaging platform to browse movies, view detailed information, and manage their favorites.

## Demo

Check out the [DEMO](https://cinema-buzz-gamma.vercel.app) to see the project in action!

## Features

- **Movie List Display**: Browse through a curated list of movies fetched from a server.

- **Detailed Information**: Click on a movie to view detailed information, including a synopsis, release date, and more.

- **Favorites System**: Add movies to your favorites list for easy access.

## Technologies Used

- **Angular**: Version 18.2.0 with syntax compatible with Angular versions < 16.

- **State Management**: RxJS for handling asynchronous operations

- **TypeScript**: Ensures type safety and scalability.

- **SCSS**: For responsive and maintainable styling.


## Folder Structure

The project follows a standard folder structure for better organization:

```

src
├── app                        # Root application folder
│   ├── components             # Reusable components
│   ├── models                 # Data interfaces and types
│   ├── pages                  # Page-level components for routing
│   ├── services               # Services for API calls and shared logic
│   ├── share                  # Shared modules, directives, and pipes
│   ├── app-routing.module.ts  # App routing configuration
│   ├── app.component.html     # Root component HTML
│   ├── app.component.scss     # Root component styles
│   ├── app.component.ts       # Root component logic
│   ├── app.module.ts          # Root application module
├── styles                     # Global SCSS styles
├── index.html                 # Entry point HTML file
├── main.ts                    # Main entry point for bootstrapping
├── styles.scss                # Global SCSS file

```

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/vlesia/cinema-buzz.git

   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd cinema-buzz

   ```

3. **Install Dependencies**:

   ```bash
   npm install

   ```

4. **Start the development server**:

   ```bash
   ng serve
   ```

5. **Open your browser and navigate to**:

   ```bash
   http://localhost:4200
   ```
