"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddEventForm } from "@/components/add-event-form";
import { EditEventForm } from "@/components/edit-event-form";

interface Booking {
  name: string;
  location: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  availableSeats: number;
  bookings?: Booking[];
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const router = useRouter();

  const fetchEvents = async () => {
    const response = await fetch("/api/events");
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLogout = async () => {
    const response = await fetch("/api/admin/logout", { method: "POST" });
    if (response.ok) {
      router.push("/admin/login");
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (response.ok) {
      fetchEvents();
    } else {
      console.error("Failed to delete event");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {editingEvent ? (
            <EditEventForm
              event={editingEvent}
              onEventUpdated={() => {
                setEditingEvent(null);
                fetchEvents();
              }}
              onCancel={() => setEditingEvent(null)}
            />
          ) : (
            <AddEventForm onEventAdded={fetchEvents} />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Current Events</h2>
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
                  <h3 className="font-semibold mt-4">Bookings:</h3>
                  {event.bookings && event.bookings.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {event.bookings.map((booking, index) => (
                        <li key={index}>
                          {booking.name} - {booking.location}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No bookings yet.</p>
                  )}
                </CardContent>
                <CardFooter className="space-x-2">
                  <Button onClick={() => setEditingEvent(event)}>Edit</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
