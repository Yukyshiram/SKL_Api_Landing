export default function Footer() {
  const links = [
    { label: 'Docs', href: '#integration-flow' },
    { label: 'Reference', href: '#developer-experience' },
    { label: 'Changelog', href: '#integration-flow' },
    { label: 'Status', href: '#trust-core' },
    { label: 'GitHub', href: '#developer-experience' },
    { label: 'Contact', href: '#final-cta' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#04060b] py-10 sm:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-[0.16em] text-slate-100">SKL API</p>
          <p className="text-xs text-slate-400">Infrastructure-grade API for modern developer teams.</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-slate-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-slate-500">© 2026 SKL API</p>
      </div>
    </footer>
  );
}
