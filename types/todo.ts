import { ObjectId } from 'mongodb';

export interface Todo {
    _id: ObjectId;  // Native MongoDB type for queries
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}

// For API responses (JSON-safe)
export interface TodoDto {
    _id: string;  // Hex string for client
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}

export interface CreateTodoInput {
    title: string;
    description?: string;
}
