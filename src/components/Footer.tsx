import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Instagram, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { isSupabaseConfigured, requireSupabase } from '@/lib/supabase';

const ADMIN_EMAIL = 'admgestalt@gmail.com';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminSubmitting, setAdminSubmitting] = useState(false);

  const canSubmitAdmin = useMemo(() => adminEmail.trim().length > 0 && adminPassword.length > 0, [adminEmail, adminPassword]);

  const handleAdminLogin = async () => {
    if (!isSupabaseConfigured) {
      toast({
        title: 'Admin indisponível',
        description: 'Supabase não configurado (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY).',
        variant: 'destructive',
      });
      return;
    }

    if (!canSubmitAdmin || adminSubmitting) return;

    setAdminSubmitting(true);
    try {
      const supabase = requireSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail.trim(),
        password: adminPassword,
      });

      if (error) throw error;

      const email = data.user?.email ?? '';
      if (email !== ADMIN_EMAIL) {
        await supabase.auth.signOut();
        toast({ title: 'Acesso negado', description: 'Credenciais inválidas.', variant: 'destructive' });
        return;
      }

      setAdminOpen(false);
      setAdminPassword('');
      navigate('/admin');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro inesperado';
      toast({ title: 'Falha no login', description: message, variant: 'destructive' });
    } finally {
      setAdminSubmitting(false);
    }
  };

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
                  href="tel:+559491431180" 
                  className="flex items-center justify-center md:justify-start gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">(94) 9143-1180</span>
                </a>
                <a 
                  href="https://www.instagram.com/institutoramosr/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm">@institutoramosr</span>
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
            <div className="mt-4 flex items-center justify-center gap-2">
              <p className="text-center text-background/40 text-xs">
                Os dados coletados no formulário de inscrição são utilizados exclusivamente para organização dos cursos e
                comunicação com as participantes.
              </p>
              <button
                type="button"
                aria-label="Admin"
                className="h-3 w-3 rounded-full bg-background/30 ring-1 ring-background/20 opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40"
                onClick={() => setAdminOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={adminOpen} onOpenChange={setAdminOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Acesso administrativo</DialogTitle>
            <DialogDescription>Digite suas credenciais para acessar a área admin.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="admin-email">
                E-mail
              </label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                placeholder="admgestalt@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="admin-password">
                Senha
              </label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                placeholder="Sua senha"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={handleAdminLogin}
              disabled={!canSubmitAdmin || adminSubmitting}
            >
              {adminSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
