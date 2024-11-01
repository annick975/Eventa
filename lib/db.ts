import fs from 'fs'
import path from 'path'

export interface Event {
  id: string
  title: string
  description: string
  date: string
  availableSeats: number
  bookings: Booking[]
}

export interface Booking {
  name: string
  location: string
}

const eventsFile = path.join(process.cwd(), 'data', 'events.json')

function readEvents(): Event[] {
  if (!fs.existsSync(eventsFile)) {
    return []
  }
  const data = fs.readFileSync(eventsFile, 'utf-8')
  return JSON.parse(data)
}

function writeEvents(events: Event[]): void {
  const dirPath = path.dirname(eventsFile)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2))
}

export function getEvents(): Event[] {
  return readEvents()
}

export function bookEvent(id: string, booking: Booking): Event | null {
  const events = readEvents()
  const eventIndex = events.findIndex(event => event.id === id)
  
  if (eventIndex === -1 || events[eventIndex].availableSeats === 0) {
    return null
  }
  
  events[eventIndex].availableSeats--
  events[eventIndex].bookings = events[eventIndex].bookings || []
  events[eventIndex].bookings.push(booking)
  writeEvents(events)
  return events[eventIndex]
}

export function cancelBooking(eventId: string, name: string): Event | null {
  const events = readEvents()
  const eventIndex = events.findIndex(event => event.id === eventId)
  
  if (eventIndex === -1) return null

  const bookingIndex = events[eventIndex].bookings?.findIndex(booking => booking.name === name)
  if (bookingIndex === undefined || bookingIndex === -1) return null

  events[eventIndex].bookings.splice(bookingIndex, 1)
  events[eventIndex].availableSeats++
  writeEvents(events)
  return events[eventIndex]
}