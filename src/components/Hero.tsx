import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import heroImage from "@/assets/hero-automation.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Automação Criativa para PMEs</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Pare de gastar{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                fortunas
              </span>{" "}
              com designers e gestores
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Uma plataforma única que cria seus designs, vídeos, narrações e gerencia seus anúncios.
              Tudo automatizado por <strong className="text-primary">menos de R$99/mês</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105 group"
            >
              Começar Agora - Grátis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10">
              <Zap className="w-5 h-5 mr-2" />
              Ver Demonstração
            </Button>
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">+500</div>
              <div className="text-sm text-muted-foreground">Empreendedores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">R$99</div>
              <div className="text-sm text-muted-foreground">Por mês</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">4x</div>
              <div className="text-sm text-muted-foreground">Automações</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full"></div>
          <img 
            src={heroImage} 
            alt="Central de Automação - Dashboard"
            className="relative z-10 rounded-2xl shadow-2xl border border-border/50"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;