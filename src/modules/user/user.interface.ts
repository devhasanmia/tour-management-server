import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    GUIDE = "GUIDE",
    USER = "USER",
}

export interface IAuthProvider {
    provider: "google" | "credentials";
    providerid: string;
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING",
    SUSPENDED = "SUSPENDED",
    BANNED = "BANNED",
}


export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: string;
    isActive?: IsActive;
    isVerified?: boolean;
    role: Role;
    auths: IAuthProvider[];
    bookings?: Types.ObjectId[];
    guides?: Types.ObjectId[]
}