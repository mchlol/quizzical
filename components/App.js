import React from "react";
// import Splash from "./Splash";
import Quiz from "./Quiz";
// import Question from "./Question";

export default function App() {

    const [start, setStart] = React.useState(false);

    return (
        <div>
        { 
            start 
            ? 
                <Quiz />
            : 
                <div className="flex-centered">
                <h1>Quizzical</h1>
                <button className="submit-btn" onClick={() => setStart(true)}>
                        Start Quiz
                    </button>
                </div>
        }
            
        </div>
    )
}