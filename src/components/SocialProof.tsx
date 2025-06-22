
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export const SocialProof = () => {
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    // Get initial count
    const fetchWaitlistCount = async () => {
      try {
        const { count, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });
        
        if (!error && count !== null) {
          setWaitlistCount(count);
        }
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
        // Fallback to a default number if database is unavailable
        setWaitlistCount(3742);
      }
    };

    fetchWaitlistCount();

    // Set up real-time subscription to update count
    const subscription = supabase
      .channel('waitlist-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'waitlist' },
        () => {
          fetchWaitlistCount();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const testimonials = [
    {
      quote: "Finally an app that turns friendship into adrenaline.",
      name: "Priya K.",
      role: "Beta Tester"
    },
    {
      quote: "My squad has never been closer. This changes everything.",
      name: "Arjun M.",
      role: "Early User"
    },
    {
      quote: "The most fun I've had with an app in years!",
      name: "Sneha R.",
      role: "Challenge Winner"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Live counter */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-full px-6 py-3 mb-6">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-white font-bold text-lg">
              {waitlistCount > 0 ? `${waitlistCount.toLocaleString()}+ squads already waiting. Are you in?` : "Be the first to join the darelist!"}
            </span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
              <blockquote className="text-gray-300 text-lg mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
            Built by Entrext
          </Badge>
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
            Beta loved by 100+ testers
          </Badge>
          <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 px-4 py-2">
            Challenge-ready
          </Badge>
        </div>
      </div>
    </section>
  );
};
