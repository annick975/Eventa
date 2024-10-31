"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  availableSeats: number;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    availableSeats: 0,
  });
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await fetch("/api/events");
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    if (response.ok) {
      setNewEvent({ title: "", description: "", date: "", availableSeats: 0 });
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (id: string) => {
    const response = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (response.ok) {
      fetchEvents();
    }
  };

  const handleLogout = () => {
    // Clear admin session and redirect to login page
    router.push("/admin/login");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Manage your events here</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateEvent} className="space-y-4 mb-8">
            <Input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              required
            />
            <Input
              type="text"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              required
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              required
            />
            <Input
              type="number"
              placeholder="Available Seats"
              value={newEvent.availableSeats}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  availableSeats: parseInt(e.target.value),
                })
              }
              required
            />
            <Button type="submit">Create Event</Button>
          </form>

          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Date: {event.date}</p>
                  <p>Available Seats: {event.availableSeats}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogout}>Logout</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
