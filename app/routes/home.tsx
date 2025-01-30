import type { Route } from "./+types/home";

import { useState } from "react";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Numbers" },
		{ name: "description", content: "Quickest number convertion!" },
	];
};

const CARDS = [
	{ text: "Decimal", base: 10 },
	{ text: "Hex", base: 16 },
	{ text: "Binary", base: 2 },
	{ text: "Octal", base: 8 },
];

export default function Index() {
	const [dark, setDark] = useState(false);

	const toggleDarkMode = () => {
		setDark(!dark);
		document.body.classList.toggle("dark");
	};

	const [value, setValue] = useState(0);

	const cards = CARDS.map((props) => (
		<Card key={props.text} {...props} value={value} setValue={setValue} />
	));

	return (
		<div className="flex h-screen w-full flex flex-col items-center justify-center p-10 xl:p-48">
			<div className="grid xs:grid-cols-1 sm:grid-cols-2 w-full gap-4 justify-items-end">
				{cards}
			</div>

			<div className="absolute right-3 top-3">
				<button type="button" onClick={() => toggleDarkMode()}>
					{dark ? "🌖" : "🌒"}
				</button>
			</div>

			<footer className="absolute right-3 bottom-3 text-slate-900 dark:text-slate-300">
				Made with ❤️ by
				<a
					href="https://github.com/sousandrei"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 p-1"
				>
					Andrei Sousa
				</a>
			</footer>
		</div>
	);
}

interface CardProps {
	text: string;
	base: number;
	value: number;
	setValue: (value: number) => void;
}

function Card({ text, base, value, setValue }: CardProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			return setValue(0);
		}

		const newValue = Number.parseInt(e.target.value, base);
		if (Number.isNaN(e.target.value)) {
			return;
		}

		setValue(newValue);
	};

	return (
		<div
			className="flex flex-col gap-6 h-72 w-full p-10 justify-center
			rounded-md shadow-md 
			border-slate-100 dark:border-slate-900
			bg-slate-100 dark:bg-slate-900"
		>
			<p
				className="text-2xl font-bold text-center 
				text-slate-950 dark:text-slate-100"
			>
				{text}
			</p>
			<input
				className="w-full text-xl p-4 rounded-md
				text-slate-950 bg-slate-300
				dark:text-slate-100 dark:bg-gray-800"
				type={text}
				value={Number(value).toString(base)}
				onChange={handleChange}
			/>
		</div>
	);
}
