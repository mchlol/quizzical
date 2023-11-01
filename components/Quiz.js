import React from "react";
import axios from "axios";
import Question from "./Question";
import { shuffleAnswers } from './utils.js'

export default function Quiz() {

    const [allQuestions, setAllQuestions] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect( () => {
        axios.get('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
        .then( res => {
            // console.log('res: ',res); // log the response
            const results = res.data.results;
            console.log('results: ', results);
            // setAllQuestions(results);
            const newData = Object.entries(results).map(questions => {
                questions[1].shuffledAnswers = shuffleAnswers(questions[1].incorrect_answers, questions[1].correct_answer)
                return questions
            });
            setAllQuestions(newData);
            
            setLoading(false);


        })
        .catch (err => {
            console.log('err: ',err)
            setLoading(false);

        })

    },[]);

    if (error) {
        return <p>Could not retrieve questions. Please try again.</p>
    }
    

    return (
        <div>
        {
            loading 
            ? <em>Loading...</em>
            : <Question data={allQuestions[0][1]} />
        }
        </div>
        
    )
}