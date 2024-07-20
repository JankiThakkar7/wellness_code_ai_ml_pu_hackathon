import { useState } from "react";
import ChatInput from "./componets/ChatInput";
import ChatWindow from "./componets/ChatWindow";
import QuickQuestions from "./componets/QuickQuestions";
import PowerUps from "./componets/PowerUps";

const App = () => {
  const [quickQuestion, setQuickQuestion] = useState(true);
  const [powerUP, setPowerUP] = useState(false)
  return (
    <section className="w-screen h-screen bg-mainBg flex divide-x divide-gray-600">
      <aside className="p-4 flex flex-col gap-4 items-center min-w-72 max-w-96 divide-y divide-gray-600">
        <div className="flex flex-col items-center gap-2">
          {/* <p className="text-4xl font-medium px-4">Wellness Code</p> */}
          <p className="text-3xl px-4 font-medium">Wellness Code</p>
          <p className="text-lg">Your personal AI Healcare Friend</p>
        </div>
        <div className="w-full flex flex-col justify-center gap-4 flex-grow">
          <PowerUps />
        </div>
      </aside>
      {powerUP ? "power":
      <main className="flex-grow flex flex-col p-4">
        {quickQuestion ? (
          <QuickQuestions setQuickQuestion={setQuickQuestion} />
        ) : (
          <ChatWindow />
        )}
        <ChatInput setQuickQuestion={setQuickQuestion} />
      </main>}
    </section>
  );
};
export default App;
