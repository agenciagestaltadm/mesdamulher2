import { useState, useEffect } from 'react';
import { Crown, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#cursos', label: 'Cursos' },
  { href: '#inscricao', label: 'Inscrição' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-soft py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group"
          >
            <Crown className={`w-6 h-6 transition-colors ${isScrolled ? 'text-primary' : 'text-gold'}`} />
            <span className={`font-display font-bold text-lg transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
              Mês da Mulher
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-medium transition-colors hover:text-accent ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#inscricao')}
              className="px-5 py-2 bg-gradient-hero text-primary-foreground font-semibold rounded-full hover:scale-105 transition-transform shadow-soft"
            >
              Inscreva-se
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border/20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-medium text-left transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#inscricao')}
                className="w-full px-5 py-3 bg-gradient-hero text-primary-foreground font-semibold rounded-full"
              >
                Inscreva-se
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
