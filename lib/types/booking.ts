import { IProperty } from "./property";

export interface IBooking {
    _id?: string;
    user: string;
    property: IProperty;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
    }