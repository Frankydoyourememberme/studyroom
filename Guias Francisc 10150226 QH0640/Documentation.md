# **Assessments Dashboard Application**
## **Francisc Guias [1guiaf33@solent.ac.uk] - Contemporary Web Application**
### 2023, Solent University QA

[Git Repository](https://github.com/FGuias/StudyRoom.git)

#TTechnical Report: Study Room Booking System

Table of Contents:

    Introduction

    System Architecture

    Front-end Development with React

    Back-end Development with Firebase

    Database Management with Firestore

    Authentication and User Management

    Room Availability and Booking Logic

    Testing and Quality Assurance

    Deployment and Hosting

    Conclusion

    Introduction

The Study Room Booking System is a web-based application designed to streamline the booking of study rooms in various settings. This technical report provides a detailed overview of the implementation of the system, highlighting the importance of efficient space management and the utilization of modern technologies. By leveraging React for front-end development and Firebase for back-end development, the system offers a seamless and user-friendly experience for booking study rooms.

    System Architecture

The system architecture of the Study Room Booking System follows a client-server model. The front-end is developed using React, a JavaScript library known for its efficiency in building user interfaces. React allows for the creation of reusable components and ensures a responsive and intuitive user interface. The back-end is implemented using Firebase, a comprehensive app development platform that provides essential services like real-time database storage, authentication, and hosting.

    Front-end Development with React

Front-end development for the Study Room Booking System is implemented using React. The application is bootstrapped with Create React App, providing an efficient and standardized environment for development. The front-end consists of various components, such as the landing page, available room display, booking process, user authentication, and user profile. React components are modular and reusable, promoting code efficiency and maintainability.

    Back-end Development with Firebase

The back-end development of the Study Room Booking System is implemented using Firebase, a cloud-based platform that offers a range of services. Firestore, a NoSQL database provided by Firebase, is used for data storage and management. Firebase Authentication is employed for secure user authentication and management. Additionally, Firebase Cloud Functions enables the execution of server-side code, allowing for dynamic and scalable operations.

    Database Management with Firestore

Firestore, the document-based NoSQL database within Firebase, is utilized for efficient database management in the Study Room Booking System. It offers real-time data synchronization and offline support, ensuring that users have the most up-to-date information regarding study room availability and bookings. Firestore's flexible data model allows for efficient querying and retrieval of data, facilitating smooth operations within the application.

    Authentication and User Management

User authentication and management are crucial components of the Study Room Booking System. Firebase Authentication provides secure user registration, login, and password management functionalities. It supports various authentication methods, including email/password, Google, and Facebook. User profiles are stored securely, containing relevant information such as name, email, and booking history. Firebase Authentication ensures that only authorized users can access the system and perform booking-related actions.

    Room Availability and Booking Logic

The Study Room Booking System implements logic to manage room availability and the booking process effectively. When a user searches for available study rooms, the front-end sends a request to the back-end, which retrieves room availability data from Firestore. The back-end filters and sorts the rooms based on user preferences, such as location, capacity, and amenities. To book a study room, the user selects a room, date, and time slot. The system checks the availability of the selected room and creates a booking if it is available. Validation checks are in place to handle conflicts, such as overlapping bookings or exceeding room capacity.

    Testing and Quality Assurance

Testing and quality assurance practices are integral to the development of the Study Room Booking System. Unit testing ensures the reliability and functionality of individual components, while integration testing verifies the interaction between different modules. End-to-end testing is performed to validate the system's workflow and ensure a seamless user experience. Testing frameworks and tools, such as Jest and React Testing Library, are utilized for comprehensive testing of React components. Firebase provides testing tools, including the Firebase Emulator Suite, enabling local testing of Firebase services.

    Deployment and Hosting

The Study Room Booking System is deployed and hosted using Firebase Hosting. The deployment process involves building the React application and configuring the Firebase project for hosting. Firebase Hosting provides a scalable and secure hosting solution with content delivery networks (CDNs) for efficient content distribution. The hosting configuration ensures that the system is accessible to users on the web with a secure HTTPS connection. Firebase Hosting also handles automatic scaling and caching, optimizing the system's performance.

    Conclusion

In conclusion, the Study Room Booking System is a well-architected application that leverages React and Firebase to provide a seamless and user-friendly experience for booking study rooms. The system efficiently manages room availability, implements robust authentication and user management, and ensures reliable database operations with Firestore. Thorough testing and quality assurance practices guarantee the system's functionality and reliability. Deployment and hosting on Firebase Hosting make the application accessible to users on the web. The Study Room Booking System offers an effective solution for optimizing the use of study rooms and improving space management in various educational and learning environments.

