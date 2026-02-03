import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Todo, TodoDto } from '@/types/todo';
import { ObjectId } from 'mongodb';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Validate ObjectId format first
        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('myDatabase');

        const todo = await db.collection<Todo>('todos').findOne({
            _id: new ObjectId(params.id),  // Now type-compatible
        });

        if (!todo) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Transform for API response (convert ObjectId to string)
        const todoDto: TodoDto = {
            _id: todo._id.toHexString(),  // Convert to JSON-safe string
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            createdAt: todo.createdAt,
        };

        return NextResponse.json({ todo: todoDto });
    } catch (e) {
        console.error('Fetch error:', e);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
