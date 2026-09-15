import { Button } from "@/components/ui/button";
import Link from "next/link";
import { headers } from 'next/headers';
import {auth} from '@/lib/auth/auth'
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if(session?.user) {
    return redirect("/kanban")
  }

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
