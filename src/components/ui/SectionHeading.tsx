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
          'inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100/90',
          isCentered ? 'mx-auto' : '',
        ].join(' ')}
      >
        {eyebrow}
      </p>

      <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-100 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p
        className={[
          'text-pretty text-base leading-8 text-slate-300/90 sm:text-lg',
          isCentered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
        ].join(' ')}
      >
        {description}
      </p>
    </header>
  );
}
