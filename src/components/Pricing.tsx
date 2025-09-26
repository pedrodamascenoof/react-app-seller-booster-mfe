import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles } from "lucide-react";

const Pricing = () => {
  const features = [
    "Designs automáticos ilimitados",
    "Vídeos curtos automáticos",
    "Narração com IA (30min/mês)",
    "Campanhas Meta Ads automáticas",
    "Templates premium",
    "Suporte prioritário",
    "Analytics completo",
    "API de integração"
  ];

  return (
    <section id="precos" className="py-20 px-6">
      <div className="container mx-auto text-center">
        <div className="space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/20 text-primary">
            Preço Único, Valor Infinito
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold">
            Uma{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              fração
            </span>{" "}
            do que você gasta hoje
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare: contratar designer (R$800) + editor (R$600) + locutor (R$400) + gestor de tráfego (R$1.200) = R$3.000/mês
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <Card className="bg-gradient-card border-2 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
            
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="flex items-center justify-center space-x-2">
                <Crown className="w-6 h-6 text-warning" />
                <Badge className="bg-gradient-primary">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Mais Popular
                </Badge>
              </div>
              
              <CardTitle className="text-3xl">Plano Completo</CardTitle>
              <CardDescription className="text-lg">
                Todas as automações em uma plataforma
              </CardDescription>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-5xl font-bold">R$99</span>
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">por mês</div>
                    <div className="text-xs text-muted-foreground line-through">R$3.000</div>
                  </div>
                </div>
                <div className="text-success font-medium">Economia de 97%</div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Começar Teste Grátis - 7 Dias
                </Button>
                
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">
                    ✓ Sem cartão de crédito • ✓ Cancele quando quiser
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Garantia de 30 dias - 100% do seu dinheiro de volta
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Compare os custos:</h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-destructive mb-3">Contratando separado:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Designer gráfico</span>
                  <span>R$800/mês</span>
                </div>
                <div className="flex justify-between">
                  <span>Editor de vídeo</span>
                  <span>R$600/mês</span>
                </div>
                <div className="flex justify-between">
                  <span>Locutor</span>
                  <span>R$400/mês</span>
                </div>
                <div className="flex justify-between">
                  <span>Gestor de tráfego</span>
                  <span>R$1.200/mês</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-destructive">
                  <span>Total</span>
                  <span>R$3.000/mês</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-success mb-3">Com Central Automação:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Design automático</span>
                  <span>Incluído</span>
                </div>
                <div className="flex justify-between">
                  <span>Vídeos automáticos</span>
                  <span>Incluído</span>
                </div>
                <div className="flex justify-between">
                  <span>Voz artificial</span>
                  <span>Incluído</span>
                </div>
                <div className="flex justify-between">
                  <span>Automação de ads</span>
                  <span>Incluído</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-success">
                  <span>Total</span>
                  <span>R$99/mês</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;