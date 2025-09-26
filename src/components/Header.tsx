import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">CA</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Central Automação
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#funcionalidades" className="text-muted-foreground hover:text-foreground transition-colors">
            Funcionalidades
          </a>
          <a href="#precos" className="text-muted-foreground hover:text-foreground transition-colors">
            Preços
          </a>
          <a href="#contato" className="text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <AuthButtons />
        </div>
      </nav>
    </header>
  );
};

export default Header;

function AuthButtons() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <>
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground">
          Dashboard
        </Button>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity" onClick={async () => await signOut()}>
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate('/login')}>
        Login
      </Button>
      <Button className="bg-gradient-primary hover:opacity-90 transition-opacity" onClick={() => navigate('/signup')}>
        Começar Grátis
      </Button>
    </>
  );
}