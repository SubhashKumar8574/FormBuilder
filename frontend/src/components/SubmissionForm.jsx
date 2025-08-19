import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner"; // Import toast from sonner
import { Toaster } from "sonner"; // Import Toaster from sonner

// A simple component to display a loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
  </div>
);

export default function SubmissionForm({ formId, fields }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // A generic handler to update state for any input type
  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        formId,
        submission: formData,
      };

      // In a real application, you would send this data to your backend
      // await axios.post(`/api/forms/${formId}/submit`, payload);

      console.log("Form submitted successfully:", payload);
      setSubmissionSuccess(true);
      
      toast("Success!", {
        description: "Your form has been submitted.",
      });
    } catch (err) {
      console.error("Submission failed:", err);
      toast("Submission Failed", {
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If the form has been submitted successfully, display a success message
  if (submissionSuccess) {
    return (
      <div className="p-6">
        <Card className="max-w-3xl mx-auto text-center py-12">
          <CardHeader>
            <CardTitle>Thank You!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Your submission has been received.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Form Submission</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Display a message if there are no fields */}
            {fields.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300 text-center py-8">
                This form has no fields to display.
              </p>
            ) : (
              fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="block font-medium">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </Label>

                  {field.type === "text" && (
                    <Input
                      id={field.id}
                      type="text"
                      placeholder="Text input"
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  )}
                  {field.type === "email" && (
                    <Input
                      id={field.id}
                      type="email"
                      placeholder="Email input"
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      id={field.id}
                      placeholder="Textarea input"
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.id}
                        checked={!!formData[field.id]}
                        onCheckedChange={(checked) => handleChange(field.id, checked)}
                      />
                      <Label htmlFor={field.id}>Checkbox</Label>
                    </div>
                  )}
                  {field.type === "radio" && (
                    <RadioGroup
                      onValueChange={(value) => handleChange(field.id, value)}
                      value={formData[field.id]}
                    >
                      {field.options.map((opt, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt.value} id={`${field.id}-${i}`} />
                          <Label htmlFor={`${field.id}-${i}`}>{opt.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {field.type === "select" && (
                    <Select
                      onValueChange={(value) => handleChange(field.id, value)}
                      value={formData[field.id]}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((opt, i) => (
                          <SelectItem key={i} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === "file" && (
                    <Input id={field.id} type="file" onChange={(e) => handleChange(field.id, e.target.files[0])} />
                  )}
                </div>
              ))
            )}
          </CardContent>
          <CardFooter>
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              fields.length > 0 && <Button type="submit" className="w-full">Submit</Button>
            )}
          </CardFooter>
        </form>
      </Card>
      {/* Add the Toaster component at the root of your app */}
      <Toaster />
    </div>
  );
}
