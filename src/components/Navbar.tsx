import { BookOpen, ClipboardList, Info, Sparkles } from 'lucide-react';
import { NavBar } from '@/components/ui/tubelight-navbar';

const Navbar = () => {
  const navItems = [
    { name: 'Sobre', url: '#sobre', icon: Info },
    { name: 'Cursos', url: '#cursos', icon: BookOpen },
    { name: 'Inscrição', url: '#inscricao', icon: ClipboardList },
    { name: 'Inscreva-se', url: '#inscricao', icon: Sparkles, isCta: true },
  ];

  return (
    <NavBar
      items={navItems}
      leadingImageSrc="/Image from Image (13) (1).png"
      leadingImageAlt="Brasão de Curionópolis"
      leadingLabel="Mês da Mulher"
    />
  );
};

export default Navbar;
