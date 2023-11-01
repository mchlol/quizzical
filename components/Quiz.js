import React from "react";
import axios from "axios";
import Question from "./Question";
import { shuffleAnswers } from './utils.js'

export default function Quiz() {

    const BASE_URL = 'https://opentdb.com/api.php';
    const amount = 5;
    const difficulty = 'easy';
    // future feature considerations: set amount, difficulty, category

    const [allQuestions, setAllQuestions] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [selectedAnswers, setSelectedAnswers] = React.useState([]);

    console.log('Quiz selectedAnswers: ',selectedAnswers);

    React.useEffect( () => {
        axios.get(`${BASE_URL}?amount=${amount}&difficulty=${difficulty}&type=multiple`)
        .then( res => {
            const results = res.data.results;
            // shuffle the answers into a new array, add it as a property on the original object, along with the index of the correct answer in the shuffled array
            const newData = Object.entries(results).map(questions => {
                questions[1].shuffledAnswers = shuffleAnswers(questions[1].incorrect_answers, questions[1].correct_answer);
                return questions;
            });
            setAllQuestions(newData);
            setLoading(false);
        })
        .catch (err => {
            console.log('err: ',err)
            setError(err);
            setLoading(false);

        })

    },[]);

    // send to the child component to get selections back for comparison
    function sendAnswer(questionId, selection) {
        console.log(`Selected answer index for ${questionId}: ${selection}`)

        setSelectedAnswers( prevSelectedAnswers => {
            return {
                ...prevSelectedAnswers,
                [questionId]: selection
            }
        })
    } // sendAnswer

    function checkAnswers() {
        console.log('checking answers');
        console.log('selectedAnswers indexes ',selectedAnswers);
        
        // get an array of all the correct answers
        // loop through the AllQuestions data
        let correctAnswerIndexes = [];
        for (let i = 0; i < allQuestions.length; i++) {
            console.log('allQuestion shuffled answers')
            correctAnswerIndexes.push(allQuestions[i][1].shuffledAnswers.correctIndex);
        }
        console.log('correctAnswerIndexes: ',correctAnswerIndexes);

    }

    if (error) {
        return <p>Could not retrieve questions. Please try again.</p>
    }

    // TODO: dynamically render questions from state
    

    return (
        <div>
        {
            loading 
            ? <em>Loading...</em>
            : 
                <div>
                    <div>
                    <Question 
                        data={allQuestions[0][1]} 
                        id={'question0'} 
                        sendAnswer={sendAnswer} 
                    />
                    <Question 
                        data={allQuestions[1][1]} 
                        id={'question1'} 
                        sendAnswer={sendAnswer} 
                    />
                    <Question 
                        data={allQuestions[2][1]} 
                        id={'question2'} 
                        sendAnswer={sendAnswer} 
                    />
                    <Question 
                        data={allQuestions[3][1]} 
                        id={'question3'} 
                        sendAnswer={sendAnswer} 
                    />
                    <Question 
                        data={allQuestions[4][1]} 
                        id={'question4'} 
                        sendAnswer={sendAnswer} 
                    />
                    </div>
                    <br />
                    <button onClick={checkAnswers}>Check answers</button>
                </div>
        }
        </div>
        
    )
}