import SectionHeading from "../ui/SectionHeading";
import { FAQ_ITEMS } from "../../lib/content";

export default function Faq() {
  return (
    <section id="faq" className="bg-background py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Direct answers for teams evaluating Next SKL Api"
          description="Concise responses that clarify scope, access, and integration readiness without marketing fluff."
          align="left"
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {FAQ_ITEMS.map((faq) => (
            <article key={faq.question} className="surface-card surface-card-hover p-5">
              <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
