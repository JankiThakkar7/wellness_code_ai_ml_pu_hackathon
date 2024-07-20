import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ChatWindow = () => {
  const prompts = useSelector((store) => store.prompt);

  const chatWindowRef = useRef(null);
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [prompts]);

  return (
    <section className="flex-grow flex justify-center py-8">
      <div ref={chatWindowRef} className="w-[712px] h-[420px] overflow-y-auto">
        {prompts?.promptHistory?.map((prompt, index) => (
          <div className="p-4 bg-[#181818] my-4 rounded-xl" key={index}>
            {prompt}
          </div>
        ))}
      </div>
    </section>
  );
};
export default ChatWindow;
