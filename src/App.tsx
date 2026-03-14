import { useState } from "react";

const CARDS = [
	{ text: "Decimal", base: 10 },
	{ text: "Hex", base: 16 },
	{ text: "Binary", base: 2 },
	{ text: "Octal", base: 8 },
];

export default function App() {
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
		<div className="flex h-screen w-full flex-col items-center justify-center p-10 xl:p-48 bg-white dark:bg-black transition-colors duration-300">
			<div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 justify-items-center">
				{cards}
			</div>

			<div className="absolute right-3 top-3">
				<button type="button" onClick={() => toggleDarkMode()} className="text-2xl cursor-pointer">
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
		if (Number.isNaN(newValue)) {
			return;
		}

		setValue(newValue);
	};

	return (
		<div
			className="flex flex-col gap-6 h-72 w-full p-10 justify-center
			rounded-md shadow-md 
			border border-slate-100 dark:border-slate-800
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
				dark:text-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
				type="text"
				value={Number(value).toString(base)}
				onChange={handleChange}
			/>
		</div>
	);
}
