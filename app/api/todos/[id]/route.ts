import { NextRequest, NextResponse } from 'next/server';  // Add NextRequest
import clientPromise from '@/lib/mongodb';
import { Todo, TodoDto } from '@/types/todo';
import { ObjectId } from 'mongodb';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }  // Updated type
) {
    try {
        const { id } = await params;  // Await the promise

        // Validate ObjectId format first
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('myDatabase');

        const todo = await db.collection<Todo>('todos').findOne({
            _id: new ObjectId(id),
        });

        if (!todo) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Transform for API response
        const todoDto: TodoDto = {
            _id: todo._id.toHexString(),
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
