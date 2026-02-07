import { useEffect, useRef } from 'react';

const AboutSection = () => {
  const cards = [
    {
      src: 'https://i.ibb.co/Z6H3WSF0/Image-from-Image-8.png',
      alt: 'Image-from-Image-8',
      href: 'https://ibb.co/tMZS8zv9',
    },
    {
      src: 'https://i.ibb.co/Z1dhK42z/Image-from-Image-9.png',
      alt: 'Image-from-Image-9',
      href: 'https://ibb.co/mFJHtZN5',
    },
    {
      src: 'https://i.ibb.co/8nWbGYpd/Proposta-comercial-Feira-Gastron-mica-de-Cana-dos-Caraj-s-2.jpg',
      alt: 'Proposta comercial Feira Gastronômica de Canaã dos Carajás (2)',
      href: 'https://imgbb.com/',
    },
    {
      src: 'https://i.ibb.co/wZvdBLJS/Image-from-Image-10.png',
      alt: 'Image-from-Image-10',
      href: 'https://ibb.co/twdHQhZq',
    },
  ];

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (nodes.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      nodes.forEach((node) => node.setAttribute('data-revealed', 'true'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).setAttribute('data-revealed', 'true');
          observer.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="relative overflow-hidden bg-gradient-section py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div ref={rootRef} className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* 
            Direção: editorial/luxo suave.
            - Hierarquia tipográfica bem marcada (display + body) e ritmo 8px.
            - Motion é funcional: revela o conteúdo quando entra no viewport.
            - Respeita prefers-reduced-motion para acessibilidade (WCAG 2.1 AA).
          */}
          <header className="text-center">
            <span
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-sm font-medium text-foreground shadow-soft backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Sobre o Evento
            </span>
            <h2
              id="sobre-title"
              data-reveal
              style={{ transitionDelay: '80ms' }}
              className="mt-6 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl"
            >
              Celebrando a <span className="text-gradient">Força Feminina</span>
            </h2>
            <p
              data-reveal
              style={{ transitionDelay: '140ms' }}
              className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Durante o <strong className="text-foreground">Mês da Mulher</strong>, Curionópolis recebe uma programação
              especial de cursos, oficinas e palestras.{' '}
              <strong className="text-foreground">Participe, aprenda e compartilhe.</strong>
            </p>
          </header>

          {/* 
            Galeria responsiva:
            - Mobile: cards mais “cinematográficos” (aspect 4/3) para reduzir aperto visual.
            - Desktop: volta ao square para reforçar grid editorial.
          */}
          <div className="mt-12 hidden sm:grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {cards.map((card, index) => (
              <a
                key={card.src}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                style={{ transitionDelay: `${160 + index * 80}ms` }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-soft backdrop-blur-sm"
              >
                <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-square">
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </a>
            ))}
          </div>

          <footer
            data-reveal
            style={{ transitionDelay: '520ms' }}
            className="mt-14 text-center sm:mt-16"
          >
            <p className="text-muted-foreground">
              Realização: <strong className="text-foreground">Prefeitura Municipal de Curionópolis</strong>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Apoio: Instituto Rosa — &quot;Somar para Transformar&quot;
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
