import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Video, Mic, Target, Sparkles, Clock, DollarSign, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Palette,
      title: "Design Automatizado",
      description: "Posts, flyers e stories criados automaticamente. Só digite o que precisa e pronto!",
      badge: "IA + Templates",
      color: "text-primary"
    },
    {
      icon: Video,
      title: "Vídeos Curtos",
      description: "Reels e stories em vídeo gerados automaticamente com seus templates personalizados.",
      badge: "Auto-Geração",
      color: "text-secondary"
    },
    {
      icon: Mic,
      title: "Voz Artificial",
      description: "Narração em português natural para seus vídeos usando a melhor IA de voz do mercado.",
      badge: "ElevenLabs",
      color: "text-success"
    },
    {
      icon: Target,
      title: "Anúncios Meta Ads",
      description: "Campanhas automáticas no Facebook e Instagram com otimização e testes A/B.",
      badge: "Meta Oficial",
      color: "text-warning"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Economia de Tempo",
      value: "90%",
      description: "Menos tempo gasto com criação de conteúdo"
    },
    {
      icon: DollarSign,
      title: "Economia de Dinheiro",
      value: "R$2.000+",
      description: "Por mês vs contratar freelancers"
    },
    {
      icon: Zap,
      title: "Velocidade",
      value: "5 min",
      description: "Para criar campanha completa"
    },
    {
      icon: Sparkles,
      title: "Qualidade",
      value: "Pro",
      description: "Resultado profissional sem experiência"
    }
  ];

  return (
    <section id="funcionalidades" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/20 text-primary">
            4 Automações Essenciais
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold">
            Tudo que você precisa,{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              automatizado
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pare de contratar 4 profissionais diferentes. Nossa plataforma faz o trabalho de designer,
            editor de vídeo, locutor e gestor de tráfego.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="text-center p-6 bg-background/30 border-border/30 backdrop-blur-sm">
                <Icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold text-primary mb-2">{benefit.value}</div>
                <div className="font-medium mb-1">{benefit.title}</div>
                <div className="text-sm text-muted-foreground">{benefit.description}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;