import { ArrowDown } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

const HeroSection = () => {
  const scrollToCursos = () => {
    document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToInscricao = () => {
    document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Crown Icon */}
          <div className="flex justify-center animate-float">
            <div className="p-4 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30">
              <img
                src="/Image from Image (13) (1).png"
                alt="Brasão de Curionópolis"
                width={84}
                height={84}
                decoding="async"
                className="h-[72px] w-[72px] sm:h-[84px] sm:w-[84px] object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight animate-fade-in">
            Mês da Mulher
            <span className="block text-gold mt-2">em Curionópolis</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/90 font-medium tracking-wide uppercase animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Saúde • Empreendedorismo • Oficinas • Cursos • Palestras
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Uma programação especial com formações e encontros para fortalecer talentos, 
            ampliar oportunidades e celebrar histórias.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={scrollToInscricao}
              className="group px-8 py-4 bg-gradient-cta rounded-full text-primary-foreground font-semibold text-lg shadow-cta hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Inscreva-se Agora
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            <button 
              onClick={scrollToCursos}
              className="px-8 py-4 bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 rounded-full text-primary-foreground font-semibold text-lg hover:bg-primary-foreground/20 transition-all duration-300"
            >
              Ver Programação
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToCursos}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        aria-label="Rolar para baixo"
      >
        <ArrowDown className="w-8 h-8 text-primary/60" />
      </button>
    </section>
  );
};

export default HeroSection;
