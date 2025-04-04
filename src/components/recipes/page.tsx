export function Recipes() {
    return (
        <section className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Receitas em Destaque</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <img src="/carbonara.jpg" alt="Receita 1" className="rounded-lg w-full h-40 object-cover" />
                    <h4 className="mt-2 font-bold text-center">Macarrão à Carbonara</h4>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <img src="/carne.jpg" alt="Receita 2" className="rounded-lg w-full h-40 object-cover" />
                    <h4 className="mt-2 font-bold text-center">Carne Assada</h4>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <img src="/sorvete.jpg" alt="Receita 3" className="rounded-lg w-full h-40 object-cover" />
                    <h4 className="mt-2 font-bold text-center">Sorvete Caseiro</h4>
                </div>
            </div>
        </section>
    );
}