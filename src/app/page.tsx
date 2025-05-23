import Image from "next/image";
import BicycleImage from "../../public/bicycle.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-screen w-screen gap-10 ">
      <div className="flex flex-col items-center mt-32 p-6 border-2 border-orange-300">
        <div className="border-2 border-gray-600 w-full flex justify-center py-4 text-xl font-semibold">
          Actiune
        </div>
        <Link href={"/bike"}>
          <section className="flex gap-20 items-center border-2 p-10 text-lg">
            <p>Statut Bicicleta</p>
            <Image
              src={BicycleImage}
              alt="Bicycle"
              width={0}
              height={0}
              className="h-12 w-auto"
            />
          </section>
        </Link>
      </div>
    </main>
  );
}
