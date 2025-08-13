import React, { useState, useEffect } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import { AdvancedFeaturesHub } from "@/components/AdvancedFeaturesHub";
import UserDashboard from "@/components/UserDashboard";
import Footer from "@/components/Footer";
import { ClinicalAnalysis } from "@/components/ClinicalAnalysis";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  Pill, 
  Activity, 
  TrendingUp, 
  Calendar,
  FileText,
  Download,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const dashboardStats = [
    {
      title: "Active Patients",
      value: "2,847",
      change: "+12%",
      icon: <Users className="h-5 w-5" />,
      trend: "up"
    },
    {
      title: "Drug Interactions Checked",
      value: "15,234",
      change: "+8%",
      icon: <Pill className="h-5 w-5" />,
      trend: "up"
    },
    {
      title: "Health Alerts",
      value: "23",
      change: "-15%",
      icon: <Activity className="h-5 w-5" />,
      trend: "down"
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "0%",
      icon: <TrendingUp className="h-5 w-5" />,
      trend: "stable"
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: "Weekly Drug Interaction Analysis",
      type: "Interaction Report",
      date: "2024-01-20",
      status: "completed",
      patients: 245
    },
    {
      id: 2,
      title: "Medication Adherence Summary",
      type: "Adherence Report",
      date: "2024-01-19",
      status: "completed",
      patients: 189
    },
    {
      id: 3,
      title: "AI Model Performance Metrics",
      type: "AI Analytics",
      date: "2024-01-18",
      status: "completed",
      patients: 1024
    },
    {
      id: 4,
      title: "Blockchain Validation Summary",
      type: "Security Report",
      date: "2024-01-17",
      status: "processing",
      patients: 567
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back, {user.username}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{user.role}</Badge>
            <p className="text-muted-foreground">
              Your personalized healthcare analytics dashboard
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features Hub</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="clinical">Clinical Analysis</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className={`text-xs ${
                          stat.trend === 'up' ? 'text-green-600' : 
                          stat.trend === 'down' ? 'text-red-600' : 
                          'text-muted-foreground'
                        }`}>
                          {stat.change} from last week
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded-full">
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* User Dashboard Component */}
            <UserDashboard />
          </TabsContent>

          <TabsContent value="features">
            <AdvancedFeaturesHub />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Reports Section */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Reports & Analytics</h2>
                <p className="text-muted-foreground">
                  Generate and view comprehensive healthcare reports
                </p>
              </div>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate New Report
              </Button>
            </div>

            {/* Report Generation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Drug Interaction Analysis
                  </CardTitle>
                  <CardDescription>
                    Comprehensive analysis of drug interactions across your patient base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Last generated:</span>
                      <span className="text-muted-foreground">2 days ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Patients covered:</span>
                      <span className="text-muted-foreground">245</span>
                    </div>
                    <Button size="sm" className="w-full mt-4">
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Medication Adherence
                  </CardTitle>
                  <CardDescription>
                    Track and analyze medication adherence patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Adherence rate:</span>
                      <span className="text-green-600 font-medium">87.3%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monitored patients:</span>
                      <span className="text-muted-foreground">189</span>
                    </div>
                    <Button size="sm" className="w-full mt-4">
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    AI Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Monitor AI model accuracy and performance statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Model accuracy:</span>
                      <span className="text-green-600 font-medium">94.7%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Predictions made:</span>
                      <span className="text-muted-foreground">1,024</span>
                    </div>
                    <Button size="sm" className="w-full mt-4">
                      View Metrics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Your latest generated reports and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map(report => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{report.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.date}</span>
                          <span>•</span>
                          <span>{report.patients} patients</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        {report.status === 'completed' && (
                          <>
                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="mr-1 h-3 w-3" />
                              Download
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clinical">
            <ClinicalAnalysis />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Deep insights and predictive analytics for healthcare management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're working on advanced predictive analytics and machine learning insights.
                  </p>
                  <Button variant="outline">Request Early Access</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}