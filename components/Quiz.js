import React from "react";
import axios, { all } from "axios";
import Question from "./Question";
import { shuffleAnswers } from './utils.js'

export default function Quiz(props) {

    // settings for the API call
    const BASE_URL = 'https://opentdb.com/api.php';
    const amount = 5;
    const difficulty = 'easy';
    // * future feature considerations: set amount, difficulty, category

    // state
    const [allQuestions, setAllQuestions] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const [correctAnswers, setCorrectAnswers] = React.useState([]);
    const [selectedAnswers, setSelectedAnswers] = React.useState([]);

    const [finished, setFinished] = React.useState(false);
    const [score, setScore] = React.useState(null);

    const [start, setStart] = React.useState(props.start);

    React.useEffect( () => {
        setStart(props.start);
    },[props.start])

    // get data from the API
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
            // get the index for each correct answer in the shuffled array
            setCorrectAnswers( () => {
                let correctAnswerIndexes = [];
                for (let i = 0; i < newData.length; i++) {
                    correctAnswerIndexes.push(newData[i][1].shuffledAnswers.correctIndex);
                }
                return correctAnswerIndexes;
            })
            setLoading(false);
        })
        .catch (err => {
            console.log('err: ',err)
            setError(err);
            setLoading(false);

        })

    },[start]);

    // when an answer is clicked within Question components, it sends that index back to the Quiz component and updates the state for selectedAnswers
    function sendAnswer(questionId, selection) {

        // updates state for the selected answers, and if the questionId is already present, overwrites its value
        setSelectedAnswers( prevSelectedAnswers => {
            return {
                ...prevSelectedAnswers,
                [questionId]: selection
            }
        })
    } // sendAnswer

    function checkAnswers() {

        // check which answers were correct
        let scoreHolder = 0;
        let arr = [];
        for (let i = 0; i < correctAnswers.length; i++) {
            // ! debugging incorrect score
            // console.log(Object.keys(selectedAnswers)[i], Object.values(selectedAnswers)[i]);
            // console.log('Correct: ', correctAnswers[i]);

            if (Object.values(selectedAnswers)[i] === correctAnswers[i]) {
                arr.push(true);
                scoreHolder = scoreHolder + 1;
            } else {
                arr.push(false)
                // if any question was not answered its value will be just be false
            }
        }
        setScore(scoreHolder);
        setFinished(true);
    }

    function resetGame() {
        props.setStart(false);
    }

 

    if (error) {
        return <p>Could not retrieve questions. Please try again.</p>
    }


    return (
        <div>
        {
            loading 
            ? 
                    <em>Loading...</em>
            : 
                <div className="flex-centered"> 
                    <div className="questions-container">
                    <Question 
                        data={allQuestions[0][1]} 
                        id={'question0'} 
                        correct={correctAnswers[0]}
                        sendAnswer={sendAnswer} 
                        finished={finished}
                    />
                    <hr />
                    <Question 
                        data={allQuestions[1][1]} 
                        id={'question1'} 
                        correct={correctAnswers[1]}
                        sendAnswer={sendAnswer} 
                        finished={finished}
                    />
                    <hr />
                    <Question 
                        data={allQuestions[2][1]} 
                        id={'question2'} 
                        correct={correctAnswers[2]}
                        sendAnswer={sendAnswer} 
                        finished={finished}
                    />
                    <hr />
                    <Question 
                        data={allQuestions[3][1]} 
                        id={'question3'} 
                        correct={correctAnswers[3]}
                        sendAnswer={sendAnswer} 
                        finished={finished}
                    />
                    <hr />
                    <Question 
                        data={allQuestions[4][1]} 
                        id={'question4'} 
                        correct={correctAnswers[4]}
                        sendAnswer={sendAnswer} 
                        finished={finished}
                    />
                    </div>
                    {
                        finished 
                        ?  
                            <div className="end-div">
                                <p className="end-p">You scored {score}/5 correct answers</p>
                                <button onClick={resetGame} className="submit-btn">Play Again</button>
                            </div>
                        : 
                            <div className="flex-centered">
                                <button className="submit-btn" onClick={checkAnswers}>Check answers</button>
                            </div>
                    }
                    
                </div>
        }
        </div>
        
    )
}