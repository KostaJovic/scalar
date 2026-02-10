"use client";
import { useQuery } from '@tanstack/react-query';
import RecipeCard from '@/components/RecipeCard';

async function fetchRecipes() {
    const res = await fetch('/api/recipes');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
}

export default function Home() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
    });

    if (isLoading) return <div className="flex justify-center py-12">Loading recipes...</div>;
    if (error) return <div className="text-red-500 text-center py-12">Error loading recipes</div>;

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 to-yellow-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Recipe Hub
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.recipes.map((recipe: any) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
}
