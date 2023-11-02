import React from "react";
// import {decode} from 'html-entities';
import { decodeText } from './utils.js'

// import Answer from "./Answer";

export default function Question(props) {

    const [questionData, setQuestionData] = React.useState(props.data);
    const [shuffledAnswers, setShuffledAnswers] = React.useState(props.data.shuffledAnswers.shuffledArray);
    const [correctAnswerIndex, setCorrectAnswerIndex] = React.useState(props.data.shuffledAnswers.correctIndex);
    const [selectedAnswer, setSelectedAnswer] = React.useState('');

    function handleClick(selected) {
        setSelectedAnswer(selected);
        props.sendAnswer(props.id, selected);
    };
    

    // loop through the answers and style the one that is selected
    // set the selected answer on click
    let btns = [];
    for (let i = 0; i < shuffledAnswers.length; i++) {
        console.log(i === correctAnswerIndex);
        btns.push(
            <button 
            key={`answer${i}`} 
            className={selectedAnswer === i ? 'answer-btn selected' : 'answer-btn'}
            onClick={() => handleClick(i)} 
            >
                {decodeText(shuffledAnswers[i])}
            </button>
        )
    };

    return (
        <div>
            <h3>{decodeText(questionData.question)}</h3>

            {btns}

            {selectedAnswer}

        </div>
    )
}