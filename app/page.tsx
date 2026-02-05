'use client';
import { useEffect, useState } from 'react';
import { Todo } from '@/types/todo';
import RecipeButton from "@/components/testrecipebutton";

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetch('/api/todos')
            .then(res => res.json())
            .then(data => setTodos(data.todos));
    }, []);

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo._id.toString()}>{todo.title}</li>
            ))}
            <RecipeButton/>
        </ul>
    );
}
