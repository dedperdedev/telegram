import { Check, Crown, Sparkles, Film, Shield, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  { icon: Film, text: "Без рекламы" },
  { icon: Sparkles, text: "HD и 4K качество" },
  { icon: Shield, text: "Ранний доступ к новинкам" },
  { icon: Wifi, text: "Скачивание для офлайн" },
  { icon: Crown, text: "Расширенные ИИ-рекомендации" },
];

const plans = [
  { name: "Месяц", price: "299 ₽", period: "/мес", popular: false },
  { name: "Год", price: "199 ₽", period: "/мес", total: "2 388 ₽/год", popular: true },
];

export default function PremiumScreen() {
  const navigate = useNavigate();

  return (
    <div className="pb-20 min-h-screen">
      <div className="px-4 pt-4">
        <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground mb-4">← Назад</button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
            <Crown className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Премиум</h1>
          <p className="text-sm text-muted-foreground">Откройте полный доступ к контенту</p>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-8">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">{text}</span>
              <Check className="w-4 h-4 text-primary ml-auto" />
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="flex gap-3 mb-6">
          {plans.map((plan) => (
            <button
              key={plan.name}
              className={`flex-1 p-4 rounded-xl border text-center relative ${
                plan.popular
                  ? "border-primary bg-primary/5"
                  : "border-border bg-secondary/30"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  Выгодно
                </span>
              )}
              <p className="text-xs text-muted-foreground mb-1">{plan.name}</p>
              <p className="text-xl font-bold text-foreground">{plan.price}</p>
              <p className="text-[10px] text-muted-foreground">{plan.period}</p>
              {plan.total && <p className="text-[10px] text-muted-foreground mt-1">{plan.total}</p>}
            </button>
          ))}
        </div>

        <button className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-semibold glow-green mb-3">
          Оформить подписку
        </button>
        <p className="text-[10px] text-center text-muted-foreground">
          Отмена в любой момент. Оплата через Telegram.
        </p>
      </div>
    </div>
  );
}
