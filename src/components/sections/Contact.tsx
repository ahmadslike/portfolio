import { useTranslations } from "next-intl";
import { socialLinks } from "@/content/social";
import CopyEmail from "@/components/contact/CopyEmail";
import Reveal from "@/components/ui/Reveal";

const EMAIL = "ahmadslike1@gmail.com";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            {t("label")}
          </p>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {t("heading")}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-lg text-muted-foreground max-w-xl mb-8">
            {t("intro")}
          </p>

          <div className="mb-8">
            <p className="text-sm font-medium text-foreground mb-2">
              {t("emailLabel")}
            </p>
            <CopyEmail
              email={EMAIL}
              labels={{ copy: t("copy"), copied: t("copied") }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
              >
                <link.icon className="size-4" />
                {t(`links.${link.id}` as Parameters<typeof t>[0])}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
