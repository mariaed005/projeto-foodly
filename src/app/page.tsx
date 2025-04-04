import { Categories } from "@/components/categories/page";
import { Footer } from "@/components/footer/page";
import { Header } from "@/components/header/page";
import { Recipes } from "@/components/recipes/page";
import Image from "next/image";


export default function Home(){

  return (
    <>
        <Header />
        <section className="relative w-full h-95">
            <Image src="/homepage.jpg" alt="Banner de receitas" layout="fill" objectFit="cover" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-3xl font-bold">Descubra o prazer de cozinhar!</h2>
            </div>
        </section>
        <Recipes/>
        <Categories />
        <Footer />
    </>
)}