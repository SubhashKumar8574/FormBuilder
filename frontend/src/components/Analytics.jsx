import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// A simple component to display a loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
  </div>
);

export default function Analytics({ formId }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`/api/forms/${formId}/analytics`);
        setAnalyticsData(response.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchAnalytics();
    }
  }, [formId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  // The fix is here: we check if analyticsData is an array before trying to map
  // If it's not, we display a message instead of a chart
  const hasData = Array.isArray(analyticsData) && analyticsData.length > 0;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Form Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="submissions" fill="#8884d8" name="Submissions" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-300">
              No analytics data available for this form.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
