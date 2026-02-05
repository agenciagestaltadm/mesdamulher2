import { Heart, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl font-bold mb-4">
                Mês da Mulher
              </h3>
              <p className="text-background/70 text-sm leading-relaxed">
                Curionópolis celebra a força, a resiliência e as conquistas das mulheres 
                com uma programação especial de cursos e eventos.
              </p>
            </div>

            {/* Contact */}
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-4">Contato</h4>
              <div className="space-y-3">
                <a 
                  href="tel:+559400000000" 
                  className="flex items-center justify-center md:justify-start gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">(94) 0000-0000</span>
                </a>
                <a 
                  href="mailto:contato@curionopolis.pa.gov.br" 
                  className="flex items-center justify-center md:justify-start gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contato@curionopolis.pa.gov.br</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm">@curionopolisoficial</span>
                </a>
              </div>
            </div>

            {/* Instituto Rosa */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-lg mb-4">Apoio</h4>
              <p className="text-background/70 text-sm mb-2">Instituto Rosa</p>
              <p className="text-accent text-sm italic">"Somar para Transformar"</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-background/60 text-sm text-center md:text-left">
                © {currentYear} Prefeitura Municipal de Curionópolis. Todos os direitos reservados.
              </p>

              {/* Made with love */}
              <p className="flex items-center gap-1 text-background/60 text-sm">
                Feito com <Heart className="w-4 h-4 text-accent fill-accent" /> para as mulheres de Curionópolis
              </p>
            </div>

            {/* Privacy Notice */}
            <p className="text-center text-background/40 text-xs mt-4">
              Os dados coletados no formulário de inscrição são utilizados exclusivamente 
              para organização dos cursos e comunicação com as participantes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
