"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
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

export function EditEventForm({
  event,
  onEventUpdated,
  onCancel,
}: {
  event: Event;
  onEventUpdated: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [availableSeats, setAvailableSeats] = useState(
    event.availableSeats.toString()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/events/${event.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        date,
        availableSeats: parseInt(availableSeats),
      }),
    });

    if (response.ok) {
      onEventUpdated();
    } else {
      console.error("Failed to update event");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="availableSeats" className="text-sm font-medium">
              Available Seats
            </label>
            <Input
              id="availableSeats"
              type="number"
              value={availableSeats}
              onChange={(e) => setAvailableSeats(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="space-x-2">
          <Button type="submit">Update Event</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
