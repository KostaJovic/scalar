"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRecipe() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        prepTime: 0,
        cookTime: 0,
        servings: 1,
        difficulty: 'Easy',
        ingredients: [''] as string[],
        instructions: [''] as string[],
        imageUrl: '',
        tags: [''],
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/recipes');
                router.refresh(); // Revalidate home page
            }
        } catch (error) {
            console.error('Failed to create recipe');
        } finally {
            setLoading(false);
        }
    };

    const addIngredient = () => setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
    const removeIngredient = (index: number) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData({ ...formData, ingredients: newIngredients });
    };

    const updateIngredient = (index: number, value: string) => {
        const newIngredients = formData.ingredients.map((ing, i) => i === index ? value : ing);
        setFormData({ ...formData, ingredients: newIngredients });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    ← Back
                </button>

                <div className="bg-white rounded-3xl shadow-2xl p-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Add New Recipe</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time (min)</label>
                                <input
                                    type="number"
                                    value={formData.prepTime}
                                    onChange={(e) => setFormData({ ...formData, prepTime: +e.target.value })}
                                    className="w-full p-4 border border-gray-300 rounded-2xl"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cook Time (min)</label>
                                <input
                                    type="number"
                                    value={formData.cookTime}
                                    onChange={(e) => setFormData({ ...formData, cookTime: +e.target.value })}
                                    className="w-full p-4 border border-gray-300 rounded-2xl"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                            <div className="space-y-3">
                                {formData.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex gap-3 items-end">
                                        <input
                                            type="text"
                                            value={ingredient}
                                            onChange={(e) => updateIngredient(index, e.target.value)}
                                            placeholder={`Ingredient ${index + 1}`}
                                            className="flex-1 p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-200"
                                        />
                                        {formData.ingredients.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeIngredient(index)}
                                                className="px-4 py-4 bg-red-100 text-red-600 rounded-2xl hover:bg-red-200"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addIngredient}
                                    className="w-full p-4 border-2 border-dashed border-orange-300 text-orange-700 rounded-2xl hover:bg-orange-50"
                                >
                                    + Add Ingredient
                                </button>
                            </div>
                        </div>

                        {/* Similar structure for Instructions, Image URL, etc. - keeping it concise */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-6 rounded-2xl text-xl font-bold hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Recipe'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}