// pages/recipes.tsx
"use client"

import { useEffect, useState } from 'react';
 
// Definindo a tipagem para os dados da receita

interface Recipe {

  id: number;

  title: string;

  image: string;

  time: string;

  servings: number;

  difficulty: string;

  ingredients: string[];

  instructions: string[];

  category: string;

}
 
const RecipesPage = () => {

  // Estado para armazenar a lista de receitas

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
 
  // Função para buscar as receitas da API

  const fetchRecipes = async () => {

    try {

      const response = await fetch('http://localhost:8080/recipes');

      if (!response.ok) {

        throw new Error('Erro ao carregar as receitas');

      }

      const data = await response.json();

      setRecipes(data); // Armazena as receitas no estado

    } catch (error) {

      console.error('Erro ao buscar receitas:', error);

    } finally {

      setLoading(false);

    }

  };
 
  // Chama a função de buscar receitas ao carregar a página

  useEffect(() => {

    fetchRecipes();

  }, []);
 
  if (loading) {

    return <div>Carregando receitas...</div>;

  }
 
  return (
<div className="container mx-auto px-4 py-8">
<h1 className="text-4xl font-bold text-center mb-6">Lista de Receitas</h1>

      {recipes.length === 0 ? (
<p className="text-center text-gray-500">Nenhuma receita encontrada.</p>

      ) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {recipes.map((recipe) => (
<div key={recipe.id} className="border rounded-lg overflow-hidden shadow-md">
<img

                src={recipe.image}

                alt={recipe.title}

                className="w-full h-48 object-cover"

              />
<div className="p-4">
<h2 className="text-2xl font-semibold text-gray-800">{recipe.title}</h2>
<p className="text-sm text-gray-500">{recipe.category}</p>
<p className="text-sm text-gray-600 mt-2">{recipe.time} | {recipe.servings} porções</p>
<p className="text-sm text-gray-700 mt-2">Dificuldade: {recipe.difficulty}</p>
<div className="mt-4">
<button

                    onClick={() => alert(`Ingredientes: ${recipe.ingredients.join(', ')}`)}

                    className="text-orange-500 hover:text-orange-600"
>

                    Ver Ingredientes
</button>
</div>
</div>
</div>

          ))}
</div>

      )}
</div>

  );

};
 
export default RecipesPage;

 