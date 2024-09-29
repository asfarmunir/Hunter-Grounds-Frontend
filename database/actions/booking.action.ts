import Booking from '@/database/booking.model';
import { connectToDatabase } from '..';

export async function createBooking(data:any) {
    try {
        await connectToDatabase();
        const booking = new Booking(data);
        await booking.save();
        return JSON.parse(JSON.stringify({booking, status: 200}));
    } catch (error) {
        console.error("Error creating booking", error);
        return JSON.parse(JSON.stringify({status: 400, message: "Error creating booking"}));
    }
}