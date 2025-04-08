import Link from "next/link";
import { FaDrumstickBite, FaIceCream, FaPizzaSlice } from "react-icons/fa";

interface CategoriesProps {
    active?: string;
}

const links = [
    { label: "Carnes", href: "/carnes", icon: FaDrumstickBite },
    { label: "Massas", href: "/massas", icon: FaPizzaSlice },
    { label: "Sobremesas", href: "/sobremesas", icon: FaIceCream },
    { label: "Cadastro Receita", href: "/form", icon: FaIceCream },
    { label: "Ver Receita", href: "/listaReceita", icon: FaIceCream }
    
];

export function Categories({ active }: CategoriesProps) {
    const classActive = "border-b-4 border-primary text-primary";

    return (
        <section className="p-6 bg-amber-50 shadow-md rounded-lg flex justify-center items-center">
            <nav>
                <h1 className="text-2xl font-bold mb-6 text-center">Categorias</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
                    {links.map((link) => (
                        <Link key={link.label} href={link.href}>
                            <button 
                                className={`flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-100 transition ${
                                    active === link.label ? "bg-primary text-white" : ""
                                }`}
                            >
                                <link.icon size={32} className="mb-2" />
                                <span>{link.label}</span>
                            </button>
                        </Link>
                    ))}
                </div>
            </nav>
        </section>
    );

} 