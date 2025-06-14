import React, { createContext, useState } from "react";
import runChat from "../config/gemini";




const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);

  const delay = (index, nextWord, totalWords) => {
    const delayTime = (10 / totalWords) * index;
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, delayTime);
  };

  const onSent = async (prompt) => {
    if (!input) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    // Add the input to the previous prompts
    setPrevPrompts((prev) => [...prev, input]);

    const response = await runChat(input);  // Get the response based on input
    // console.log(response)

    let responseArray = response.split("**");  // Split response based on custom delimiter
    let newArray = "";
    let newResponse = "";

    // Process the response to format bold text
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    // Set the result data
    setResultData(newArray);

    let newResponse2 = newResponse.replace(/\*/g, "</b>");
    let newResponseArray = newResponse2.split(" ");  // Split response into words

    // Simulate typing effect by adding delay for each word
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delay(i, nextWord + " ", newResponseArray.length);
    }

    setLoading(false);  // Hide loading spinner
    setInput("");       // Clear the input field
  };

  // const runChat = async (prompt) => {
  //   console.log(`Running chat with prompt: ${prompt}`);
  //   return `This is a simulated response based on: ${prompt}`;  // Simulated response
  // };

  // Function to reset the state and start a new chat
  const newChat = () => {
    setInput("");          // Clear the input field
    setResultData("");     // Clear any displayed result data
    setShowResult(false);  // Hide the result section
    setLoading(false);     // Ensure loading is turned off
    setRecentPrompt("");  // Clear the recent prompt
  };

  const contextValue = {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    prevPrompts,
    setPrevPrompts,
    newChat,
    setRecentPrompt,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}  // Render child components
    </Context.Provider>
  );
};

export { Context, ContextProvider };









































// import React, { createContext, useState } from "react";


// const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");


//   const delay = (index, nextWord, totalWords) => {
//     const delayTime = (10 / totalWords) * index; // Adjust timing for totalWords
//     setTimeout(() => {
//       setResultData((prev) => prev + nextWord);
//     }, delayTime);
//   };

//   const onSent = async () => {
//     let response = await runChat(input);
//     let responseArray = response.split("**");
//     let newArray = "";
//     let newResponse = "";
//     console.log("OnSent tk aa gya ");
//     if (!input) return;

//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     if(prompt !== undefined){
//       response = await runChat(prompt);
//       setRecentPrompt(prompt)
//     }
//     else
//     {
//       setPrevPrompts(prev=>[...prev,input])
//     }
//     setRecentPrompt(input);
//     setPrevPrompts(prev=>[...prev,input])

    
//     for (let i = 0; i < responseArray.length; i++) {
//       if (i === 0 || i % 2 !== 1) {
//         newArray += responseArray[i];
//       } else {
//         newResponse += "<b>" + responseArray[i] + "</b>";
//       }
//     }
//     setResultData(newArray);

//     let newResponse2 = newResponse.replace(/\*/g, "</b>");
//     let newResponseArray = newResponse2.split(" ");
//     for (let i = 0; i < newResponseArray.length; i++) {
//       const nextWord = newResponseArray[i];
//       delay(i, nextWord + " ", newResponseArray.length);
//     }

//     setLoading(false);
//     setInput("");
//   };

//   const runChat = async (prompt) => {
//     console.log(`Running chat with prompt: ${prompt}`);
//     return `This is a simulated response based on: ${prompt}`;
//   };

//   const newChat = () => {
//     // Reset the state to clear the current chat and start fresh
//     setInput("");          // Clear the input field
//     setResultData("");     // Clear any displayed result data
//     setShowResult(false);  // Hide the result section
//     setLoading(false);     // Ensure loading is turned off
//     setRecentPrompt("");  // Clear the recent prompt (optional)
//   };
  

//   const contextValue = {
//     onSent,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//     newChat
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export { Context, ContextProvider };


