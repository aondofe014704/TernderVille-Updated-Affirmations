import { Sparkles, Heart, BookOpen, Star } from "lucide-react";
import Container from "@/components/layout/Container";

interface Week {
  week: number | string;
  affirmation: string;
  isMidterm?: boolean;
}

const affirmations: Week[] = [
  { week: 1, affirmation: "I have great abilities" },
  { week: 2, affirmation: "I choose what is right" },
  { week: 3, affirmation: "My thoughts are pure and bright" },
  { week: 4, affirmation: "I am merciful and kind" },
  { week: 5, affirmation: "I bring peace wherever I go" },
  { week: 6, affirmation: "I am blessed by God" },
  { week: 7, affirmation: "Mid-Term Break", isMidterm: true },
  { week: 8, affirmation: "I never give up" },
  { week: 9, affirmation: "I am outstanding" },
  { week: 10, affirmation: "I am bold and brave" },
  { week: 11, affirmation: "I have the spirit of excellence" },
];

const highlights = [
  {
    icon: Sparkles,
    label: "11 Weeks",
    sub: "of identity-building",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Heart,
    label: "Daily Practice",
    sub: "speak it every morning",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: Star,
    label: "Core Culture",
    sub: "rooted in our values",
    color: "bg-amber-100 text-amber-600",
  },
];

export default function Affirmations() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50/40">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* ── Hero ──────────────────────────────────────── */}
        <section className="px-4 pt-14 pb-10 sm:pt-20 sm:pb-14">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-100/80 text-orange-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                3rd Term 2025 – 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
                Affirmations
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-4">
                At Tenderville, we have made affirmations a core part of our daily culture.
              </p>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
                Affirmations plant seeds of identity that grow for a lifetime — and a child who
                knows who they are cannot easily be told otherwise.
              </p>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 tv-shadow-soft tv-card-hover"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${h.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-none">{h.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{h.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── Parent call-to-action banner ───────────────── */}
        <section className="px-4 pb-10">
          <Container>
            <div className="tv-glass rounded-3xl border border-orange-200/60 px-6 py-7 sm:px-10 sm:py-8 max-w-3xl mx-auto text-center tv-shadow-soft">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-semibold text-orange-700">Partner with us —</span> speak
                these affirmations over your child{" "}
                <span className="font-semibold text-gray-900">every single day.</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">Thank you.</p>
            </div>
          </Container>
        </section>

        {/* ── Affirmations table ─────────────────────────── */}
        <section className="px-4 pb-16 sm:pb-24">
          <Container>
            <div className="max-w-2xl mx-auto">
              {/* Table heading */}
              <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-0 mb-3 px-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Week
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Affirmation
                </span>
              </div>

              {/* Rows */}
              <div className="space-y-2.5">
                {affirmations.map((item, index) => {
                  if (item.isMidterm) {
                    return (
                      <div
                        key="midterm"
                        className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-0 items-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl px-5 py-4 shadow-md"
                      >
                        <span className="text-sm font-bold text-white/80">Wk {item.week}</span>
                        <span className="text-sm font-semibold text-white tracking-wide uppercase">
                          🎉 Mid-Term Break
                        </span>
                      </div>
                    );
                  }

                  const weekNum = item.week as number;
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={weekNum}
                      className={`grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-0 items-center rounded-2xl px-5 py-4 tv-card-hover tv-rise ${
                        isEven
                          ? "bg-white tv-shadow-soft"
                          : "bg-orange-50/80 border border-orange-100"
                      }`}
                      style={{ animationDelay: `${index * 0.04}s` }}
                    >
                      {/* Week badge */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-sm">
                          <span className="text-xs font-bold text-white leading-none">
                            {weekNum}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium hidden sm:block">
                          Wk
                        </span>
                      </div>

                      {/* Affirmation text */}
                      <p className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
                        &ldquo;{item.affirmation}&rdquo;
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom encouragement */}
              <div className="mt-10 text-center">
                <div className="inline-block bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl px-8 py-6 shadow-xl max-w-lg">
                  <Sparkles className="w-7 h-7 text-white/80 mx-auto mb-3" />
                  <p className="text-white font-semibold text-base sm:text-lg leading-relaxed">
                    A child who knows who they are cannot easily be told otherwise.
                  </p>
                  <p className="text-orange-100 text-sm mt-2">— Tenderville School</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
