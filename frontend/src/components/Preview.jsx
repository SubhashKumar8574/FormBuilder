import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Preview({ fields }) {
  return (
    <div className="p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Form Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Display a message if there are no fields */}
          {fields.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300 text-center py-8">
              No fields added yet. Add some fields from the builder on the left.
            </p>
          ) : (
            <form className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  {/* Label for the field */}
                  <Label htmlFor={field.id} className="block font-medium">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  
                  {/* Render different input types based on field.type */}
                  {field.type === "text" && (
                    <Input id={field.id} type="text" placeholder="Text input" disabled />
                  )}
                  {field.type === "email" && (
                    <Input id={field.id} type="email" placeholder="Email input" disabled />
                  )}
                  {field.type === "textarea" && (
                    <Textarea id={field.id} placeholder="Textarea input" disabled />
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center space-x-2">
                      <Checkbox id={field.id} disabled />
                      <Label htmlFor={field.id}>Checkbox</Label>
                    </div>
                  )}
                  {field.type === "radio" && (
                    <RadioGroup disabled className="flex flex-col space-y-2">
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
                    <Input id={field.id} type="file" disabled />
                  )}
                </div>
              ))}
            </form>
          )}
        </CardContent>
        <CardFooter>
          {/* A simple submit button for preview purposes */}
          {fields.length > 0 && (
            <Button className="w-full" disabled>Submit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
