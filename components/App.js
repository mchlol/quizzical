import React from "react";
import axios from "axios";
// import Splash from "./Splash";
import Quiz from "./Quiz";
// import Question from "./Question";

export default function App() {

    // set questions and pass as props to Quiz component

    const [questions, setQuestions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);


    // get the questions with axios
    React.useEffect( () => {

        setLoading(true);

        axios.get('https://opentdb.com/api.php?amount=5&category=9&type=multiple')
        .then (res => {
            setQuestions(res.data.results);
            setLoading(false);
        })
        .catch( err => {
            console.log(err);
            setError(err);
            setLoading(false)
        })
    },[]); 

    return (
        <main>
            {
                loading
                ? <p className="flex-centered">Loading</p>
                : <Quiz questions={questions}/>
            }
        </main>
        
    )
}