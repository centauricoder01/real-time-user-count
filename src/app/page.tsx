"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState<number>(0);

  const count = localStorage.getItem('pageVisitCount');
  useEffect(() => {

    // If the counter exists, use it, otherwise default to 0
    const initialCount = count ? parseInt(count, 10) : 0;

    // Increment the counter
    const newCount = initialCount + 1;

    setCounter(prevCounter => newCount); // Set the counter to the new count

    // Update the counter value in localStorage
    localStorage.setItem('pageVisitCount', newCount.toString());
  }, []); // This effect runs only once when the component mounts

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] justify-content:center align-items:center">
        <div className="flex items-center flex-col	">
          <h1 className="text-9xl font-extrabold">{counter}</h1>
          <p className="font-semibold text-3xl">Total User Count</p>
        </div>
      </div>
    </main>
  );
}
