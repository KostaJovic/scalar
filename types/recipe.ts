export type Recipe = {
    id: string;
    title: string;
    description?: string;
    prepTime: number; // minutes
    cookTime: number; // minutes
    servings: number;
    difficulty?: 'easy' | 'medium' | 'hard';

    ingredients: Ingredient[];

    instructions: Step[];

    nutrition?: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };

    tags?: string[];
    imageUrl?: string;
    sourceUrl?: string;
    author?: string;
    createdAt: Date;
    updatedAt?: Date;
};

type Ingredient = {
    name: string;
    quantity: number;
    unit: Unit;
    optional?: boolean;
}

type Unit = 'g' | 'kg' | 'mg' | 'oz' | 'lb' | 'tsp' | 'tbsp' | 'ml' | 'l' | 'cl' | 'fl oz' | 'cup' | 'pt' | 'qt' | 'gal' | 'pinch' | 'dash' | 'drop' | 'piece' | 'slice' | 'clove' | 'sprig' | 'handful' | 'bunch';

type Step = {
    step: number;
    description: string;
    time?: number;
}