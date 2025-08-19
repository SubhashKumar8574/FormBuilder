import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({ 
    forms: 0, 
    submissions: 0,
    responseRate: "0%",
    avgCompletion: "0min"
  });
  const [recentForms, setRecentForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch stats from the backend
      const statsResponse = await axios.get("/api/dashboard/stats");
      if (statsResponse.data) {
        setStats(statsResponse.data);
      } else {
        setStats({ 
          forms: 0, 
          submissions: 0,
          responseRate: "0%",
          avgCompletion: "0min"
        });
      }

      // Fetch recent forms from the backend
      const formsResponse = await axios.get("/api/forms/recent");
      if (Array.isArray(formsResponse.data)) {
        setRecentForms(formsResponse.data);
      } else {
        setRecentForms([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setStats({ 
        forms: 0, 
        submissions: 0,
        responseRate: "0%",
        avgCompletion: "0min"
      });
      setRecentForms([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard animate-fade-in">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">
          Monitor your forms and track submissions with real-time analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {/* Total Forms */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon blue">
              📝
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Forms</p>
              <p className="stat-value">{stats.forms}</p>
            </div>
          </div>
          <div className="stat-trend trend-positive">
            <span>📈</span>
            <span>+12%</span>
            <span>from last month</span>
          </div>
        </div>

        {/* Total Submissions */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon green">
              👥
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Submissions</p>
              <p className="stat-value">{stats.submissions}</p>
            </div>
          </div>
          <div className="stat-trend trend-positive">
            <span>📈</span>
            <span>+28%</span>
            <span>from last month</span>
          </div>
        </div>

        {/* Response Rate */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon purple">
              📊
            </div>
            <div className="stat-info">
              <p className="stat-label">Response Rate</p>
              <p className="stat-value">{stats.responseRate}</p>
            </div>
          </div>
          <div className="stat-trend trend-positive">
            <span>📈</span>
            <span>+5%</span>
            <span>from last month</span>
          </div>
        </div>

        {/* Average Completion Time */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon orange">
              ⏱️
            </div>
            <div className="stat-info">
              <p className="stat-label">Avg. Completion</p>
              <p className="stat-value">{stats.avgCompletion}</p>
            </div>
          </div>
          <div className="stat-trend trend-positive">
            <span>📈</span>
            <span>-15%</span>
            <span>from last month</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Recent Forms */}
        <div className="content-card">
          <h3 className="content-card-title">Recent Forms</h3>
          <div>
            {recentForms.length > 0 ? (
              recentForms.map((form, index) => (
                <div key={form.id || index} className="form-item">
                  <div className="form-item-info">
                    <h4>{form.title}</h4>
                    <p>{form.submissions} submissions</p>
                  </div>
                  <span className={`status-badge ${
                    form.status === 'Active' ? 'status-active' : 'status-draft'
                  }`}>
                    {form.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No recent forms found.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="content-card">
          <h3 className="content-card-title">Quick Actions</h3>
          <div>
            {/* Using Link for navigation to the FormBuilder route */}
            <Link to="/builder" className="quick-action">
              <div className="quick-action-icon">
                📝
              </div>
              <div className="quick-action-info">
                <h4>Create New Form</h4>
                <p>Build a custom form from scratch</p>
              </div>
            </Link>
            
            {/* Using Link for navigation to the Forms route */}
            <Link to="/forms" className="quick-action">
              <div className="quick-action-icon">
                📊
              </div>
              <div className="quick-action-info">
                <h4>View All Forms</h4>
                <p>Check detailed form performance</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
