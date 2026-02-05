import card01 from '@/assets/card-01.jpg';
import card02 from '@/assets/card-02.jpg';
import card03 from '@/assets/card-03.jpg';
import card04 from '@/assets/card-04.jpg';

const AboutSection = () => {
  const cards = [
    { src: card01, alt: 'Card Mês da Mulher com coroa dourada e rosas' },
    { src: card02, alt: 'Card anúncio Mês da Mulher com flores' },
    { src: card03, alt: 'Card celebração feminina com silhueta e flores' },
    { src: card04, alt: 'Card programação com mulheres diversas' },
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Sobre o Evento
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Celebrando a <span className="text-gradient">Força Feminina</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Durante o <strong>Mês da Mulher</strong>, Curionópolis recebe uma programação especial 
              de cursos, oficinas e palestras com temas de saúde, desenvolvimento pessoal e 
              empreendedorismo. <strong>Participe, aprenda e compartilhe.</strong>
            </p>
          </div>

          {/* Cards Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {cards.map((card, index) => (
              <div 
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-cta transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={card.src} 
                  alt={card.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Organizer Info */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Realização: <strong className="text-foreground">Prefeitura Municipal de Curionópolis</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Apoio: Instituto Rosa — "Somar para Transformar"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
