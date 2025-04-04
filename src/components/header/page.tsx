import { FaUtensils } from "react-icons/fa";

export function Header(){
    return(    
      <header className="flex justify-between items-center p-4 bg-amber-50">
        <h1 className="text-2xl font-semibold">Foodly</h1>
        <FaUtensils size={24} className="cursor-pointer" />
      </header>
    )}
    
