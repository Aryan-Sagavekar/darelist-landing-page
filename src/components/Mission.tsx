
import { Card } from "@/components/ui/card";

export const Mission = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-white/20 backdrop-blur-sm shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Our Why ❤️
            </h2>
            
            <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-10 italic font-light max-w-3xl mx-auto">
              "We built FriendsIn because real connection happens when people play, push, and grow together. 
              We're here to make friendship a sport — unpredictable, hilarious, and unforgettable."
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full flex items-center justify-center mr-6 shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-xl">The Entrext Team</div>
                <div className="text-gray-300 text-lg">Building the future of social gaming</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
