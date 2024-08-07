# Job Application Tracker

Welcome to the Job Application Tracker project! This web application helps you manage and track job applications, including their status, company details, and more. 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Introduction

The Job Application Tracker allows users to:
- Add and manage job applications
- Track application status (Review, Accept, Reject)
- View and edit application details

## Features

- User Authentication with Firebase
- Add and manage job applications
- Display recent applications
- Application details with notes
- Styled using Tailwind CSS

## Getting Started

To set up the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/deepakkumar55/job-application-tracker.git
   cd job-application-tracker
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration to `src/firebase.js`.

4. **Start the Development Server:**

   ```bash
   npm start
   ```

   Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

We welcome contributions to the Job Application Tracker project! Here’s how you can contribute:

### Reporting Issues

If you encounter any issues or bugs, please report them by creating an [issue](https://github.com/your-username/job-application-tracker/issues) on GitHub.

### Submitting Pull Requests

1. **Fork the Repository:**

   Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/your-username/job-application-tracker.git
   ```

3. **Create a Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes and Commit:**

   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

5. **Push to Your Fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request:**

   Go to the original repository on GitHub and click the "Compare & pull request" button.

### Testing

Ensure your changes do not break existing functionality by running tests:

```bash
npm test
```


Thank you for contributing to the Job Application Tracker project!
