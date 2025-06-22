
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Zap, Users, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ email }])
        .select('position')
        .single();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already on the list! 🎯",
            description: "This email is already registered for early access.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        // Save email to localStorage for referral tracking
        localStorage.setItem('waitlist_email', email);
        
        toast({
          title: "🔥 You're on the Darelist!",
          description: `Position #${data.position} - Get ready for the ultimate social challenge experience.`,
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Zap className="absolute top-20 left-20 w-6 h-6 text-orange-400 animate-bounce opacity-60" style={{ animationDelay: '0s' }} />
          <Users className="absolute top-32 right-32 w-8 h-8 text-purple-400 animate-bounce opacity-60" style={{ animationDelay: '1s' }} />
          <Trophy className="absolute bottom-40 left-16 w-7 h-7 text-yellow-400 animate-bounce opacity-60" style={{ animationDelay: '2s' }} />
        </div>

        {/* Main headline */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            The Ultimate
            <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Social Dare
            </span>
            Experience is Coming.
          </h1>
          
          <div className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 tracking-wide">
            <span className="text-orange-400">Outplay.</span>
            <span className="text-pink-400 mx-2">Outdare.</span>
            <span className="text-purple-400">Outlast.</span>
          </div>
        </div>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
          Join <span className="font-bold text-white">FriendsIn</span> — where squads rise, dares get real, and only the bold win. 
          <br className="hidden md:block" />
          Built for the fearless, by <span className="text-gradient bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent font-semibold">Entrext</span>.
        </p>

        {/* Email capture form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400"
              required
              disabled={isSubmitting}
            />
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold text-lg border-0 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Joining..." : "Join the Darelist"}
            </Button>
          </div>
        </form>

        {/* Social proof */}
        <p className="text-gray-400 text-sm">
          Backed by challenge-loving squads across India 🇮🇳
        </p>
      </div>
    </section>
  );
};
