import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";

/** Total duration of the fake analysis, in milliseconds (~1 minute). */
const DURATION_MS = 60_000;
const TICK_MS = 250;

const STEPS = [
  "Conectando aos servidores...",
  "Tentando quebrar a criptografia...",
  "Analisando mensagens apagadas...",
  "Varrendo histórico de conversas...",
  "Cruzando horários de atividade...",
  "Identificando contatos recorrentes...",
  "Recuperando fragmentos de mídia...",
  "Compilando o relatório final...",
] as const;

export interface AnalyzingScreenProps {
  /** Phone number or Instagram @ typed by the user. */
  target: string;
  onReveal: () => void;
  /** Optional custom status messages shown while the bar fills. */
  steps?: readonly string[];
  /** Optional custom heading prefix (defaults to "Analisando dados de"). */
  heading?: string;
  /** Optional label for the button released at 100%. */
  ctaLabel?: string;
}

export function AnalyzingScreen({
  target,
  onReveal,
  steps = STEPS,
  heading = "Analisando dados de",
  ctaLabel = "Eu quero saber tudo agora",
}: AnalyzingScreenProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const id = setInterval(() => {
      setElapsed(Math.min(Date.now() - startedAt, DURATION_MS));
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const progress = Math.round((elapsed / DURATION_MS) * 100);
  const done = progress >= 100;
  const stepIndex = Math.min(
    Math.floor((elapsed / DURATION_MS) * steps.length),
    steps.length - 1,
  );
  const label = done ? "Análise concluída" : steps[stepIndex];

  return (
    <div className="animate-sintonia-rise mt-8 text-center">
      <h1 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
        {heading}{" "}
        <span className="text-gradient-sintonia break-all">{target}</span>
      </h1>

      <p
        className="mt-6 font-display text-4xl font-extrabold tabular-nums"
        aria-hidden
      >
        {progress}%
      </p>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label="Progresso da análise"
        className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10"
      >
        <div
          className="bg-gradient-sintonia h-full rounded-full transition-[width] duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p
        aria-live="polite"
        className="mt-5 flex items-center justify-center gap-2 text-sm text-sintonia-muted"
      >
        {done ? (
          <ShieldCheck className="size-4" aria-hidden />
        ) : (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        )}
        {label}
      </p>

      {done && (
        <button
          type="button"
          onClick={onReveal}
          className="bg-gradient-sintonia animate-sintonia-rise mt-8 w-full rounded-2xl px-8 py-4 font-display text-base font-bold text-sintonia-bg shadow-[0_18px_40px_-18px_var(--sintonia-violet)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sintonia-pink sm:w-auto"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
