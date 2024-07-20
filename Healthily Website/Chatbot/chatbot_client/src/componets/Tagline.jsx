import { useEffect, useState } from "react";

const Tagline = () => {
  const taglines = [
    "Your Health, Our Answers.",
    "Quick Care, Quick Answers.",
    "Health Help at Your Fingertips.",
    "Stay Informed, Stay Healthy.",
    "Health Advice, Anytime.",
    "Your Digital Health Guide.",
    "Instant Health Insights.",
    "Smart Health, Simple Answers.",
    "Ask Us Anything, Stay Well.",
    "Your Health, Simplified.",
    "Answers for Better Health.",
    "Caring for You, Virtually.",
    "Your Virtual Health Companion.",
    "Health Queries, Quick Responses.",
    "Empowering Health with Answers.",
  ];
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentTaglineIndex((previous) => (previous + 1) % taglines.length);
        setFadeIn(true);
      }, 800);
    }, 2500);
    return () => clearInterval(interval);
  }, [taglines.length]);
  return (
    <div className="w-full mt-6 flex items-center justify-center">
      {taglines.map((tagline, index) => (
        <div
          key={index}
          className={`absolute p-0 text-lg transition-opacity duration-500 ${
            index === currentTaglineIndex ? "opacity-100" : "opacity-0"
          } ${fadeIn ? "fade-in" : "fade-out"}`}
        >
          {tagline}
        </div>
      ))}
    </div>
  );
};
export default Tagline;
