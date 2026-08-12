import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  Heart,
  Lock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";

import { AmbientSymbols } from "@/components/sintonia/ambient-symbols";
import { AnalyzingScreen } from "@/components/sintonia/analyzing-screen";
import { DeletedFiles } from "@/components/sintonia/deleted-files";
import { DevStageMenu } from "@/components/sintonia/dev-stage-menu";


const TITLE = "Estalqueando — Ele está apagando mensagens?";
const DESCRIPTION =
  "mensagens apagadas no WhatsApp. 5 perguntas, 2 minutos, resultado privado.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "intro" | "analyzing" | "result" | "cracking" | "success" | "files";

const STAGES = [
  "intro",
  "analyzing",
  "result",
  "cracking",
  "success",
  "files",
] as const satisfies readonly Stage[];

const CRACKING_STEPS = [
  "Tentando com força máxima romper as proteções...",
  "Contornando a autenticação de dois fatores...",
  "Forçando a criptografia de ponta a ponta...",
  "Recuperando históricos apagados...",
  "Extraindo mídias da galeria...",
  "Montando o pacote final de arquivos...",
] as const;

function Index() {
  const [stage, setStage] = useState<Stage>("intro");
  const [target, setTarget] = useState("");

  const start = useCallback((value: string) => {
    setTarget(value);
    setStage("analyzing");
  }, []);

  const reveal = useCallback(() => setStage("result"), []);
  const crack = useCallback(() => setStage("cracking"), []);
  const succeed = useCallback(() => setStage("success"), []);
  const openFiles = useCallback(() => setStage("files"), []);

  const restart = useCallback(() => {
    setTarget("");
    setStage("intro");
  }, []);


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sintonia-bg px-4 py-12 font-sans text-sintonia-ink">
      <AmbientSymbols />

      {/* Radial violet glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--sintonia-violet) 0%, transparent 68%)",
        }}
      />

      <section className="glass-card relative z-10 w-full max-w-xl rounded-[2rem] p-7 sm:p-10">
        <header className="flex items-center justify-center gap-2">
          <span className="bg-gradient-sintonia flex size-7 items-center justify-center rounded-lg">
            <Heart className="size-4 text-sintonia-bg" aria-hidden />
          </span>
          <span className="font-display text-sm font-bold tracking-wide">Estalqueando</span>
        </header>

        {stage === "intro" && <IntroScreen onStart={start} />}
        {stage === "analyzing" && (
          <AnalyzingScreen target={target} onReveal={reveal} />
        )}
        {stage === "result" && <ResultScreen target={target} onRetry={crack} />}
        {stage === "cracking" && (
          <AnalyzingScreen
            target={target}
            onReveal={succeed}
            steps={CRACKING_STEPS}
            heading="Rompendo as proteções de"
            ctaLabel="Ver imediatamente"
          />
        )}
        {stage === "success" && <SuccessScreen onShow={openFiles} />}
        {stage === "files" && <DeletedFiles />}

      </section>

      {/* Menu temporário de edição — remova a condicional `false &&` para reativar */}
       <DevStageMenu stages={STAGES} current={stage} onSelect={setStage} /> 
    </main>
  );
}

const INITIAL_COUNT = 12400;

function IntroScreen({ onStart }: { onStart: (target: string) => void }) {
  const [target, setTarget] = useState("");
  const [count, setCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const id = setInterval(() => setCount((prev) => prev + 1), 5000);
    return () => clearInterval(id);
  }, []);



  return (
    <form
      className="animate-sintonia-rise mt-8 text-center"
      onSubmit={(event) => {
        event.preventDefault();
        onStart(target.trim() || "esse contato");
      }}

    >
      <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        Você desconfia que seu namorado(a) esteja te traindo e{" "}
        <span className="text-gradient-sintonia">apagando mensagens</span> do WhatsApp?
      </h1>

      <label htmlFor="target" className="sr-only">
        Número de telefone
      </label>
      <input
        id="target"
        name="target"
        value={target}
        onChange={(event) => setTarget(event.target.value)}
        maxLength={120}
        autoComplete="off"
        placeholder="Digite o número"
        className="mx-auto mt-6 block w-full rounded-2xl border border-sintonia-border bg-white/5 px-5 py-4 text-center text-base text-sintonia-ink placeholder:text-sintonia-muted focus-visible:border-sintonia-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sintonia-pink"
      />

      <button
        type="submit"
        className="bg-gradient-sintonia mt-5 w-full rounded-2xl px-8 py-4 font-display text-base font-bold text-sintonia-bg shadow-[0_18px_40px_-18px_var(--sintonia-violet)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-18px_var(--sintonia-pink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sintonia-pink sm:w-auto"
      >
        Descobrir agora
      </button>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-sintonia-muted">
        <Badge icon={<Timer className="size-3.5" aria-hidden />} label="2 minutos" />
        <Badge icon={<Sparkles className="size-3.5" aria-hidden />} label="100% anônimo" />
        <Badge icon={<Lock className="size-3.5" aria-hidden />} label="Resultado privado" />
      </ul>


      <p className="mt-6 text-xs text-sintonia-muted">
        +{count.toLocaleString("pt-BR")} casais já fizeram o teste essa semana
      </p>

    </form>

  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-1.5 rounded-full border border-sintonia-border px-3 py-1.5">
      {icon}
      {label}
    </li>
  );
}

function ResultScreen({
  target,
  onRetry,
}: {
  target: string;
  onRetry: () => void;
}) {
  return (
    <div className="animate-sintonia-rise mt-8 text-center">
      <p className="text-6xl sm:text-7xl" aria-hidden>
        🔓
      </p>
      <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">
        <span className="text-gradient-sintonia">Relatório pronto</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-sintonia-muted sm:text-base">
        Nós detectamos aproximadamente cinco possibilidades para burlar o WhatsApp dessa pessoa{" "}
        <span className="break-all font-semibold text-sintonia-ink">{target}</span>. Porém, a
        criptografia dessa conta e a autenticação de dois fatores está ligada. Então, vamos
        tentar novamente com o nosso quebrador de proteções versão 1.5. Clique no botão agora
        mesmo para tentativa.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="bg-gradient-sintonia mt-8 inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-display text-sm font-bold text-sintonia-bg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sintonia-pink"
      >
        <RotateCcw className="size-4" aria-hidden />
        Tentar novamente agora
      </button>
    </div>
  );
}

function SuccessScreen({ onShow }: { onShow: () => void }) {
  const [accessCode, setAccessCode] = useState("");


  const isUnlocked = accessCode.trim() === "m778KK8ytz";



  return (
    <div className="animate-sintonia-rise mt-8 text-center">
      <p className="text-6xl sm:text-7xl" aria-hidden>
        🎉
      </p>

      <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">
        <span className="text-gradient-sintonia">
          Temos uma ótima notícia
        </span>
      </h2>

      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-sintonia-muted sm:text-base">
        Conseguimos quebrar todas as proteções e já estamos com acesso total via WhatsApp Web.
      </p>
{/* contador */}



      {/* BOTÃO DE ACESSO */}
      <button
        type="button"
        disabled={!isUnlocked}
        onClick={onShow}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-8 py-4 font-display text-base font-bold transition-all sm:w-auto ${
          isUnlocked
            ? "bg-gradient-sintonia text-sintonia-bg shadow-[0_18px_40px_-18px_var(--sintonia-violet)] hover:-translate-y-0.5 cursor-pointer"
            : "cursor-not-allowed bg-white/10 text-sintonia-ink/50"
        }`}
      >
        Me mostre agora
      </button>

      {/* CAMPO DE CÓDIGO */}
      <div className="mt-6 rounded-2xl border border-sintonia-border bg-white/5 p-4 text-left">
        <p className="font-display text-sm font-bold">
          🔐 Digite seu código de acesso
        </p>

        <p className="mt-1 text-xs leading-relaxed text-sintonia-muted">
          Insira o código recebido para desbloquear o acesso.
        </p>

        <input
          type="text"
          value={accessCode}
          onChange={(e) => {
  const value = e.target.value;
  setAccessCode(value);

if (
  value.trim() === "m778KK8ytz" &&
  !localStorage.getItem("accessTimerStart")
) {
  localStorage.setItem("accessTimerStart", Date.now().toString());
}
}}
          placeholder="Digite seu código de acesso"
          className="mt-4 w-full rounded-xl border border-sintonia-border bg-black/20 px-4 py-3 text-sm text-sintonia-ink outline-none transition focus:border-sintonia-violet"
        />

        {accessCode.length > 0 && !isUnlocked && (
          <p className="mt-2 text-xs text-red-400">
            Código inválido.
          </p>
        )}

        {isUnlocked && (
          <p className="mt-2 text-xs font-semibold text-green-400">
            ✓ Código correto! Acesso desbloqueado.
          </p>
        )}
      </div>

      {/* ÁREA DO CÓDIGO */}
      <div className="mt-4 rounded-2xl border border-sintonia-border bg-white/5 p-4 text-center">
        <a
          href="https://checkout.perfectpay.com.br/pay/PPU38CQF9G0?"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-sintonia inline-flex w-full items-center justify-center rounded-2xl px-8 py-4 font-display text-base font-bold text-sintonia-bg shadow-[0_18px_40px_-18px_var(--sintonia-violet)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sintonia-pink"
        >
          Código de acesso
        </a>
      </div>
    </div>
  );
}



