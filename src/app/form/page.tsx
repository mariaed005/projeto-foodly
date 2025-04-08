"use client";

import { useState } from "react";
import { BsArrowLeft, BsUpload } from "react-icons/bs";
import { PiPlus } from "react-icons/pi";

const Cadastro = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    image: '',
    time: '',
    servings: '',
    difficulty: 'FÁCIL',
    category: '',
    ingredients: [''],
    instructions: [''],
  });

  const handleChange = (field: string, value: string) => {
    setRecipe((prev) => ({ ...prev, [field]: value }));
  };

  const handleListChange = (field: 'ingredients' | 'instructions', index: number, value: string) => {
    const updatedList = [...recipe[field]];
    updatedList[index] = value;
    setRecipe((prev) => ({ ...prev, [field]: updatedList }));
  };

  const handleAddField = (field: 'ingredients' | 'instructions') => {
    setRecipe((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const normalizeText = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();

  const categoryMap: Record<string, string> = {
    "Massas": "MASSAS",
    "Saladas": "SALADAS",
    "Carnes": "CARNES",
    "Sobremesas": "DOCES"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: recipe.title.trim(),
      image: recipe.image.trim(),
      time: recipe.time.trim(),
      servings: parseInt(recipe.servings.replace(/\D/g, '') || '0'),
      difficulty: normalizeText(recipe.difficulty),
      ingredients: recipe.ingredients.map(i => i.trim()),
      instructions: recipe.instructions.map(i => i.trim()),
      category: categoryMap[recipe.category] || normalizeText(recipe.category),
    };

    try {
      const response = await fetch('http://localhost:8080/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Erro ao salvar');

      alert('Receita cadastrada com sucesso!');

      setRecipe({
        title: '',
        image: '',
        time: '',
        servings: '',
        difficulty: 'FÁCIL',
        category: '',
        ingredients: [''],
        instructions: [''],
      });
    } catch (err) {
      alert('Erro ao cadastrar receita');
      console.error(err);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-orange-500 transition mb-4"
          >
            <BsArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button>
          <h2 className="text-3xl font-bold text-gray-800">Adicionar Nova Receita</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título da Receita</label>
            <input
              type="text"
              value={recipe.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
              placeholder="Ex: Bolo de Cenoura"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
            <div className="flex gap-4">
              <input
                type="url"
                value={recipe.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <BsUpload className="h-5 w-5" />
                Upload
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={recipe.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
              placeholder="Tempo de preparo"
              required
            />
            <input
              type="text"
              value={recipe.servings}
              onChange={(e) => handleChange('servings', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
              placeholder="Porções"
              required
            />
            <select
              value={recipe.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
              required
            >
              <option value="FÁCIL">Fácil</option>
              <option value="MÉDIO">Médio</option>
              <option value="DIFÍCIL">Difícil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <input
              type="text"
              value={recipe.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
              placeholder="Categoria"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredientes</label>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <input
                  key={idx}
                  value={ing}
                  onChange={(e) => handleListChange('ingredients', idx, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
                  placeholder={`Ingrediente ${idx + 1}`}
                  required
                />
              ))}
              <button
                type="button"
                onClick={() => handleAddField('ingredients')}
                className="text-orange-500 hover:text-orange-600 flex items-center gap-1"
              >
                <PiPlus className="h-4 w-4" /> Adicionar Ingrediente
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Modo de Preparo</label>
            <div className="space-y-2">
              {recipe.instructions.map((step, idx) => (
                <textarea
                  key={idx}
                  value={step}
                  onChange={(e) => handleListChange('instructions', idx, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
                  placeholder={`Passo ${idx + 1}`}
                  rows={2}
                  required
                />
              ))}
              <button
                type="button"
                onClick={() => handleAddField('instructions')}
                className="text-orange-500 hover:text-orange-600 flex items-center gap-1"
              >
                <PiPlus className="h-4 w-4" /> Adicionar Passo
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Salvar Receita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;