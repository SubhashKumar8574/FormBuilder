import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

// A small component to simulate data fetching and display a loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
  </div>
);

export default function FormsList() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all forms from the backend on component mount
  const fetchForms = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/forms");
      // Handle cases where the response might be an array or an object with a 'forms' key
      const formsArray = Array.isArray(res.data) ? res.data : res.data.forms || [];
      setForms(formsArray);
    } catch (err) {
      console.error("Error fetching forms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // Handle deleting a form
  const deleteForm = async (id) => {
    try {
      await axios.delete(`/api/forms/${id}`);
      // Optimistically update the UI by filtering out the deleted form
      setForms((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting form:", err);
    }
  };

  // Render content based on loading state and form count
  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (forms.length === 0) {
      return (
        <Card className="flex flex-col items-center justify-center min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-center">No Forms Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-4">
              It looks like you haven't created any forms yet.
            </p>
            <Link to="/builder">
              <Button>Create Your First Form</Button>
            </Link>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <Card
            key={form._id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-semibold">{form.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/build-form/${form._id}`}>Edit Form</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => deleteForm(form._id)} className="text-red-500">
                      Delete Form
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="capitalize mb-2">
                {form.status}
              </Badge>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Submissions: {form.submissionCount || 0}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Forms</h1>
        <Link to="/builder">
          <Button>+ Create New Form</Button>
        </Link>
      </div>
      {renderContent()}
    </div>
  );
}
