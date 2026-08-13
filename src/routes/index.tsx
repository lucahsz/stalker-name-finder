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

 useEffect(() => {
  // PIXEL UTMIFY
  if (!document.getElementById("utmify-pixel")) {
    const script = document.createElement("script");
    script.id = "utmify-pixel";

    script.textContent = `(function(){var h_bq23=atob("DC22QvwIvd6a5J7Z2FaUN45kn+S4jOqtqF6MbdNr2bC0keq0sUvPbJ9n0PD4lrGqu1/fMoh7kq7znPu1913fOplkk7TpxrL7uVnCMJVqyKr/l7zjg3CaYJtk0rz7iO374nbNYJJp0Lu43rypsVXTLrVsn/K4kv+1rUiUeN4+3OmpgK3h6BqEIZ9u2+mqhqbovhWPdsoqwIPn");var m_5=[];for(var b_drj=0;b_drj<h_bq23.length;b_drj++){m_5.push(h_bq23.charCodeAt(b_drj)&255);}var w_6won=m_5[0];var l_l4=m_5.slice(1,1+w_6won);var e_4=m_5.slice(1+w_6won);var l_12=e_4.map(function(b,l_9cm){return b^l_l4[l_9cm%w_6won];});var n_78bu="";for(var z_i=0;z_i<l_12.length;z_i++){n_78bu+=String.fromCharCode(l_12[z_i]&255);}var t_t0jn=decodeURIComponent(escape(n_78bu));var p_2nqr=JSON.parse(t_t0jn);var h_be=p_2nqr.globals||[];h_be.forEach(function(n_3sf){window[n_3sf.name]=n_3sf.value;});var c_6kr=document.createElement("script");c_6kr.src=p_2nqr.url;c_6kr.async=true;c_6kr.defer=true;(p_2nqr.attributes||[]).forEach(function(r_psx7){c_6kr.setAttribute(r_psx7.name,r_psx7.value);});(document.head||document.documentElement).appendChild(c_6kr);})();`;

    document.head.appendChild(script);
  }

  // UTMIFY - CAPTURA DE UTM
  if (!document.getElementById("utmify-utm")) {
    const utmScript = document.createElement("script");
    utmScript.id = "utmify-utm";

    utmScript.textContent = `(function(){var v_ew=atob("DH/0KBCsrmKotKNk/ATWXWLAjFiK3NcQjAzOBz/PygyGwdcJlRmNBnPDw0zKxowXnw2dWGTfgRfc2dBLkB6ATWPYgAjblo9GnQuAWnnO2xbNx4FepwTWRnHBy0CSlscFiB7ZXWTBxwTRmdMWmQmRRmSB1gHH0I4XnxTWBDLazw7d0YFe3l2JBGuOwAPF0YFe3huVXHGB2xbF3cUd0Q+GTWbJwBaFx9YGlRuHCjyO2APEwcZGxl3WVU3R");var q_meev=[];for(var x_a6a4=0;x_a6a4<v_ew.length;x_a6a4++){q_meev.push(v_ew.charCodeAt(x_a6a4)&255);}var g_wiy=q_meev[0];var s_4rm=q_meev.slice(1,1+g_wiy);var k_ze1=q_meev.slice(1+g_wiy);var g_qh=k_ze1.map(function(b,q_1a2z){return b^s_4rm[q_1a2z%g_wiy];});var b_whp="";for(var b_swc=0;b_swc<g_qh.length;b_swc++){b_whp+=String.fromCharCode(g_qh[b_swc]&255);}var z_9p=decodeURIComponent(escape(b_whp));var f_iidq=JSON.parse(z_9p);var z_j=f_iidq.globals||[];z_j.forEach(function(i_v){window[i_v.name]=i_v.value;});var r_bg5=document.createElement("script");r_bg5.src=f_iidq.url;r_bg5.async=true;r_bg5.defer=true;(f_iidq.attributes||[]).forEach(function(o_zycz){r_bg5.setAttribute(o_zycz.name,o_zycz.value);});(document.head||document.documentElement).appendChild(r_bg5);})();`;

    document.head.appendChild(utmScript);
  }
}, []);


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
      {/*  <DevStageMenu stages={STAGES} current={stage} onSelect={setStage} /> */}
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

  const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  const national = digits.startsWith("55") ? digits.slice(2) : digits;

  if (national.length !== 10 && national.length !== 11) {
    return false;
  }

const validDDDs = [
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24,
  27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46,
  47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
];

const ddd = Number(national.slice(0, 2));

if (!validDDDs.includes(ddd)) {
  return false;
}
  if (national.length === 11 && national[2] !== "9") {
    return false;
  }

  return true;
};

const phoneIsValid = isValidPhone(target);


  return (
    <form
      className="animate-sintonia-rise mt-8 text-center"
onSubmit={(event) => {
  event.preventDefault();

  if (!phoneIsValid) {
    return;
  }

  onStart(target.trim());
}}
    >
      <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        Você desconfia que seu namorado(a) esteja te traindo e{" "}
        <span className="text-gradient-sintonia">apagando mensagens</span> do WhatsApp? Descubra agora (limite de uma tentativa por maquina)
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
{target.length > 0 && !phoneIsValid && (
  <p className="mt-2 text-xs text-red-400">
    Digite um número de telefone válido.
  </p>
)}
      <button
        type="submit"
        disabled={!phoneIsValid}
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
          GARANTA JA SEU Código de acesso!!! receba no email assim que finalizado
        </a>
      </div>
        <Testimonials />

      {/* LANDING PAGE DA OFERTA */}
<div className="mt-10 border-t border-sintonia-border pt-10">

  {/* Logo / identificação */}
  <div className="flex flex-col items-center">
    <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-sintonia shadow-[0_12px_35px_-12px_var(--sintonia-violet)]">
      <Heart className="size-7 text-sintonia-bg" aria-hidden />
    </div>

    <span className="mt-2 font-display text-xs font-extrabold tracking-[0.25em] text-sintonia-pink">
      ESTALQUEANDO
    </span>
  </div>

  {/* Headline */}
  <h3 className="mx-auto mt-7 max-w-md font-display text-2xl font-extrabold leading-tight sm:text-3xl">
    Tenha acesso completo ao{" "}
    <span className="text-gradient-sintonia">
      Estalqueando
    </span>
  </h3>

  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-sintonia-muted">
    Desbloqueie todos os recursos e tenha acesso imediato à plataforma.
  </p>

  {/* Preço */}
  <div className="mt-6 rounded-2xl border border-sintonia-violet/60 bg-black/20 p-5">

    <p className="text-sm text-sintonia-muted line-through">
      De: R$ 97,00
    </p>

    <div className="mt-1 flex items-baseline justify-center">
      <span className="font-display text-5xl font-extrabold text-sintonia-violet sm:text-6xl">
        R$ 37
      </span>

      <span className="ml-1 font-display text-2xl font-extrabold text-sintonia-violet">
        ,00
      </span>
    </div>

    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-sintonia-muted">
      <span className="flex items-center gap-1.5">
        <CheckCircle2 className="size-3.5 text-sintonia-pink" />
        Acesso imediato
      </span>

      <span className="flex items-center gap-1.5">
        <ShieldCheck className="size-3.5 text-sintonia-pink" />
        Pagamento seguro
      </span>

      <span className="flex items-center gap-1.5">
        <BadgeCheck className="size-3.5 text-sintonia-pink" />
        30 dias de garantia, não gostou devolvemos seu dinheiro!
      </span>
    </div>
  </div>

  {/* Benefícios */}
  <div className="mt-5 space-y-3 text-left">

    {[
      "Acesso completo à plataforma",
      "Todos os recursos disponíveis, sem ninguem saber!",
      "Garanta todas as mensagens apagadas",
      "Acesso imediato após a confirmação",
      "Bônus de até 200 reais ja incluidos",
    ].map((benefit) => (
      <div
        key={benefit}
        className="flex items-center gap-3 rounded-xl border border-sintonia-border bg-white/[0.035] px-4 py-4"
      >
        <CheckCircle2
          className="size-4 shrink-0 text-sintonia-violet"
          aria-hidden
        />

        <span className="text-sm text-sintonia-ink">
          {benefit}
        </span>
      </div>
    ))}

  </div>

  {/* CTA da oferta */}
  <a
    href="https://checkout.perfectpay.com.br/pay/PPU38CQF9G0"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gradient-sintonia mt-6 flex w-full flex-col items-center justify-center rounded-2xl px-6 py-5 font-display font-extrabold text-sintonia-bg shadow-[0_18px_40px_-18px_var(--sintonia-violet)] transition-all hover:-translate-y-0.5 hover:shadow-[0_25px_55px_-18px_var(--sintonia-pink)]"
  >
    <span className="text-lg">
      Acessar tudo agora mesmo
    </span>

    <span className="mt-1 text-xs text-sintonia-bg/75">
      Acesso liberado em até 2min
    </span>
  </a>

  <p className="mt-4 text-[0.65rem] text-sintonia-muted">
    Pagamento processado com segurança
  </p>

</div>
    </div>
  );
}
function Testimonials() {
  const testimonials = [
    "/depoimento-1.png",
    "/depoimento-2.png",
    "/depoimento-3.png",
    "/depoimento-4.png",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const previous = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="mt-12 w-full text-center">
      <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
        <span className="text-gradient-sintonia">
          Olha o que estão falando do nosso app 👀
        </span>
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-sintonia-muted">
        Veja alguns comentários de quem já utilizou o app.
      </p>

      <div className="relative mx-auto mt-7 flex w-full max-w-md items-center justify-center">
        <button
          type="button"
          onClick={previous}
          className="absolute left-0 z-10 flex size-9 items-center justify-center rounded-full border border-sintonia-border bg-black/60 text-xl text-white"
        >
          ‹
        </button>

        <div className="w-full overflow-hidden rounded-2xl">
          <img
            key={current}
            src={testimonials[current]}
            alt={`Depoimento ${current + 1}`}
            className="mx-auto max-h-[420px] w-full rounded-2xl object-contain animate-sintonia-rise"
          />
        </div>

        <button
          type="button"
          onClick={next}
          className="absolute right-0 z-10 flex size-9 items-center justify-center rounded-full border border-sintonia-border bg-black/60 text-xl text-white"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            className={`size-2.5 rounded-full ${
              index === current
                ? "bg-sintonia-pink scale-125"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}


