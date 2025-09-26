import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">CA</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Central Automação
              </span>
            </div>
            
            <p className="text-muted-foreground max-w-md">
              Democratizando automação criativa para pequenos empreendedores. 
              Crescer seu negócio nunca foi tão simples e acessível.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-primary hover:opacity-90">
                Começar Agora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline">
                Falar com Especialista
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Funcionalidades</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>Design Automático</div>
              <div>Vídeos Curtos</div>
              <div>Voz Artificial</div>
              <div>Meta Ads</div>
              <div>Analytics</div>
              <div>Templates Premium</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@centralautomacao.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Central Automação. Todos os direitos reservados.
            </div>
            
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Suporte</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;