import React from "react";
import { decodeText } from './utils.js'

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
        let classNames;
        
        if (finished) {
            // selected and correct OR just the correct answer
            if (index === selectedAnswer && selectedAnswer === correctAnswerIndex || index === correctAnswerIndex) {
                classNames = 'answer-btn selected correct';
            // selected and incorrect
            } else if (index === selectedAnswer && selectedAnswer !== correctAnswerIndex) {
                classNames = 'answer-btn selected incorrect';
            } else {
                classNames = 'answer-btn finished';
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