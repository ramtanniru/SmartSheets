# Smartsheets - Google Sheets and Database Sync Project

This project demonstrates real-time synchronization between Google Sheets and a PostgreSQL database using Next.js for the frontend, Express.js for the backend, and Prisma as the ORM for PostgreSQL. Any changes made in Google Sheets will be reflected in the database, and vice versa. This project also features CRUD operations from the frontend, which will automatically update both the database and Google Sheets in real time using WebSockets.

## Video Demo
[![Video Demo](/frontend/public/images/thumbnail.png)](https://youtu.be/Ji7Y3ayin5w)

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Biggest Blocker & Solution](#biggest-blocker--solution)
- [Approach](#approach)
- [Checklist](#checklist)

## Overview
This project implements a full-stack solution that keeps Google Sheets in sync with a PostgreSQL database. It allows the user to make changes either directly in Google Sheets or through a web-based frontend, and the changes are synchronized in real-time between Google Sheets and the database.

The project uses Google Sheets API to interact with Google Sheets and Prisma ORM to handle PostgreSQL database interactions. It also incorporates WebSocket connections for real-time data updates in the frontend.

## Tech Stack
- **Next.js** (Frontend)
- **Express.js** (Backend)
- **PostgreSQL** (Database)
- **Prisma** (ORM for database)
- **Google Sheets API** (for synchronization with Google Sheets)
- **Socket.IO** (WebSocket connection for real-time updates)

## High Level Design
![Image](/frontend/public/images/HLD.png)
  
## Features
- **Real-time Synchronization**: Data is synced between Google Sheets and PostgreSQL in real time.
- **CRUD Operations**: Create, Read, Update, and Delete operations can be performed from the frontend, which are synced to both Google Sheets and the database.
- **Google Sheets Triggers**: A trigger is set up within Google Sheets to detect changes and automatically call the backend API to sync the data with the database.
- **WebSockets**: Real-time updates are handled through WebSocket connections, ensuring instant updates on the frontend when changes are made in Google Sheets or the database.

## Installation
To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/StackItHQ/vit-ramtanniru
   cd vit-ramtanniru
   ```

2. **Set up Google Sheets API**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/), create a project, and enable the Google Sheets API.
   - Create credentials and download the `credentials.json` file.
   - Place this file in your `backend` folder.

3. **Install Dependencies**:
   In both the frontend and backend directories, run:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the backend directory and add the necessary environment variables, including the PostgreSQL database connection URL and Google Sheets credentials.

5. **Run the project**:
   - Start the backend:
     ```bash
     npm start:backend
     ```
   - Start the frontend:
     ```bash
     npm run dev:frontend
     ```

6. **Set up Google Sheets Trigger**:
   In the Google Sheets script editor, add a function that triggers on changes and sends data to the backend.

## Usage
Once the project is running:
1. Any changes made in the Google Sheets will automatically sync with the database.
2. You can perform CRUD operations in the frontend, and the changes will be synced to both the database and Google Sheets.

## Approach
1. **Google Sheets API Setup**:
   - I first set up the Google Sheets API by creating a project in Google Cloud and downloading the API credentials.
   - Configured the backend to interact with Google Sheets, fetching and updating data as required.

2. **Backend Setup**:
   - I defined the Prisma schema to match the structure of the Google Sheets data.
   - The backend handles CRUD operations on the database and Google Sheets sync through API endpoints and WebSockets.

3. **WebSocket for Real-Time Updates**:
   - I implemented WebSocket connections to enable real-time updates on the frontend whenever the database or Google Sheets data changes.

4. **Trigger Setup**:
   - I set up an **onChange** trigger in Google Sheets to call the backend API whenever data in the sheet is modified. This allows for seamless updates between Google Sheets and the database.


## Biggest Blocker & Solution
### Blocker:
One of the main challenges I encountered was working with Google Sheets. Since it lacks built-in WebSocket support, I initially used polling to detect changes. However, this caused a **'Gauxis error'** due to exceeding the maximum read quota from the Google Sheets API.

### Solution:
To resolve this issue, I considered using debouncing or batching API calls to reduce the frequency of reads, but I found a better approach. Instead of relying on frequent polling, I used **Google Sheets triggers**. These triggers, specifically the **onChange** event, notify the backend only when a change occurs in Google Sheets, significantly reducing the number of API calls and avoiding quota errors. 