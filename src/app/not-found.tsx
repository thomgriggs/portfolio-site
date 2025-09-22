import Link from "next/link";

export default function NotFound() {
	return (
		<main className="container">
			<h1>Page not found</h1>
			<p>Let&apos;s get you back on track.</p>
			<p><Link href="/">Go home</Link></p>
		</main>
	)
}
