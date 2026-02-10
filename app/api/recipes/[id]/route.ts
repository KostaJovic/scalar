import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'
import { NextRequest } from "next/server";
import {ObjectId} from "mongodb";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const {id} = await params;
    const client = await clientPromise;
    const db = client.db('scaler');

    const updatedRecipe = await db.collection('recipes').findOne({ _id: new ObjectId(id)});

    const recipeDto = updatedRecipe ? {
        id: updatedRecipe._id.toHexString(),
        title: updatedRecipe.title,
        description: updatedRecipe.description,
        prepTime: updatedRecipe.prepTime,
        cookTime: updatedRecipe.cookTime,
        servings: updatedRecipe.servings,
        difficulty: updatedRecipe.difficulty,
        ingredients: updatedRecipe.ingredients,
        instructions: updatedRecipe.instructions,
        nutrition: updatedRecipe.nutrition,
        tags: updatedRecipe.tags,
        imageUrl: updatedRecipe.imageUrl,
        sourceUrl: updatedRecipe.sourceUrl,
        author: updatedRecipe.author,
        createdAt: updatedRecipe.createdAt,
        updatedAt: updatedRecipe.updatedAt,
    } : null;

    return NextResponse.json({ recipe: recipeDto });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db('scaler');
        return await db.collection('recipes').insertOne(
            {
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
                updatedAt: new Date(),
            }
        )
    } catch (e) {
        return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
    }
}



// DELETE recipe by ID - DELETE /api/recipes/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const recipeId = params.id;
        const client = await clientPromise;
        const db = client.db('scaler');

        const result = await db.collection('recipes').deleteOne({
            _id: require('mongodb').ObjectId(recipeId)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Recipe deleted successfully' });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
    }
}