import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPrompt } from "./promptSlice";

const ChatInput = ({ setQuickQuestion }) => {
  const [newPrompt, setNewPrompt] = useState("");
  const dispatch = useDispatch();

  const handlePrompt = async (prompt) => {
    console.log(prompt);
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ message: prompt })
    });
    const data = await res.json();
    console.log(data?.answer);
    dispatch(addPrompt(data?.answer));
  };

  const sendMessage = () => {
    if (newPrompt === "") {
      return;
    }
    dispatch(addPrompt(newPrompt));
    handlePrompt(newPrompt);
    setNewPrompt("");
    setQuickQuestion(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && window.innerWidth > 700) {
      sendMessage();
    }
  };

  useEffect(() => {
    const input = document.getElementById('chat-input');
    if (input) {
      input.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (input) {
        input.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center pb-12 py-4 gap-4">
      <input
        type="text"
        id="chat-input"
        className="px-8 py-4 rounded-full bg-[#141414] w-[712px] focus:outline-none placeholder-slate-400"
        placeholder="Hellooo"
        value={newPrompt}
        onChange={(e) => setNewPrompt(e.target.value)}
      />
      <div
        className="size-12 flex justify-center items-center hover:bg-gray-700 rounded-full cursor-pointer"
        onClick={sendMessage}
      >
        <span className="material-symbols-outlined text-3xl">
          arrow_circle_up
        </span>
      </div>
    </div>
  );
};

export default ChatInput;
