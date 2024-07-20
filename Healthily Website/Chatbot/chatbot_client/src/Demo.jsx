// import { useEffect, useRef, useState } from "react";
// import Tagline from "./componets/Tagline";
// import QuickQuestions from "./componets/QuickQuestions";

// const App = () => {
//   const [q, setq] = useState("");
//   const [promtInit, setPromptInit] = useState(false);
//   const [prompts, setPrompts] = useState(["user", "bot", "user", "bot"]);

//   const quckQuestions = [
//     "How can I prevent common colds?",
//     "How can I manage stress effectively?",
//     "What are the common symptoms of diabetes?",
//   ];

//   const chatWindowRef = useRef(null);
//   const scrollToBottom = () => {
//     if (chatWindowRef.current) {
//       console.log(chatWindowRef.current);
//       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [prompts]);

//   return (
//     <>
//       <section className="h-dvh w-dvw bg-mainBg">
//         <div className="grid grid-cols-12 w-full h-full divide-x divide-slate-400">
//           <div className="p-4 col-span-2">
//             {/* buttons of doctor recommendations. image recognization */}
//           </div>
//           <div className="px-4 py-8 col-span-10 flex flex-col">
//             <div className="h-[85%] w-full flex justify-center">
//               {promtInit ? (
//                 <>
//                   <div
//                     className="w-[800px] h-[700px] overflow-y-auto"
//                     ref={chatWindowRef}
//                   >
//                     {prompts.map((pr, key) => (
//                       <>
//                         <div
//                           key={key}
//                           className="bg-[#181818] my-4 p-4 rounded-xl"
//                         >
//                           {pr}
//                         </div>
//                       </>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <div className="h-full w-full flex flex-col justify-center items-center">
//                   <div className="flex gap-6">
//                     {quckQuestions.map((item, key) => (
//                       <QuickQuestions
//                         question={item}
//                         key={key}
//                         onClick={() => setq(item)}
//                       />
//                     ))}
//                   </div>
//                   <div className="mt-16 w-full flex flex-col items-center">
//                     <p className="text-3xl font-medium flex items-center">
//                       <span className="p-0 pr-2">Ask Aemie</span>
//                       <span class="material-symbols-outlined text-red-400 text-5xl">
//                         genetics
//                       </span>
//                     </p>
//                     <Tagline />
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="flex w-full h-[15%] justify-center items-center gap-4">
//               <input
//                 className="p-4 px-8 w-[712px] bg-[#141414] rounded-full focus:outline-none placeholder-slate-300"
//                 type="text"
//                 placeholder="hello..."
//                 value={q}
//                 onChange={(e) => setq(e.target.value)}
//               />
//               <div
//                 className="flex justify-center items-center size-12 cursor-pointer p-4 hover:bg-slate-500 transition-all duration-500 ease-in-out rounded-full"
//                 onClick={() => {
//                   setPromptInit(true);
//                   if (q === "") {
//                     return;
//                   }
//                   setPrompts([...prompts, q]);
//                   setq("");
//                 }}
//               >
//                 <span className="material-symbols-outlined text-3xl">
//                   expand_circle_up
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
// export default App;
