# Movies & Subscription Management Web Application

Overview
This is a web application built with the MERN stack designed for managing movies and subscriptions.
The project architecture is divided into two main web services (WS) to ensure proper separation of concerns and synchronization.

Web Services

1. User Management Service
   Responsibilities:
   Manages users and local files.
   Maintains the users' database.
   Interacts with the Subscription Service to fetch necessary data.
   Database: Local database for user information.
2. Subscription Service
   Responsibilities:
   Connects to a separate subscription database.
   Retrieves data about members and movies.
   Integrates with external web services to gather movie and member information.
   Database: External subscription database.

Client Application
The client-side application interacts seamlessly with both web services, ensuring that all components work together in a synchronized manner. This division of services helps maintain a clean architecture, enabling scalability and maintainability.
Apart from the need for a CONNECTING_STRING (.env),
the database is configured to work only from a specific IP address.

Project Short Clip
https://youtu.be/k0MOA8v9VTY
