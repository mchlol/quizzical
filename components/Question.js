import React from "react";
import {decode} from 'html-entities';
// import Answer from "./Answer";

export default function Question(props) {

    const [questionData, setQuestionData] = React.useState(props.data);
    const [shuffledAnswers, setShuffledAnswers] = React.useState(props.data.shuffledAnswers.shuffledArray);
    const [correctAnswerIndex, setCorrectAnswerIndex] = React.useState(props.data.shuffledAnswers.correctIndex);
    const [selectedAnswer, setSelectedAnswer] = React.useState('');

    console.log('Question data: ', questionData)

    function handleClick(selected) {
        console.log('selected answer index: ',selected);
        console.log('correct index: ',correctAnswerIndex);
        setSelectedAnswer(selected);
        console.log(selectedAnswer);
    }

    // loop through the answers and style the one that is selected?

    let btns = [];
    for (let i = 0; i < shuffledAnswers.length; i++) {
        btns.push(
            <button 
            key={`answer${i}`} 
            className={selectedAnswer === i ? 'answer-btn selected' : 'answer-btn'}
            onClick={() => handleClick(i)} 
            >
                {decode(shuffledAnswers[i])}
            </button>
        )
    }

    console.log(btns);

    return (
        <div>
            <h3>{decode(questionData.question)}</h3>

            {btns}

        </div>
    )
}