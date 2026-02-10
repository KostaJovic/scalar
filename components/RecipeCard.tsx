"use client";
import Link from 'next/link';
import Image from 'next/image';

interface RecipeCardProps {
    recipe: any;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link href={`/recipes/${recipe.id}`} className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64">
                    <Image
                        src={recipe.imageUrl || '/placeholder-food.jpg'}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {recipe.difficulty || 'Medium'}
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600">
                        {recipe.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>🕒 {recipe.prepTime + recipe.cookTime} min</span>
                        <span>👥 {recipe.servings} servings</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
