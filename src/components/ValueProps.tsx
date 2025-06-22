
import { Users, Zap, Trophy, Timer, Heart } from "lucide-react";

export const ValueProps = () => {
  const props = [
    {
      icon: Users,
      title: "Form squads & compete for glory",
      description: "Build your crew and dominate the leaderboards together"
    },
    {
      icon: Zap,
      title: "Send or receive real-life dares",
      description: "Challenge friends with hilarious and bold dares"
    },
    {
      icon: Trophy,
      title: "Score points, rise in ranks, win real rewards",
      description: "Every dare completed gets you closer to exclusive prizes"
    },
    {
      icon: Timer,
      title: "Teamwork meets mischief",
      description: "Who will break first? Test your limits together"
    },
    {
      icon: Heart,
      title: "Fun. Social. Competitive.",
      description: "Every day brings a new challenge and adventure"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Why FriendsIn Will Change Everything
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {props.slice(0, 3).map((prop, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 mr-4">
                  <prop.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 font-bold text-lg">✅</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-300 transition-colors">
                {prop.title}
              </h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {props.slice(3).map((prop, index) => (
            <div
              key={index + 3}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 mr-4">
                  <prop.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 font-bold text-lg">✅</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-300 transition-colors">
                {prop.title}
              </h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
