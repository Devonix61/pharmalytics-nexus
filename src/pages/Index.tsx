import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import DrugInteractionChecker from "@/components/DrugInteractionChecker";
import UserDashboard from "@/components/UserDashboard";
import TechnologyStack from "@/components/TechnologyStack";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        <HeroSection />
        <FeatureShowcase />
        <div id="checker">
          <DrugInteractionChecker />
        </div>
        <div id="dashboard">
          <UserDashboard />
        </div>
        <TechnologyStack />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
