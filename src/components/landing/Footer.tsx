export default function Footer() {
  const links = [
    { label: 'Docs', href: '#flow' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Developer Experience', href: '#developers' },
    { label: 'Security', href: '#trust-core' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Owner', href: '#owner' },
    { label: 'Get Access', href: '#final-cta' },
  ];

  return (
    <footer className="bg-background py-10 sm:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-[0.16em] text-foreground">Next SKL Api</p>
          <p className="text-xs text-foreground-muted">Infrastructure-grade API platform by SKL Connect.</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground-secondary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-foreground-muted">© 2026 Next SKL Api · SKL Connect</p>
      </div>
    </footer>
  );
}
