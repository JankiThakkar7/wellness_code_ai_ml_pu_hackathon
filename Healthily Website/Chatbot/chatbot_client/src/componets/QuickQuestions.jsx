import { useDispatch } from "react-redux";
import Tagline from "./Tagline";
import { addPrompt } from "./promptSlice";

const QuickQuestions = ({ setQuickQuestion }) => {
  const dispatch = useDispatch();
  const quickQuestions = [
    "How can I prevent common colds?",
    "How can I manage stress effectively?",
    "What are the common symptoms of diabetes?",
  ];

  const handlePrompt=async(prompt)=>{
    console.log(prompt);
    const res = await fetch("http://localhost:8000/predict",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({message:prompt})
    })
    const data = await res.json();
    console.log(data?.answer);
    dispatch(addPrompt(data?.answer));
  }
  return (
    <section className="flex-grow flex flex-col justify-center items-center py-8">
      <div className="flex gap-6">
        {quickQuestions.map((question, index) => (
          <div
            key={index}
            className="flex items-center h-32 p-4 rounded-xl bg-[#181818] cursor-pointer"
            onClick={() => {
              dispatch(addPrompt(question));
              handlePrompt(question);
              setQuickQuestion(false);
              //WIP
            }}
          >
            {question}
          </div>
        ))}
      </div>
      <div className="mt-16 w-full flex flex-col items-center">
        <p className="text-3xl font-medium flex items-center">
          <span className="p-0 pr-2">Ask Wellness Code
          </span>
          <span class="material-symbols-outlined text-red-400 text-5xl">
            genetics
          </span>
        </p>
        <Tagline />
      </div>
    </section>
  );
};
export default QuickQuestions;
