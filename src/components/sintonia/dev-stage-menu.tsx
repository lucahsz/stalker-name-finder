/**
 * Menu temporário de navegação entre as telas (apenas para modelagem/edição).
 * Para remover: apague este arquivo e a linha <DevStageMenu ... /> em src/routes/index.tsx.
 */
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface DevStageMenuProps<T extends string> {
  stages: readonly T[];
  current: T;
  onSelect: (stage: T) => void;
}

const LABELS: Record<string, string> = {
  intro: "1. Início",
  analyzing: "2. Analisando",
  result: "3. Relatório",
  cracking: "4. Quebrando",
  success: "5. Sucesso",
  files: "6. Arquivos",
};

export function DevStageMenu<T extends string>({
  stages,
  current,
  onSelect,
}: DevStageMenuProps<T>) {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed bottom-4 left-4 z-50 w-48 rounded-xl border border-sintonia-violet/30 bg-sintonia-bg/90 p-2 text-xs backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-1 font-semibold text-sintonia-ink/80 hover:bg-white/5"
      >
        Menu de edição
        {open ? <ChevronDown className="size-3" /> : <ChevronUp className="size-3" />}
      </button>

      {open && (
        <ul className="mt-1 space-y-1">
          {stages.map((stage) => (
            <li key={stage}>
              <button
                type="button"
                onClick={() => onSelect(stage)}
                className={
                  "w-full rounded-lg px-2 py-1 text-left transition-colors " +
                  (stage === current
                    ? "bg-gradient-sintonia font-semibold text-sintonia-bg"
                    : "text-sintonia-ink/70 hover:bg-white/5")
                }
              >
                {LABELS[stage] ?? stage}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
