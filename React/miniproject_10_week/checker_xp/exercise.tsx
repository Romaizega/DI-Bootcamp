// App.tsx

import { useState, useEffect } from 'react';
import './App.css';
import RecipeItem from './assets/model/RecipeItem';
import RecipeTemplate from './assets/templates/RecipeTemplate';

function App() {
  const [recipes, setRecipe] = useState<RecipeItem[]>([])

  useEffect (()=>{
    const recipe = new RecipeItem(
      "Spaghetti with Sauce",
      ["spaghetti", "tomato", "garlic"],
      "Boil the spaghetti and add the sauce.",
      false
    );
    setRecipe([recipe])
  }, [])

const handleToggleFavorite = (id: string, isFavorite: boolean) => {
  const updatedRecipes = recipes.map(recipe => {
    if (recipe.id === id) {
      return new RecipeItem(
        recipe.title,
        recipe.ingredients,
        recipe.instructions,
        isFavorite
      );
    }
    return recipe;
  });

  setRecipe(updatedRecipes);
};


  const handleDelete = (id: string) => {
    const filtered = recipes.filter(recipe => recipe.id !== id);
    setRecipe(filtered);
  };

  return (
    <>
      {recipes.map(recipe => (
        <RecipeTemplate
          key={recipe.id}
          recipe={recipe}
          onMarkFavorite={(id) => handleToggleFavorite(id, !recipe.isFavorite)}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}

export default App;



// model/ RecipeCollection

import RecipeItem from "./RecipeItem"

class RecipeCollection {
  private recipes: RecipeItem[];
  constructor(){
    this.recipes = []
  }

  addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe)
  }
  removeRecipe(id:string): void {
    const foundRecipe = this.recipes.find(recipe => recipe.id === id)
    if(!foundRecipe){
      throw new Error ("Recipe not found")
    }
    this.recipes = this.recipes.filter(recipe => recipe.id !== id)
  }
  toggleFavoriteRecipe(id:string, isFavorite: boolean): void {
    const foundRecipe = this.recipes.find(recipe => recipe.id === id)
    if(!foundRecipe){
      throw new Error ("Recipe not found")
    }
    foundRecipe.isFavorite = isFavorite
  }
  saveToLocalStorage(): void{
    const data = JSON.stringify(this.recipes)
    localStorage.setItem("recipes", data)
  }
  loadFromLocalStorage(): void {
    const data = localStorage.getItem("recipes")
    if(!data) return

    const getRecipes = JSON.parse(data) 
    this.recipes = getRecipes.map((item: any)=> (
      item.title,
      item.ingredients,
      item.instructions,
      item.isFavorite
    ))
  }
}

export default RecipeCollection

// model/RecipeItem

import { v4 as uuidv4 } from 'uuid';

type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

class RecipeItem implements Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    isFavorite: boolean
  ) {
    this.id = uuidv4();
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.isFavorite = isFavorite;
  }
}

export default RecipeItem


// templates/ RecipeTemplate

import type RecipeItem from "../model/RecipeItem";

type RecipeTemplateProps = {
  recipe: RecipeItem;
  onMarkFavorite: (id: string) => void;
  onDelete: (id: string) => void;
};

const RecipeTemplate = ({ recipe, onMarkFavorite, onDelete }: RecipeTemplateProps) => {
  return (
    <>
      <div>
        <h2>{recipe.title}</h2>
        <details>
          <summary>Details</summary>
          <details>
            <summary>Insractions</summary>
              <h5>{recipe.instructions}</h5>
          </details>
          <details>
            <summary>Ingredients</summary>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </details>
        </details>
        <button onClick={() => onMarkFavorite(recipe.id)}>
          {recipe.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        <button onClick={() => onDelete(recipe.id)}>Delete</button>
      </div>
    </>
  );
};

export default RecipeTemplate;
