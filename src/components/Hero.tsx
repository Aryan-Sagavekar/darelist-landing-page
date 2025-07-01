import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Hero = () => {
  const [email, setEmail] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Add main user to waitlist
      const { data: userData, error: userError } = await supabase
        .from('waitlist')
        .insert([{ email }])
        .select('position, referral_code')
        .single();

      if (userError) {
        if (userError.code === '23505') {
          toast({
            title: "Already on the darelist! 🎯",
            description: "This email is already registered. Check your inbox for updates!",
            variant: "destructive",
          });
        } else {
          throw userError;
        }
        return;
      }

      // If friend email is provided and main signup was successful, add friend too
      if (friendEmail && userData) {
        try {
          await supabase
            .from('waitlist')
            .insert([{ 
              email: friendEmail, 
              referred_by: userData.referral_code ? 
                (await supabase.from('waitlist').select('id').eq('referral_code', userData.referral_code).single()).data?.id 
                : null 
            }]);
        } catch (friendError) {
          // Don't fail the main signup if friend signup fails
          console.log('Friend signup failed:', friendError);
        }
      }

      // Save email to localStorage for later use
      localStorage.setItem('waitlist_email', email);
      
      // Trigger storage event to update other components
      window.dispatchEvent(new Event('storage'));

      toast({
        title: "🚀 You're on the darelist!",
        description: `Welcome to position #${userData.position}! ${friendEmail ? 'Your friend has been added too.' : ''}`,
      });

      setEmail("");
      setFriendEmail("");
    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
          Unleash Epic Challenges with Your Squad
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Turn everyday moments into unforgettable dares.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="flex flex-col space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300 focus:bg-white/20"
              required
              disabled={isSubmitting}
            />
            <Input
              type="email"
              placeholder="Friend's email (optional)"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
              className="h-12 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300 focus:bg-white/20"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="h-12 text-lg bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 disabled:opacity-50"
            >
              {isSubmitting ? "Joining..." : "Join the Darelist 🔥"}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-gray-400">
          🎉 Early access for the first 1,000 squads.
        </p>

        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
            <span className="text-gray-300">Unlimited Challenges</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
            <span className="text-gray-300">Real-time Leaderboards</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-pink-400 rounded-full mr-3"></div>
            <span className="text-gray-300">Exclusive Rewards</span>
          </div>
        </div>
      </div>
    </section>
  );
};
