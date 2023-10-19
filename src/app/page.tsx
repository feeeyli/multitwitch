import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col justify-between items-center py-24">
			<div className="text-center">
				<h1 className="text-6xl font-bold">MultiTwitch</h1>
				<h2 className="text-xl mt-2">Coming soon...</h2>
			</div>
			<span>
				Do you like QSMP? Try{" "}
				<Link
					href="https://multiqsmp.vercel.app"
					target="_blank"
					className="text-[#bfa9e5] p-0 hover:underline"
				>
					MultiQSMP
				</Link>
			</span>
		</main>
	);
}
