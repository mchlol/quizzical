import React from "react";
import axios from "axios";
import Question from "./Question";
import { shuffleAnswers } from './utils.js'

export default function Quiz() {

    const BASE_URL = 'https://opentdb.com/api.php';
    const amount = 5;
    const difficulty = 'easy';
    // * future feature considerations: set amount, difficulty, category

    const [allQuestions, setAllQuestions] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [selectedAnswers, setSelectedAnswers] = React.useState([]);
    const [finished, setFinished] = React.useState(false);
    const [score, setScore] = React.useState(null);

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
        for (let i = 0; i < selectedAnswers.length; i++) {
            console.log(selectedAnswers[i]);
            // ! need to check all questions were answers ie. that each questionId has a corresponding answer
            // ? try hasOwnProperty() 
        }
        
        // get an array of all the correct answers
        // loop through the AllQuestions data
        let correctAnswerIndexes = [];
        for (let i = 0; i < allQuestions.length; i++) {
            console.log('allQuestion shuffled answers')
            correctAnswerIndexes.push(allQuestions[i][1].shuffledAnswers.correctIndex);
        }
        console.log('correctAnswerIndexes: ',correctAnswerIndexes);

        // check which answers were correct
        let scoreHolder = 0;
        let arr = [];
        for (let i = 0; i < correctAnswerIndexes.length; i++) {
            console.log(`Selected answer to question${i}: `, Object.values(selectedAnswers)[i]);
            console.log(`Correct answer to question${i}: `, correctAnswerIndexes[i]);
            if (Object.values(selectedAnswers)[i] === correctAnswerIndexes[i]) {
                arr.push(true);
                scoreHolder++;
            } else {
                arr.push(false)
            }
        }
        console.log('arr: ',arr)
        console.log('Score: ',scoreHolder)
        setScore(scoreHolder);
        setFinished(true); // ! 

    }

    if (error) {
        return <p>Could not retrieve questions. Please try again.</p>
    }

    // TODO: dynamically render question components from state
    

    return (
        <div>
        {
            loading 
            ? <em>Loading...</em>
            : 
                <div> 
                {/* This component needs to be re-rendered on finished with new styles */}
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
                    {
                        finished 
                        ?  
                            <div>
                                <p>You scored {score}/5 correct answers</p>
                                <button>Play Again</button>
                            </div>
                        : 
                            <button onClick={checkAnswers}>Check answers</button>
                    }
                    
                </div>
        }
        </div>
        
    )
}