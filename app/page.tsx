// ✅ STRAN: HOME (/)
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-black">
      
      <main className="flex w-full max-w-3xl flex-col items-center gap-16 py-10 px-6 sm:px-10">
        
        
        <div className="flex justify-center">
          <Link href="/pesmi">
            <Image
              src="/pesmarica-m.png"
              alt="Slovenske narodne pesmi - Dobra volja je najbolja"
              width={400}
              height={200}
              priority
            />
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">

          <p className="text-xs uppercase tracking-widest text-gray-500">
            Skupaj zaigrajmo in zapojmo
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
            Slovenske narodne pesmi
          </h1>

          <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">
            Pred vami je izbor slovenskih narodnih pesmi, ki so jih naši predniki 
            prepevali ob različnih priložnostih.
          </p>
          
          <a href="/pesmi"
            className="mt-4 inline-block rounded-full bg-red-700 px-6 py-3 text-white font-semibold transition hover:bg-red-800">
            Poglej pesmi
          </a>

        </div>

      </main>
    </div>
  );
}