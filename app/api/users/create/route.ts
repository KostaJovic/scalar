import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../../scaler-temp/lib/mongodb';
import User from '../../../../models/User';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { name, email, age } = await request.json();

        const newUser = new User({ name, email, age });
        await newUser.save();

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
