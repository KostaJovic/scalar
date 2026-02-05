'use client';

import { useState } from 'react';

export default function RecipeButton() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const hardCodedRecipe = {
        title: "Grilled Salmon with Lemon Herb Sauce",
        description: "Perfectly grilled salmon with a fresh lemon herb sauce, ideal for a healthy dinner.",
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        difficulty: 'medium' as const,
        ingredients: [
            { name: "salmon fillets", quantity: 200, unit: 'g', optional: false },
            { name: "lemon", quantity: 2, unit: 'piece', optional: false },
            { name: "olive oil", quantity: 4, unit: 'tbsp', optional: false },
            { name: "garlic", quantity: 2, unit: 'clove', optional: false },
            { name: "fresh parsley", quantity: 1, unit: 'handful', optional: false },
            { name: "salt", quantity: 1, unit: 'tsp', optional: false },
            { name: "black pepper", quantity: 0.5, unit: 'tsp', optional: false },
        ],
        instructions: [
            { step: 1, description: "Pat salmon dry and season with salt and pepper." },
            { step: 2, description: "Heat 2 tbsp olive oil in grill pan over medium-high heat." },
            { step: 3, description: "Grill salmon skin-side up for 4-5 minutes until golden." },
            { step: 4, description: "Flip and grill 3-4 minutes more until cooked through." },
            { step: 5, description: "Mix lemon juice, zest, garlic, parsley, and remaining olive oil for sauce." },
            { step: 6, description: "Serve salmon with lemon herb sauce spooned over top." },
        ],
        nutrition: {
            calories: 380,
            protein: 35,
            carbs: 2,
            fat: 25,
        },
        tags: ["salmon", "healthy", "dinner", "grilled", "seafood"],
        imageUrl: "",
        author: "Your Name",
    };

    const handleSubmitRecipe = async () => {
        setLoading(true);
        setStatus('');

        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hardCodedRecipe),
        });

        if (!response.ok) {
            setStatus(`❌ HTTP ${response.status}: ${response.statusText}`);
            setLoading(false);
            return;
        }

        try {
            const data = await response.json();
            setStatus('✅ Recipe created successfully!');
            console.log('Recipe saved:', data.recipe);
        } catch (parseError) {
            setStatus('❌ Failed to parse response');
            console.error('Parse error:', parseError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Test Recipe API
            </h2>

            <button
                onClick={handleSubmitRecipe}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                    </>
                ) : (
                    '🍽️ Add Grilled Salmon Recipe'
                )}
            </button>

            {status && (
                <div className="mt-4 p-3 rounded-lg font-medium text-center"
                     style={{
                         backgroundColor: status.includes('✅') ? '#dcfce7' : '#fee2e2',
                         color: status.includes('✅') ? '#166534' : '#991b1b'
                     }}>
                    {status}
                </div>
            )}
        </div>
    );
}
