import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LockKeyhole, LoaderCircle } from "lucide-react";

const DURATION_MS = 20_000;
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
  target: string;
  onReveal: () => void;
  steps?: readonly string[];
  heading?: string;
  ctaLabel?: string;
}

export function AnalyzingScreen({
  onReveal,
}: AnalyzingScreenProps) {
  const [elapsed, setElapsed] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Garante que o portal só seja criado no navegador
  useEffect(() => {
    setMounted(true);
  }, []);

  // Contador do carregamento
  useEffect(() => {
    if (!mounted) return;

    const startedAt = Date.now();

    const id = setInterval(() => {
      const current = Math.min(
        Date.now() - startedAt,
        DURATION_MS
      );

      setElapsed(current);
    }, TICK_MS);

    return () => clearInterval(id);
  }, [mounted]);

  // Quando chegar em 100%, avança automaticamente
  useEffect(() => {
    if (elapsed >= DURATION_MS) {
      onReveal();
    }
  }, [elapsed, onReveal]);

  if (!mounted) {
    return null;
  }

  const progress = Math.round(
    (elapsed / DURATION_MS) * 100
  );

  const content = (
  
    <div className="fixed inset-0 z-[99999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#111111]">
          <div className="absolute left-1/2 top-[18%] -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full bg-[#1b1b1b] px-4 py-2 shadow-lg">
        <LoaderCircle
          className="size-4 animate-spin text-[#20c76a]"
          strokeWidth={2.5}
        />

        <span className="text-[13px] font-medium text-[#dddddd]">
          Iniciando Bruteforce...
        </span>
      </div>
    </div>

      <div className="flex -translate-y-5 flex-col items-center text-center">

        {/* ÍCONE */}
<img
  src="/wpp.png"
  alt=""
  className="mb-5 h-[52px] w-[52px] object-contain"
/>

        {/* TEXTO */}
        <p className="text-[16px] font-normal text-[#eeeeee]">
          Carregando conversas [{Math.max(progress, 2)}%]
        </p>

        {/* BARRA */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="mt-7 h-1 w-[190px] overflow-hidden rounded-full bg-[#444444]"
        >
          <div
            className="h-full rounded-full bg-[#20c76a] transition-[width] duration-200 ease-linear"
            style={{
              width: `${Math.max(progress, 2)}%`,
            }}
          />
        </div>

        {/* CRIPTOGRAFIA */}
        <div className="mt-7 flex items-center gap-1.5 text-[13px] font-normal text-[#999999]">
          <LockKeyhole
            className="size-[15px] shrink-0"
            strokeWidth={2}
            aria-hidden
          />

          <span>
            Protegida com criptografia de ponta a ponta
          </span>
        </div>

      </div>
    </div>
  );

  return createPortal(content, document.body);
}