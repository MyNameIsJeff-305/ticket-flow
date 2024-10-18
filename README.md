# Ticket Flow

<a href="https://ticket-flow-rrfx.onrender.com/">Live Demo</a>

![splash-1]

[splash-1]: ./images/splash-1.png

Ticket Flow is an IT Ticketing System designed to streamline the management of IT service tickets. This app allows businesses to efficiently manage tickets, clients, and technicians, ensuring smooth operations for IT support companies. It includes features like client management, ticket categorization, and an event ledger for tracking tasks and notes related to tickets.

## Features

- **Ticket Management**: Create, edit, and manage tickets with ease. Tickets are categorized into new, pending, and closed statuses.
![Dashboard]

[Dashboard]: ./images/Dashboard.png
- **Client Management**: Add, edit, and store client information with support for profile image uploads.
![ClientTab]

[ClientTab]: ./images/ClientTab.png

- **Add Notes and Parts to the Tickets**: Add, edit, and remove Notes and Parts on every ticket.
![TicketDetails]

[TicketDetails]: ./images/TicketDetails.png

- **Theme Support**: Light and dark themes for a customizable user experience.
![Theme]

[Theme]: ./images/Theme.png

- **Performance**: Efficient data fetching with Redux for dynamic updates and smooth user interactions.

## Technologies Used

### **Frontend**: 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

### **Backend**:
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

### **Database**:
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### **Storage**:
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

### **Styling**:
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### **Deployment**:
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MyNameIsJeff-305/ticket-flow.git
2. Navigate to the project directory:
    ```bash
    cd ticket-flow
3. Create a **.env** file. Fill it using the **.env.example** file. For setting up the **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY** setup an AWS S3 Bucket:
    ```bash
    PORT=8000
    DB_FILE=db/dev.db
    JWT_SECRET=<your-secret-key>
    JWT_EXPIRES_IN=604800
    SCHEMA=<your-schema-name>

    AWS_ACCESS_KEY_ID=<your-access-key-id>
    AWS_SECRET_ACCESS_KEY=<your-secret-access-key>

4. Install dependencies on backend:
    ```bash
    cd backend
    npm install
5. Migrate and seed the database (for dev purposes we will use sqlite):
    ```bash
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
6. Start the backend Server:
    ```bash
    npm start
7. Open a new terminal and CD into frontend folder and install dependencies:
    ```bash
    cd ..
    cd frontend
    npm install
8. Run the Frontend in Dev Mode
    ```bash
    npm run dev
## Usage

### Add a Client: 
Use the AddClient component to register new clients and upload profile images.

### Create a Ticket:
 Create tickets using the AddTicket component. Tickets can be assigned to employees.

### Track Ticket Status: 
View ticket statuses (new, pending, closed) on the dashboard.

### View and Manage Tickets: 
Use the TicketDetails component to view detailed ticket information, including events and notes.

## Future Improvements

### Client Login for Ticket Status Tracking:
Implement a second authentication for Clients in order for them to track the status of the tickets.

### AI-powered Suggestions: 
Implement AI to suggest solutions or best practices for handling tickets.
Advanced Reporting: Generate reports based on ticket data to analyze performance and trends.

### Calendar and Check-in/Check-out feature:
Implement a Calendar View in order to track the date and time a ticket is handled.

### Mobile App: 
Extend functionality to a mobile application for on-the-go ticket management.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any feature requests, improvements, or bug fixes.

## Contact
For questions or feedback, please contact Michel Garcia Ribalta at michelgarcia950528@icloud.com.