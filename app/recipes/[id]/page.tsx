"use client";
import { useParams } from 'next/navigation';
import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {Recipe} from "@/types/recipe";

async function fetchRecipe(id: string) {
    const res = await fetch(`/api/recipes/${id}`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.recipe as Recipe;
}

export default function RecipeDetail() {
    const params = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['recipe'],
        queryFn: ()=> fetchRecipe(params.id as string),

    });

    useEffect(() => {
        console.log(data)
    }, [data])

    if (isLoading || !data) return

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <button className="mb-8 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700">
                    ← Back to recipes
                </button>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">



                    <div className="p-12">
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                                {data.difficulty} • {data.prepTime + data.cookTime} min
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                {data.servings} servings
                            </div>
                            {data.tags?.map((tag) => (
                                <span key={tag} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">
                  {tag}
                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{data.title}</h1>
                        <p className="text-xl text-gray-600 mb-12">{data.description}</p>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <span>🥘 Ingredients</span>
                                </h2>
                                <ul className="space-y-3">
                                    {data.ingredients.map((ingredient, i) => (
                                        <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                                            <span>{ingredient.name}', '{ingredient.quantity}{ingredient.unit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <span>👨‍🍳 Instructions</span>
                                </h2>
                                <ol className="space-y-4">
                                    {data.instructions.map((step, i) => (
                                        <li key={i} className="flex gap-4 p-4 bg-blue-50 rounded-2xl">
                                            <div className="w-10 h-10 bg-blue-200 rounded-2xl flex items-center justify-center font-bold text-blue-800">
                                                {i + 1}
                                            </div>
                                            <p className="flex-1">{step.step}# {step.description}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
