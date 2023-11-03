import React from "react";
import Quiz from "./Quiz";

export default function App() {

    const [start, setStart] = React.useState(false);

    return (
        <div>
        { 
            start 
            ? 
                <Quiz start={start} setStart={setStart}/>
            : 
                <div className="flex-centered">
                <h1>Quizzical</h1>
                <p>Test your knowledge!</p>
                <button className="submit-btn" onClick={() => setStart(true)}>
                        Start Quiz
                    </button>
                </div>
        }
            
        </div>
    )
}