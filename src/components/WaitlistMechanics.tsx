import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Share2, Crown, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const WaitlistMechanics = () => {
  const [referralEmail, setReferralEmail] = useState("");
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Get user's current position and referral code from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('waitlist_email');
    if (savedEmail) {
      fetchUserData(savedEmail);
    }
  }, []);

  const fetchUserData = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('position, referral_code')
        .eq('email', email)
        .single();

      if (data && !error) {
        setUserPosition(data.position);
        setReferralCode(data.referral_code);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralEmail || !referralCode || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Get referrer's ID
      const { data: referrerData, error: referrerError } = await supabase
        .from('waitlist')
        .select('id')
        .eq('referral_code', referralCode)
        .single();

      if (referrerError || !referrerData) {
        throw new Error('Unable to process referral');
      }

      // Add referred user
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ 
          email: referralEmail, 
          referred_by: referrerData.id 
        }])
        .select('position')
        .single();

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already registered! 🎯",
            description: "This email is already on the waitlist.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "🚀 Referral Sent!",
          description: `Your friend is now #${data.position} on the waitlist. You're climbing higher!`,
        });
        setReferralEmail("");
        
        // Refresh user's position
        const savedEmail = localStorage.getItem('waitlist_email');
        if (savedEmail) {
          setTimeout(() => fetchUserData(savedEmail), 1000);
        }
      }
    } catch (error) {
      console.error('Error processing referral:', error);
      toast({
        title: "Referral failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save email when user joins from Hero component
  useEffect(() => {
    const handleStorageChange = () => {
      const savedEmail = localStorage.getItem('waitlist_email');
      if (savedEmail) {
        fetchUserData(savedEmail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🚀 FOMO Engine
          </h2>
          <p className="text-xl text-gray-300">
            Don't just wait — dominate the darelist!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gamified waitlist */}
          <Card className="p-8 bg-gradient-to-br from-orange-500/10 to-pink-500/10 border-orange-500/20">
            <div className="text-center">
              <Crown className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">
                Climb the Darelist
              </h3>
              <p className="text-black mb-6">
                Invite your squad and rise to the top. The more friends you bring, the higher you climb!
              </p>
              
              <div className="bg-black/30 rounded-full p-4 mb-6">
                <div className="text-3xl font-bold text-orange-400 mb-1">
                  #{userPosition || "Join to see"}
                </div>
                <div className="text-gray-400 text-sm">Your Current Rank</div>
              </div>

              {referralCode && (
                <form onSubmit={handleReferralSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Friend's email"
                    value={referralEmail}
                    onChange={(e) => setReferralEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 disabled:opacity-50"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Invite"}
                  </Button>
                </form>
              )}

              {!referralCode && (
                <p className="text-gray-400 text-sm">
                  Join the waitlist to start referring friends!
                </p>
              )}
            </div>
          </Card>

          {/* Top 100 rewards */}
          <Card className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <div className="text-center">
              <Gift className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">
                Elite Access
              </h3>
              <p className="text-black mb-6">
                Top 100 squads get exclusive perks that money can't buy.
              </p>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-black">Early access (2 weeks before launch)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                  <span className="text-black">Exclusive first challenge rewards</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  <span className="text-black">VIP squad status & badges</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-black">Direct line to Entrext team</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
