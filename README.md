[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/e0mOS4g_)
# Superjoin Hiring Assignment

### Welcome to Superjoin's hiring assignment! 🚀

### Objective
Build a solution that enables real-time synchronization of data between a Google Sheet and a specified database (e.g., MySQL, PostgreSQL). The solution should detect changes in the Google Sheet and update the database accordingly, and vice versa.

### Problem Statement
Many businesses use Google Sheets for collaborative data management and databases for more robust and scalable data storage. However, keeping the data synchronised between Google Sheets and databases is often a manual and error-prone process. Your task is to develop a solution that automates this synchronisation, ensuring that changes in one are reflected in the other in real-time.

### Requirements:
1. Real-time Synchronisation
  - Implement a system that detects changes in Google Sheets and updates the database accordingly.
   - Similarly, detect changes in the database and update the Google Sheet.
  2.	CRUD Operations
   - Ensure the system supports Create, Read, Update, and Delete operations for both Google Sheets and the database.
   - Maintain data consistency across both platforms.
   
### Optional Challenges (This is not mandatory):
1. Conflict Handling
- Develop a strategy to handle conflicts that may arise when changes are made simultaneously in both Google Sheets and the database.
- Provide options for conflict resolution (e.g., last write wins, user-defined rules).
    
2. Scalability: 	
- Ensure the solution can handle large datasets and high-frequency updates without performance degradation.
- Optimize for scalability and efficiency.

## Submission ⏰
The timeline for this submission is: **Next 2 days**

Some things you might want to take care of:
- Make use of git and commit your steps!
- Use good coding practices.
- Write beautiful and readable code. Well-written code is nothing less than a work of art.
- Use semantic variable naming.
- Your code should be organized well in files and folders which is easy to figure out.
- If there is something happening in your code that is not very intuitive, add some comments.
- Add to this README at the bottom explaining your approach (brownie points 😋)
- Use ChatGPT4o/o1/Github Co-pilot, anything that accelerates how you work 💪🏽. 

Make sure you finish the assignment a little earlier than this so you have time to make any final changes.

Once you're done, make sure you **record a video** showing your project working. The video should **NOT** be longer than 120 seconds. While you record the video, tell us about your biggest blocker, and how you overcame it! Don't be shy, talk us through, we'd love that.

We have a checklist at the bottom of this README file, which you should update as your progress with your assignment. It will help us evaluate your project.

- [x] My code's working just fine! 🥳
- [x] I have recorded a video showing it working and embedded it in the README ▶️
- [x] I have tested all the normal working cases 😎
- [x] I have even solved some edge cases (brownie points) 💪
- [x] I added my very planned-out approach to the problem at the end of this README 📜

## Got Questions❓
Feel free to check the discussions tab, you might get some help there. Check out that tab before reaching out to us. Also, did you know, the internet is a great place to explore? 😛

We're available at techhiring@superjoin.ai for all queries. 

All the best ✨.

## Developer's Section
*Add your video here, and your approach to the problem (optional). Leave some comments for us here if you want, we will be reading this :)*

# Google Sheets and Database Sync Project

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