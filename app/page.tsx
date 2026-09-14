import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = async () => {
  return (
    <main>
      <nav></nav>
      <div className="mt-20 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold">Kanban</h1>
        <p className="text-xl font-medium">Manage your work with ease.</p>
      </div>

      <div className="mt-20 flex flex-col justify-center items-center">
        <div>
          <Link
            href="/login"
            className="bg-violet-400 text-white px-4 py-2 rounded"
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
