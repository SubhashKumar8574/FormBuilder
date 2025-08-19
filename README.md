# Form Builder Application

## Overview
The Form Builder Application is a MERN stack project that allows users to create, manage, and analyze forms through a user-friendly interface. The application consists of a frontend built with React and a backend powered by Node.js and Express.

## Features

### Frontend
- **Dashboard**: Overview of forms and their statuses.
- **Form Management**: Create, edit, delete, and duplicate forms.
- **Form List View**: Display all forms with their status (draft/published), submission count, and creation date.
- **Form Builder**: Drag-and-drop interface for adding field types (text, email, select, checkbox, radio, textarea, file upload).
- **Field Configuration**: Set validation rules, required fields, placeholder text, and options for select/radio fields.
- **Form Settings**: Configure title, description, custom thank you message, and submission limits.
- **Analytics**: View submission counts, response charts, and export data to CSV.
- **Preview Mode**: Test forms before publishing.
- **Theme Support**: Switch between dark (Golden + Black) and light (White + Purple) themes.

### Backend
- **API Endpoints**:
  - **Forms**: CRUD operations for forms (`/api/forms`).
  - **Submissions**: Create and retrieve submissions (`/api/forms/:id/submissions`).
  - **File Upload**: Handle file storage (`/api/upload`).
  - **Analytics**: Retrieve submission statistics (`/api/forms/:id/analytics`).
  
- **Core Features**:
  - Server-side form validation.
  - File storage (local or cloud) for uploads.
  - Rate limiting to prevent spam submissions.
  - CORS support for cross-origin requests.
  - Structured error handling.

## Technical Stack
- **Frontend**: React 18, shadcn/ui, React Hook Form, Axios.
- **Backend**: Node.js, Express, MongoDB, Multer (for file uploads).

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd form-builder-app
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.# FormBuilder
