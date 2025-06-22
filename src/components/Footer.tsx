
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Twitter, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Footer = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's a dare?",
      answer: "Dares are fun, safe challenges you can send to friends or receive from your squad. Think photo challenges, mini adventures, or silly tasks that bring people together!"
    },
    {
      question: "Is it safe?",
      answer: "Absolutely! All dares are reviewed and must follow our community guidelines. We prioritize fun and friendship over anything risky or harmful."
    },
    {
      question: "Can I play solo?",
      answer: "FriendsIn is built for squads, but you can join public groups or invite friends to form your own crew. The magic happens when you play together!"
    },
    {
      question: "When does it launch?",
      answer: "We're putting the finishing touches on FriendsIn right now! Top waitlist members will get early access, with full launch coming soon."
    }
  ];

  return (
    <footer className="py-20 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Quick Questions 🤔
          </h3>
          
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                <CollapsibleTrigger asChild>
                  <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </div>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 text-gray-300 bg-white/5 border border-white/10 border-t-0 rounded-b-lg">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Social Links & Info */}
        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
              <span>@Entrext</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>Discord</span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>

          <div className="text-gray-500 text-sm">
            © 2024 Entrext. Built for the fearless. 🔥
          </div>
        </div>

        {/* Live chat bubble */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </footer>
  );
};
