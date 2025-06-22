
import { Hero } from "@/components/Hero";
import { AppPreview } from "@/components/AppPreview";
import { ValueProps } from "@/components/ValueProps";
import { SocialProof } from "@/components/SocialProof";
import { Mission } from "@/components/Mission";
import { WaitlistMechanics } from "@/components/WaitlistMechanics";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative z-10">
        <Hero />
        <AppPreview />
        <ValueProps />
        <SocialProof />
        <Mission />
        <WaitlistMechanics />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
