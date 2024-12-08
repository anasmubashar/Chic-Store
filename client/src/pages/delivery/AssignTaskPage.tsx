import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ManualAssignment } from '../../components/Delivery/assisgnTasks/ManualAssignment';
import { AutomaticAssignment } from '../../components/Delivery/assisgnTasks/AutomaticAssignment';
import { AssignmentList } from '../../components/Delivery/assisgnTasks/AssignmentList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AssignTaskPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Assign Orders</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assignment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Manual Assignment</TabsTrigger>
                <TabsTrigger value="automatic">Automatic Assignment</TabsTrigger>
              </TabsList>
              <TabsContent value="manual">
                <ManualAssignment />
              </TabsContent>
              <TabsContent value="automatic">
                <AutomaticAssignment />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <AssignmentList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}