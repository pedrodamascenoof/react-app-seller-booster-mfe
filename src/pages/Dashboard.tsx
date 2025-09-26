import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  Bot,
  Mail,
  MessageSquare,
  Calendar,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Zap,
  Target,
  TrendingUp,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import ProfileEditForm from '@/components/ProfileEditForm';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  // Derive a friendly display name: prefer first word of user_metadata.name, else local-part of email
  const displayName = (() => {
    const raw = (user as any)?.user_metadata?.name ?? user?.email ?? '';
    if (!raw) return '';
    const str = String(raw).trim();
    if (!str) return '';
    const first = str.split(/\s+/).find(Boolean);
    if (first) return first;
    // fallback to email local part
    if (user?.email) return user.email.split('@')[0];
    return str;
  })();

  const automationTools = [
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Automatize campanhas de email e nutrição de leads',
      color: 'from-blue-500 to-cyan-500',
      comingSoon: false,
    },
    {
      icon: MessageSquare,
      title: 'Chatbots',
      description: 'Configure bots inteligentes para WhatsApp e redes sociais',
      color: 'from-green-500 to-emerald-500',
      comingSoon: true,
    },
    {
      icon: Calendar,
      title: 'Agendamento',
      description: 'Automatize agendamentos e follow-ups',
      color: 'from-purple-500 to-violet-500',
      comingSoon: true,
    },
    {
      icon: Target,
      title: 'Segmentação',
      description: 'Crie audiências e segmente automaticamente',
      color: 'from-orange-500 to-red-500',
      comingSoon: true,
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Relatórios automatizados de performance',
      color: 'from-pink-500 to-rose-500',
      comingSoon: true,
    },
    {
      icon: Users,
      title: 'CRM Automático',
      description: 'Gestão automatizada de clientes e prospects',
      color: 'from-indigo-500 to-blue-500',
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <h1 className="text-xl font-bold text-foreground">Central Automação</h1>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>Início</Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{(displayName || 'U').slice(0,1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">{displayName ? (displayName.charAt(0).toUpperCase() + displayName.slice(1)) : 'Usuário'}</span>
              </div>
              <ThemeToggle />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogDescription>Atualize seu nome e telefone.</DialogDescription>
                  </DialogHeader>
                  <ProfileEditForm user={user} onClose={() => {}} />
                  <DialogFooter />
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-primary rounded-xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Painel de Automação</h2>
            </div>
            <p className="text-white/90 text-lg">
              Transforme seu marketing com automação inteligente. Escolha uma ferramenta abaixo para começar.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Campanhas Ativas</p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Leads Gerados</p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                  <p className="text-2xl font-bold text-foreground">0%</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Automation Tools */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Ferramentas de Automação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationTools.map((tool, index) => (
              <Card 
                key={index} 
                className="border-border/50 hover:shadow-elegant transition-all duration-300 cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${tool.color} text-white`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    {tool.comingSoon && (
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                        Em Breve
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full ${tool.comingSoon ? 'opacity-50' : 'bg-gradient-primary hover:opacity-90 shadow-glow'}`}
                    disabled={tool.comingSoon}
                  >
                    {tool.comingSoon ? 'Em Desenvolvimento' : 'Configurar'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-foreground mb-6">Atividade Recente</h3>
          <Card className="border-border/50">
            <CardContent className="p-8 text-center">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Nenhuma atividade ainda. Configure sua primeira automação para começar!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
