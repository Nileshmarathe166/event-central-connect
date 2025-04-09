
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, BarChart2, ArrowUp, ArrowDown } from 'lucide-react';
import { budgets, events } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const Budget: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Ensure only admins can access this page
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Calculate total budget and expenses
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.estimatedBudget, 0);
  const totalExpenses = budgets.reduce((sum, budget) => {
    const budgetExpenses = budget.expenses.reduce((total, expense) => total + expense.amount, 0);
    return sum + budgetExpenses;
  }, 0);
  const remainingBudget = totalBudget - totalExpenses;
  const budgetUtilizationPercentage = Math.round((totalExpenses / totalBudget) * 100);
  
  // Prepare data for charts
  const budgetChartData = budgets.map(budget => {
    const event = events.find(e => e.id === budget.eventId);
    const expenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return {
      name: event?.title || `Event ${budget.eventId}`,
      budget: budget.estimatedBudget,
      expenses: expenses,
      remaining: budget.estimatedBudget - expenses
    };
  });
  
  // All expenses sorted by date (newest first)
  const allExpenses = budgets.flatMap(budget => {
    const event = events.find(e => e.id === budget.eventId);
    return budget.expenses.map(expense => ({
      ...expense,
      eventTitle: event?.title || `Event ${budget.eventId}`
    }));
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Budget Management</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage ACES finances and expenses
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-3xl font-bold mt-1">${totalBudget.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-3xl font-bold mt-1">${totalExpenses.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {budgetUtilizationPercentage}% of budget utilized
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <ArrowDown className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Remaining Budget</p>
                <p className="text-3xl font-bold mt-1">${remainingBudget.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {100 - budgetUtilizationPercentage}% remaining
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <ArrowUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events Budget</TabsTrigger>
          <TabsTrigger value="expenses">All Expenses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Utilization</CardTitle>
              <CardDescription>Overview of estimated vs. actual expenses by event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, '']} />
                    <Legend />
                    <Bar dataKey="budget" name="Estimated Budget" fill="#4361ee" />
                    <Bar dataKey="expenses" name="Actual Expenses" fill="#f72585" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Budgets</CardTitle>
              <CardDescription>Detailed budget breakdown by event</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Estimated Budget</TableHead>
                    <TableHead>Total Expenses</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetChartData.map((item, index) => {
                    const utilizationPercentage = Math.round((item.expenses / item.budget) * 100);
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>${item.budget.toLocaleString()}</TableCell>
                        <TableCell>${item.expenses.toLocaleString()}</TableCell>
                        <TableCell>${item.remaining.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mr-2">
                              <div 
                                className={`h-full ${utilizationPercentage > 90 ? 'bg-destructive' : 'bg-primary'}`} 
                                style={{ width: `${utilizationPercentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{utilizationPercentage}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>All expenses sorted by date (newest first)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell className="font-medium">{expense.title}</TableCell>
                      <TableCell>{expense.eventTitle}</TableCell>
                      <TableCell>${expense.amount.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Budget;
