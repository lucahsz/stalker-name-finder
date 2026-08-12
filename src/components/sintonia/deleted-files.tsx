import { useEffect, useState } from "react";
import { ArrowLeft, FileText, FolderOpen, ImageIcon, Lock } from "lucide-react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";


interface ChatMessage {
  from: "them" | "other";
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  title: string;
  contact: string;
  messages: readonly ChatMessage[];
}

const CONVERSATIONS: readonly Conversation[] = [
  {
    id: 1,
    title: "Conversa 1",
    contact: "Contato não salvo · +55 ** 91***-8821",
    messages: [
      { from: "other", text: "oi, sumido... ainda pensando em ontem 🙈", time: "23:41" },
      { from: "them", text: "eu tbm, mas cuidado pra não mandar nada agora", time: "23:44" },
      { from: "other", text: "ela tá aí?", time: "23:44" },
      { from: "them", text: "tá dormindo. amanhã eu te chamo", time: "23:46" },
      { from: "other", text: "apaga isso depois, hein 😅", time: "23:47" },
    ],
  },
  {
    id: 2,
    title: "Conversa 2",
    contact: "Ju 💜 · Whatsapp",
    messages: [
      { from: "other", text: "vc falou q ia terminar com ela semana passada", time: "18:02" },
      { from: "them", text: "tô resolvendo, é complicado", time: "18:09" },
      { from: "other", text: "sempre complicado né", time: "18:10" },
      { from: "them", text: "confia em mim. sexta eu vou aí", time: "18:12" },
      { from: "other", text: "leva aquela camisa que eu gosto", time: "18:13" },
    ],
  },
  {
    id: 3,
    title: "Conversa 3",
    contact: "Grupo · Os Brothers",
    messages: [
      { from: "other", text: "e a festa de sábado? vai levar quem?", time: "20:31" },
      { from: "them", text: "não vou levar ela, vou sozinho 😏", time: "20:33" },
      { from: "other", text: "kkkkk safado", time: "20:33" },
      { from: "them", text: "só não comenta nada no story", time: "20:35" },
      { from: "other", text: "relaxa, boca de túmulo", time: "20:36" },
    ],
  },
  {
    id: 4,
    title: "Conversa 4",
    contact: "Contato apagado · restaurado",
    messages: [
      { from: "other", text: "cheguei no hotel, quarto 1204", time: "21:58" },
      { from: "them", text: "saindo daqui em 20min", time: "22:04" },
      { from: "other", text: "vem logo", time: "22:05" },
      { from: "them", text: "to tentando disfarçar", time: "22:06" },
      { from: "other", text: "🤫", time: "22:06" },
    ],
  },
  {
    id: 5,
    title: "Conversa 5",
    contact: "Arquivo recuperado · 04:12",
    messages: [
      { from: "other", text: "vc apagou as fotos?", time: "01:12" },
      { from: "them", text: "apaguei tudo, relaxa", time: "01:15" },
      { from: "other", text: "melhor. se ela ver a gente tá perdido", time: "01:16" },
      { from: "them", text: "ninguém vai ver. boa noite 😘", time: "01:18" },
      { from: "other", text: "boa noite amor", time: "01:19" },
    ],
  },
] as const;

const PHOTOS = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery2,
  gallery1,
  gallery5,
  gallery3,
  gallery4,
] as const;


type View = "root" | "gallery" | { conversation: number };

export function DeletedFiles() {
  const [view, setView] = useState<View>("root");
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

  useEffect(() => {
  const savedStart = localStorage.getItem("accessTimerStart");

  if (savedStart) {
    const elapsed = Date.now() - Number(savedStart);
    setTimeLeft(Math.max(0, SEVEN_DAYS - elapsed));
  }
}, []);

useEffect(() => {
  if (timeLeft === null || timeLeft <= 0) return;

  const timer = setInterval(() => {
    const savedStart = localStorage.getItem("accessTimerStart");

    if (!savedStart) return;

    const elapsed = Date.now() - Number(savedStart);
    const remaining = Math.max(0, SEVEN_DAYS - elapsed);

    setTimeLeft(remaining);

    if (remaining === 0) {
      clearInterval(timer);
    }
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

  if (view === "gallery") {
    return (
      <div className="animate-sintonia-rise mt-8">
        <BackButton onClick={() => setView("root")} />
        <h2 className="mt-4 text-center font-display text-2xl font-extrabold">
          <span className="text-gradient-sintonia">Galeria Apagada</span>
        </h2>
        <p className="mt-2 text-center text-xs text-sintonia-muted">
          10 mídias recuperadas · visualização protegida
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PHOTOS.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl border border-sintonia-border"
            >
              <img
                src={src}
                alt=""
                aria-hidden
                loading="lazy"
                width={768}
                height={768}
                className="absolute inset-0 size-full scale-125 object-cover"
                style={{ filter: "blur(16px) saturate(1.1)" }}
              />
              <div className="absolute inset-0 bg-sintonia-bg/35" aria-hidden />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                <Lock className="size-5 text-sintonia-ink" aria-hidden />
                <span className="font-display text-[0.6rem] font-bold tracking-widest text-sintonia-ink">
                  CLIQUE PARA VER
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }

  if (typeof view === "object") {
    const conversation = CONVERSATIONS.find((item) => item.id === view.conversation);
    if (!conversation) return null;

    return (
      <div className="animate-sintonia-rise mt-8">
        <BackButton onClick={() => setView("root")} />
        <h2 className="mt-4 text-center font-display text-2xl font-extrabold">
          <span className="text-gradient-sintonia">{conversation.title}</span>
        </h2>
        <p className="mt-2 text-center text-xs text-sintonia-muted">{conversation.contact}</p>

        <div className="mt-6 space-y-2.5">
          {conversation.messages.map((message, index) => (
            <div
              key={index}
              className={
                message.from === "them" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed " +
                  (message.from === "them"
                    ? "bg-gradient-sintonia text-sintonia-bg"
                    : "border border-sintonia-border bg-white/5 text-sintonia-ink")
                }
              >
                {message.text}
                <span
                  className={
                    "ml-2 text-[0.6rem] " +
                    (message.from === "them" ? "text-sintonia-bg/70" : "text-sintonia-muted")
                  }
                >
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-sintonia-rise mt-8">
      <h2 className="text-center font-display text-2xl font-extrabold sm:text-3xl">
        <span className="text-gradient-sintonia">Arquivos recuperados</span>
      </h2>

      <button
        type="button"
        onClick={() => setView("gallery")}
        className="mt-6 flex w-full items-center gap-4 rounded-2xl border border-sintonia-border bg-white/5 p-5 text-left transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sintonia-pink"
      >
        <span className="bg-gradient-sintonia flex size-14 items-center justify-center rounded-2xl shadow-[0_18px_40px_-18px_var(--sintonia-violet)]">
          <FolderOpen className="size-7 text-sintonia-bg" aria-hidden />
        </span>
        <span>
          <span className="block font-display text-lg font-bold">Galeria Apagada</span>
          <span className="flex items-center gap-1.5 text-xs text-sintonia-muted">
            <ImageIcon className="size-3.5" aria-hidden />
            10 fotos recuperadas
          </span>
        </span>
      </button>

      <ul className="mt-4 space-y-2.5">
        {CONVERSATIONS.map((conversation) => (
          <li key={conversation.id}>
            <button
              type="button"
              onClick={() => setView({ conversation: conversation.id })}
              className="flex w-full items-center gap-3 rounded-xl border border-sintonia-border bg-white/5 px-4 py-3.5 text-left transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sintonia-pink"
            >
              <FileText className="size-5 text-sintonia-pink" aria-hidden />
              <span className="font-display text-sm font-bold">{conversation.title}</span>
              <span className="ml-auto text-[0.65rem] text-sintonia-muted">.txt</span>
            </button>
          </li>
        ))}
       </ul>

      <button
  type="button"
  disabled={timeLeft !== 0}
  onClick={() => {
    if (timeLeft === 0) {
      window.open("https://webzap.com", "_blank");
    }
  }}
  className={`mt-6 flex w-full items-center justify-center rounded-2xl px-6 py-4 font-display text-base font-bold transition-all ${
    timeLeft === 0
      ? "bg-gradient-sintonia text-sintonia-bg hover:-translate-y-0.5 cursor-pointer"
      : "cursor-not-allowed bg-white/10 text-sintonia-ink/50"
  }`}
>
  {timeLeft !== null && timeLeft > 0 ? (
    <>
      🔒 Galeria e Clongagem do whatsappWeb Disponível em{" "}
{Math.floor(timeLeft / (1000 * 60 * 60 * 24))} dias,{" "}
{Math.floor((timeLeft / (1000 * 60 * 60)) % 24)} horas,{" "}
{Math.floor((timeLeft / (1000 * 60)) % 60)} minutos e{" "}
{Math.floor((timeLeft / 1000) % 60)} segundos
    </>
  ) : timeLeft === 0 ? (
    "Tentar redirecionar para WhatsApp Web"
  ) : (
    "Tentar redirecionar para WhatsApp Web"
  )}
</button>

    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-sintonia-border px-4 py-2 text-xs font-bold text-sintonia-ink transition-colors hover:border-sintonia-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sintonia-pink"
    >
      <ArrowLeft className="size-4" aria-hidden />
      Voltar
    </button>
  );
}
