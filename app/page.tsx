import Link from "next/link";
import { getEvents } from "@/lib/db";
import { BookEventButton } from "@/components/ui/book-event-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="container bg-black mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Upcoming Events</h1>
        <Link href="/admin/login">
          <Button>Login as Admin</Button>
        </Link>
      </div>
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl font-semibold text-white">
            No coming events so far
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <BookEventButton
                  eventId={event.id}
                  initialSeats={event.availableSeats}
                  eventTitle={event.title}
                  eventDate={event.date}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
