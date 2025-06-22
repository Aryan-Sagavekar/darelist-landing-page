
import { Card } from "@/components/ui/card";

export const Mission = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-white/10 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Why ❤️
            </h2>
            
            <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 italic">
              "We built FriendsIn because real connection happens when people play, push, and grow together. 
              We're here to make friendship a sport — unpredictable, hilarious, and unforgettable."
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg">– The Entrext Team</div>
                <div className="text-gray-400">Building the future of social gaming</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
