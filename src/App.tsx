import {
  Binary,
  Check,
  Copy,
  Github,
  Hash,
  Layers,
  Moon,
  Octagon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BASES = [
  { text: 'Decimal', base: 10, placeholder: 'e.g. 42', icon: Layers },
  { text: 'Hexadecimal', base: 16, placeholder: 'e.g. 2A', icon: Hash },
  { text: 'Binary', base: 2, placeholder: 'e.g. 101010', icon: Binary },
  { text: 'Octal', base: 8, placeholder: 'e.g. 52', icon: Octagon },
];

export default function App() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(0);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-primary/20">
      <header className="container mx-auto px-4 py-6 md:py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-2 justify-center sm:justify-start">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-lg">
              10
            </span>
            Numbers
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            Convert between bases instantly.
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full w-10 h-10 border-2 hover:bg-accent"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {BASES.map((props) => (
            <NumberCard
              key={props.text}
              {...props}
              value={value}
              setValue={setValue}
            />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t py-4 text-muted-foreground z-10">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span>Made with ❤️ by</span>
            <a
              href="https://github.com/sousandrei"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Github className="h-3.5 w-3.5" />
              Andrei Sousa
            </a>
          </div>
          <p className="text-[10px] sm:text-xs tracking-wider opacity-60">
            © {new Date().getFullYear()} NUMBERS CONVERTER
          </p>
        </div>
      </footer>
    </div>
  );
}

interface NumberCardProps {
  text: string;
  base: number;
  placeholder: string;
  icon: React.ElementType;
  value: number;
  setValue: (value: number) => void;
}

function NumberCard({
  text,
  base,
  placeholder,
  icon: Icon,
  value,
  setValue,
}: NumberCardProps) {
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    if (!inputValue) {
      return setValue(0);
    }

    const newValue = Number.parseInt(inputValue, base);
    if (Number.isNaN(newValue)) {
      return;
    }

    setValue(newValue);
  };

  const displayValue =
    value === 0 && text !== 'Decimal' ? '' : value.toString(base).toUpperCase();

  const copyToClipboard = () => {
    if (displayValue) {
      navigator.clipboard.writeText(displayValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 dark:bg-card/50">
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Icon size={18} />
          </div>
          <CardTitle className="text-base sm:text-lg font-bold tracking-tight">
            {text}
          </CardTitle>
        </div>
        <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">
          BASE {base}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative group/input">
          <Label htmlFor={`base-${base}`} className="sr-only">
            {text} Value
          </Label>
          <Input
            id={`base-${base}`}
            type="text"
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            className="text-xl sm:text-2xl h-14 sm:h-16 font-mono font-bold tracking-wider focus-visible:ring-primary focus-visible:ring-offset-2 border-2 pr-12 transition-all"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            disabled={!displayValue}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 opacity-0 group-hover/input:opacity-100 transition-opacity"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    </Card>
  );
}
