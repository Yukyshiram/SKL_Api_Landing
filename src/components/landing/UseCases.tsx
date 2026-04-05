import SectionHeading from "../ui/SectionHeading";
import { USE_CASES } from "../../lib/content";

export default function UseCases() {
  return (
    <section id="use-cases" className="bg-background py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Use Cases"
          title="Clear integration outcomes for teams building production systems"
          description="Every module maps to a concrete workflow so product, platform, and operations teams can align fast."
          align="left"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase) => (
            <article key={useCase.title} className="surface-card surface-card-hover p-5">
              <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                {useCase.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                {useCase.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
