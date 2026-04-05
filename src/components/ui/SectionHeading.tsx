type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <header
      className={[
        'mx-auto w-full max-w-3xl space-y-5',
        isCentered ? 'text-center' : 'text-left',
      ].join(' ')}
    >
      <p
        className={[
          'pill pill-primary px-3 py-1 text-[11px] tracking-[0.2em]',
          isCentered ? 'mx-auto' : '',
        ].join(' ')}
      >
        {eyebrow}
      </p>

      <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p
        className={[
          'text-pretty text-base leading-8 text-foreground-secondary sm:text-lg',
          isCentered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
        ].join(' ')}
      >
        {description}
      </p>
    </header>
  );
}
