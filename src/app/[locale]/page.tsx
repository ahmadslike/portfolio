import { useTranslations } from "next-intl";

// TEMP: design system visual check — remove when Hero is built in Phase 3
export default function Home() {
  const t = useTranslations("designSystemTest");
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-foreground">{t("heading")}</h1>
      <p className="text-muted-foreground">{t("muted")}</p>
      <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm">
        {t("button")}
      </button>
      <div className="h-2 w-32 rounded bg-[var(--success)]" aria-hidden />
    </main>
  );
}
