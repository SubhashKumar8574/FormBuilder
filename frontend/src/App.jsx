import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import FormsList from "./components/FormList";
import FormBuilder from "./components/FormBuilder";
import Analytics from "./components/Analytics";
import FormSettings from "./components/FormSettings";
import Preview from "./components/Preview";
import SubmissionForm from "./components/SubmissionForm"; // Import the new SubmissionForm component
import "./App.css";

function App() {
  // Mock data for a form to pass to the SubmissionForm component
  // In a real application, you would fetch this data from an API based on the formId
  const mockFormFields = [
    { id: "name", type: "text", label: "Your Name", required: true },
    { id: "email", type: "email", label: "Your Email", required: true },
    { id: "message", type: "textarea", label: "Your Message", required: false },
    { id: "os", type: "select", label: "Operating System", options: [{ value: "windows", label: "Windows" }, { value: "macos", label: "macOS" }, { value: "linux", label: "Linux" }] },
    { id: "subscribe", type: "checkbox", label: "Subscribe to newsletter", required: false },
  ];

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            {/* Main application routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/forms" element={<FormsList />} />

            {/* Form Builder routes */}
            <Route path="/builder" element={<FormBuilder />} />
            <Route path="/builder/:formId" element={<FormBuilder />} />
            
            {/* Form submission and preview routes */}
            <Route path="/preview" element={<Preview fields={mockFormFields} />} />
            <Route path="/forms/:formId/submit" element={<SubmissionForm formId="demo-id" fields={mockFormFields} />} />

            {/* Other routes */}
            <Route path="/analytics" element={<Analytics formId="demo-id" />} />
            <Route path="/settings" element={<FormSettings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
