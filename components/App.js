import React from "react";
// import Splash from "./Splash";
import Quiz from "./Quiz";
// import Question from "./Question";

export default function App() {

    const [start, setStart] = React.useState(false);

    return (
        <div>
        { start ? 
        <Quiz />
        : <button onClick={() => setStart(true)}>
                Start Quiz
            </button>
        }
            
        </div>
    )
}