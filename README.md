# Event Management System

## Overview

This is a simple Event Management System designed to streamline event organization and user participation. The system provides both admin and user capabilities for managing and booking events.

### Features

#### 1. Admin Capabilities:
- **Authentication**: Admins must log in to access functionalities for adding, editing, or deleting events.
- **Event Creation**: Admins can create events with the following details:
  - Title
  - Description
  - Date
  - Available Seats

#### 2. User Capabilities:
- **Event Viewing and Booking**: Users can browse through all available events and book seats without authentication.
- **Real-time Seat Availability**: Seat availability updates instantly upon booking.

## Tech Requirements

- **Frontend**: Built using [Next.js](https://nextjs.org/) with server-side rendering for efficient data fetching and improved performance.
- **Backend**: Utilizes Next.js API routes to handle event and booking data, ensuring a seamless interaction between the frontend and backend.
- **Database**: 
  - In-memory storage for temporary data and lightweight operations.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- A database system of your choice set up and running

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/event-management-system.git
   cd event-management-system
