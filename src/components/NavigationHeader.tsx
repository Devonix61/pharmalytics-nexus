import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Stethoscope, 
  Shield, 
  Users, 
  FileText,
  Settings,
  LogOut
} from "lucide-react";

const NavigationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "#dashboard", icon: Stethoscope },
    { name: "Drug Checker", href: "#checker", icon: Shield },
    { name: "Patients", href: "#patients", icon: Users },
    { name: "Reports", href: "#reports", icon: FileText },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PharmaLytics
              </h1>
              <div className="text-xs text-muted-foreground">Nexus Platform</div>
            </div>
            <Badge variant="secondary" className="ml-2 text-xs">
              Demo
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <a href={item.href} className="flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                </Button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <a href={item.href} className="flex items-center">
                      <Icon className="w-4 h-4 mr-3" />
                      {item.name}
                    </a>
                  </Button>
                );
              })}
              <div className="pt-4 border-t border-border space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationHeader;