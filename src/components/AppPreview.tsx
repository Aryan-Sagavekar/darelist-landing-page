
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AppPreview = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  
  const demoScreens = [
    {
      title: "Squad Challenges",
      content: "Team Knights vs Fire Squad",
      score: "2,450 pts",
      status: "Active Dare"
    },
    {
      title: "Live Leaderboard",
      content: "You're #3 this week!",
      score: "Rising fast",
      status: "Climb Higher"
    },
    {
      title: "Dare Timer",
      content: "Complete in 2h 34m",
      score: "Double points!",
      status: "Urgent"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoScreens.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get a Sneak Peek
        </h2>
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Here's what awaits you inside FriendsIn. Real squads, real challenges, real competition.
        </p>

        {/* Blurred app preview */}
        <div className="relative max-w-sm mx-auto">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
            <div className="space-y-4">
              {/* Mock phone header */}
              <div className="h-6 bg-white/10 rounded-full w-1/3 mx-auto"></div>
              
              {/* Demo content that cycles */}
              <Card className="bg-white/5 border-white/10 p-4 transition-all duration-500">
                <div className="text-left">
                  <Badge className="mb-2 bg-orange-500/20 text-orange-300 border-orange-500/30">
                    {demoScreens[activeDemo].status}
                  </Badge>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {demoScreens[activeDemo].title}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    {demoScreens[activeDemo].content}
                  </p>
                  <div className="text-orange-400 font-semibold">
                    {demoScreens[activeDemo].score}
                  </div>
                </div>
              </Card>

              {/* Mock navigation dots */}
              <div className="flex justify-center space-x-2">
                {demoScreens.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeDemo ? 'bg-orange-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px] rounded-3xl pointer-events-none"></div>
          
          {/* "Coming Soon" overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/70 backdrop-blur-sm rounded-2xl px-6 py-3 border border-orange-400/50">
              <span className="text-orange-400 font-bold text-lg">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
