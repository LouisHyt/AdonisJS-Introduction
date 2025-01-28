# AdonisJS - Introduction

## 📝 Description
This project is a Node.js application built with AdonisJS and TypeScript. It uses the Edge template language for the views.

## 🛠 Technologies Used
- **Node.js** - Runtime environment
- **TypeScript** - Programming language
- **AdonisJS** - Server framework
- **MySQL & MySQL2** - Database
- **Edge** - Template engine

## 📋 Prerequisites
- Node.js
- MySQL database
- npm

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/LouisHyt/AdonisJS-Introduction
cd AdonisJS-Introduction
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Create a `.env` file in the root directory
- Fill the fields based on the file `.env.example`
- This project is configured to work with OAuth2 and Github. If you want to use it, fill the GITHUB_CLIENT_* fields

⚠️ *If you wish to add more environment variables, don't forget to edit the start/env.ts file as well to get type completion. You can also run the command `node ace env:add` if you want it to be automatically configured*

4. Configure and create the Database
- Create a mySQL database with the same name provided in the `.env` file
- Run the command `node ace migration:run`

5. Start the application in development mode:
```bash
npm run dev
```

## 🏗 Project Structure
```
├── app/            
├── bin/
├── config/
├── database/
├── public/
├── resources/
├── start/
└── tests/
```

## 📦 Available Scripts
- `npm run dev` : Starts the application in development mode
- `npm run build` : Build the project

## 📄 Infos
This project was made on my free time to learn more about AdonisJS.
- 📅 Date : december 2024
- ✍️ Author : Louis Hayotte
