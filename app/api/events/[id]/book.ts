import type { NextApiRequest, NextApiResponse } from 'next'
import { bookEvent } from '@/lib/db'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (req.method === 'POST') {
    const updatedEvent = bookEvent(id as string)
    if (updatedEvent) {
      res.status(200).json(updatedEvent)
    } else {
      res.status(400).json({ message: 'No available seats or event not found' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}