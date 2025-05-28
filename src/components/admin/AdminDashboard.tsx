
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { getStoredEvents, clearTrackingData } from '@/utils/tracking';
import TrackingDashboard from '@/components/analytics/TrackingDashboard';
import { LogOut, Users, Activity, Calendar } from 'lucide-react';

type WellnessSubmission = {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  height: string;
  weight: number;
  region: string;
  dietaryPreference: string;
  fitnessLevel: string;
  wellnessGoals: string[];
  timestamp: number;
};

const AdminDashboard = () => {
  const { logout } = useAdminAuth();
  const [submissions, setSubmissions] = useState<WellnessSubmission[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Load wellness form submissions from localStorage
    const storedSubmissions = localStorage.getItem('wellness_submissions');
    if (storedSubmissions) {
      try {
        setSubmissions(JSON.parse(storedSubmissions));
      } catch (error) {
        console.error('Error parsing submissions:', error);
      }
    }

    // Load tracking events
    const trackingEvents = getStoredEvents();
    setEvents(trackingEvents);
  }, []);

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all user data? This action cannot be undone.')) {
      localStorage.removeItem('wellness_submissions');
      clearTrackingData();
      setSubmissions([]);
      setEvents([]);
    }
  };

  const stats = {
    totalSubmissions: submissions.length,
    totalEvents: events.length,
    todaySubmissions: submissions.filter(
      sub => new Date(sub.timestamp).toDateString() === new Date().toDateString()
    ).length,
    popularRegions: submissions.reduce((acc, sub) => {
      acc[sub.region] = (acc[sub.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Arogyam75 Admin Dashboard
            </h1>
            <Button 
              variant="outline" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Signups</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todaySubmissions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Region</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.keys(stats.popularRegions).length > 0 
                  ? Object.entries(stats.popularRegions).sort(([,a], [,b]) => b - a)[0][0]
                  : 'N/A'
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Submissions Table */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent User Submissions</CardTitle>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleClearAllData}
            >
              Clear All Data
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Age</th>
                    <th className="text-left p-2">Region</th>
                    <th className="text-left p-2">Goals</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.length > 0 ? (
                    submissions.slice(0, 10).map((submission) => (
                      <tr key={submission.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{submission.name}</td>
                        <td className="p-2">{submission.email}</td>
                        <td className="p-2">{submission.age}</td>
                        <td className="p-2">{submission.region}</td>
                        <td className="p-2">{submission.wellnessGoals.join(', ')}</td>
                        <td className="p-2">
                          {new Date(submission.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-gray-500">
                        No submissions yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* User Interactions Tracking */}
        <TrackingDashboard />
      </main>
    </div>
  );
};

export default AdminDashboard;
