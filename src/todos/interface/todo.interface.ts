import { Document } from 'mongoose';

export interface Todo extends Document {
    title: string;
    description: string;
    completed: boolean;
}

// Agar kerak bo'lsa, TodoDocument deb nomlang
export type TodoDocument = Todo;
