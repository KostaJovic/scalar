import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'
import { Todo, TodoDto } from '@/types/todo';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('myDatabase');  // Your DB name
        const todos = await db
            .collection<Todo>('todos')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        const todosWithStringId = todos.map((todo): TodoDto => ({
            _id: todo._id.toHexString(),
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            createdAt: todo.createdAt,
        }));

        return NextResponse.json({ todos: todosWithStringId });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db('myDatabase');

        const result = await db.collection<Todo>('todos').insertOne({
            ...body,
            completed: false,
            createdAt: new Date(),
        });

        const todo = await db.collection<Todo>('todos').findOne({ _id: result.insertedId });
        return NextResponse.json({ todo }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}
