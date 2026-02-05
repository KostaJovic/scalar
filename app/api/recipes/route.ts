import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'
import { Recipe } from '@/types/recipe'; // Adjust path to your Recipe type location

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('myDatabase');  // Your DB name
        const recipes = await db
            .collection<Recipe>('recipes')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        const recipesWithStringId = recipes.map((recipe) => ({
            id: recipe._id.toHexString(),
            title: recipe.title,
            description: recipe.description,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            servings: recipe.servings,
            difficulty: recipe.difficulty,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            nutrition: recipe.nutrition,
            tags: recipe.tags,
            imageUrl: recipe.imageUrl,
            sourceUrl: recipe.sourceUrl,
            author: recipe.author,
            createdAt: recipe.createdAt,
            updatedAt: recipe.updatedAt,
        }));

        return NextResponse.json({ recipes: recipesWithStringId });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db('myDatabase');

        // Create MongoDB document (no id needed - MongoDB generates _id)
        const result = await db.collection('recipes').insertOne({
            title: body.title,
            description: body.description,
            prepTime: body.prepTime,
            cookTime: body.cookTime,
            servings: body.servings,
            difficulty: body.difficulty,
            ingredients: body.ingredients,
            instructions: body.instructions,
            nutrition: body.nutrition,
            tags: body.tags,
            imageUrl: body.imageUrl,
            sourceUrl: body.sourceUrl,
            author: body.author,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const recipe = await db.collection('recipes').findOne({ _id: result.insertedId });

        // Transform for frontend (id instead of _id)
        const recipeDto = recipe ? {
            id: recipe._id.toHexString(),
            title: recipe.title,
            description: recipe.description,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            servings: recipe.servings,
            difficulty: recipe.difficulty,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            nutrition: recipe.nutrition,
            tags: recipe.tags,
            imageUrl: recipe.imageUrl,
            sourceUrl: recipe.sourceUrl,
            author: recipe.author,
            createdAt: recipe.createdAt,
            updatedAt: recipe.updatedAt,
        } : null;

        return NextResponse.json({ recipe: recipeDto }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
    }
}
