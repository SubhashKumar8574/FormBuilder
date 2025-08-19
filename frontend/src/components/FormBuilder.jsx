import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import FieldConfig from "./FieldConfig";

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  // Add new field
  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      options:
        type === "radio" || type === "select"
          ? [{ value: "option-1", label: "Option 1" }]
          : [],
    };
    setFields([...fields, newField]);
    setSelectedField(newField);
  };

  // Update field config
  const updateField = (id, updatedField) => {
    setFields(fields.map((f) => (f.id === id ? updatedField : f)));
    setSelectedField(updatedField);
  };

  // Remove field
  const removeField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
    setSelectedField(null);
  };

  // Save form
  const saveForm = async () => {
    const formData = {
      formTitle: "My New Form",
      fields: fields,
    };
    
    // Now, let's hit the backend API
    try {
      const response = await fetch("/api/forms", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Tell the server we're sending JSON
        },
        body: JSON.stringify(formData), // Convert the data to a JSON string
      });

      if (!response.ok) {
        // Handle non-2xx responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form saved successfully:", result);
      // You can add a state to show a success message here,
      // or redirect the user to a new page.
    } catch (error) {
      console.error("Error saving form:", error);
      // You can add a state to show an error message to the user here.
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left - Add Fields */}
      <Card className="w-full lg:w-1/5 h-fit shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Add Fields
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {["text", "email", "textarea", "checkbox", "radio", "select", "file"].map(
            (type) => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                className="w-full border-dashed text-sm justify-start"
                onClick={() => addField(type)}
              >
                ➕ {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            )
          )}
        </CardContent>
      </Card>

      {/* Middle - Form Preview */}
      <Card className="w-full lg:w-3/5 shadow-md rounded-2xl">
        <CardHeader className="border-b pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Form Preview
            </CardTitle>
            <Button size="sm" onClick={saveForm} className="rounded-full">
              Save
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-center text-gray-500">
              <p className="text-sm">Click a field from the left to add it.</p>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={`p-4 rounded-xl border cursor-pointer shadow-sm transition 
                  ${
                    selectedField?.id === field.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedField(field)}
                >
                  {/* Field label & delete button */}
                  <div className="flex justify-between items-start mb-2">
                    <Label
                      htmlFor={field.id}
                      className="font-medium text-base"
                    >
                      {field.label}{" "}
                      {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeField(field.id);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ✕
                    </Button>
                  </div>

                  {/* Field preview */}
                  {field.type === "text" && (
                    <Input type="text" placeholder="Short answer" disabled />
                  )}
                  {field.type === "email" && (
                    <Input type="email" placeholder="Email" disabled />
                  )}
                  {field.type === "textarea" && (
                    <Textarea placeholder="Long answer" disabled />
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center space-x-2">
                      <Checkbox id={field.id} disabled />
                      <Label htmlFor={field.id}>Option</Label>
                    </div>
                  )}
                  {field.type === "radio" && (
                    <RadioGroup disabled className="space-y-2">
                      {field.options.map((opt, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt.value} id={`${field.id}-${i}`} />
                          <Label htmlFor={`${field.id}-${i}`}>{opt.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {field.type === "select" && (
                    <Select disabled>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose" />
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
                  {field.type === "file" && <Input type="file" disabled />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right - Field Config */}
      <Card className="w-full lg:w-1/5 h-fit shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Field Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedField ? (
            <FieldConfig
              key={selectedField.id}
              field={selectedField}
              onUpdate={(updated) => updateField(selectedField.id, updated)}
            />
          ) : (
            <p className="text-gray-500 text-sm">
              Select a field to configure its properties.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
