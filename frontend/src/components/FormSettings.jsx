import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function FormSettings() {
  const [settings, setSettings] = useState({
    title: "",
    description: "",
    thankYouMessage: "Thanks for your submission!",
    submissionLimit: 0,
  });

  // Handle changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  // Function to save the form settings (e.g., to a backend)
  const saveSettings = () => {
    console.log("Settings saved:", settings);
    // In a real application, you would make an API call here
    // e.g., axios.post('/api/forms/settings', settings);
  };

  return (
    <div className="p-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Form Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Form Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter form title"
              value={settings.title}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a description for your form"
              value={settings.description}
              onChange={handleChange}
            />
          </div>

          {/* Thank You Message */}
          <div className="space-y-2">
            <Label htmlFor="thankYouMessage">Thank You Message</Label>
            <Input
              id="thankYouMessage"
              name="thankYouMessage"
              placeholder="Enter a message to display after submission"
              value={settings.thankYouMessage}
              onChange={handleChange}
            />
          </div>

          {/* Submission Limit */}
          <div className="space-y-2">
            <Label htmlFor="submissionLimit">Submission Limit</Label>
            <Input
              id="submissionLimit"
              type="number"
              name="submissionLimit"
              placeholder="0 for unlimited"
              value={settings.submissionLimit}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveSettings}>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
