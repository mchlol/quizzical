import React from "react";
// import {decode} from 'html-entities';
import { decodeText } from './utils.js'

// import Answer from "./Answer";

export default function Question(props) {

    const [questionData, setQuestionData] = React.useState(props.data);
    const [shuffledAnswers, setShuffledAnswers] = React.useState(props.data.shuffledAnswers.shuffledArray);
    const [correctAnswerIndex, setCorrectAnswerIndex] = React.useState(props.data.shuffledAnswers.correctIndex);
    const [selectedAnswer, setSelectedAnswer] = React.useState('');
    const [finished, setFinished] = React.useState(props.finished);

    React.useEffect( () => {
        setFinished(props.finished);
    },[props.finished])

    function handleClick(selected) {
        setSelectedAnswer(selected);
        props.sendAnswer(props.id, selected);
    };

    function applyClassNames(index) {
        let classNames = 'answer-btn'; // applied regardless of state
        
        // buttons are looped over below, and styles applied per this function
        // we have access to the index of that button
    
        // if game is still in play finished will be false
        // on click finished will be true
        // so if finished, 
        //   a selected button that is correct will be 'answer-btn selected correct'
        //   a selected button that is incorrect will be 'answer-btn selected incorrect'
        //   a button that is not selected will be 'answer-btn' // ! duplicated
        // if NOT finished
        //   a selected button will be 'answer-btn selected'
        //   a button not selected will still just be 'answer-btn' // ! duplicated

        if (finished) {
            // selected and correct
            if (index === selectedAnswer && selectedAnswer === correctAnswerIndex) {
                classNames = 'answer-btn selected correct';
            // selected and incorrect
            } else if (index === selectedAnswer && selectedAnswer !== correctAnswerIndex) {
                classNames = 'answer-btn selected incorrect';
            } else {
                classNames = 'answer-btn';
            }
        } else {
            if (index === selectedAnswer) {
                classNames = 'answer-btn selected';
            } else {
                classNames = 'answer-btn'
            }
        }
        
        return classNames;
    }
    

    // loop through the answers and style the one that is selected
    // set the selected answer on click
    let btns = [];
    for (let i = 0; i < shuffledAnswers.length; i++) {
        btns.push(
            <button 
            key={`answer${i}`} 
            className={applyClassNames(i)} 
            onClick={() => handleClick(i)} 
            >
                {decodeText(shuffledAnswers[i])}
            </button>
        )
    };

    return (
        <div>
            <h3>{decodeText(questionData.question)}</h3>

            <div className="answers-container">
                {btns}
            </div>

        </div>
    )
}