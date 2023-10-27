import React from "react";
import {decode} from 'html-entities';
// import Answer from "./Answer";

export default function Question(props) {

    const [question, setQuestion] = React.useState(props.question);
    const [shuffled, setShuffled] = React.useState(shuffleAnswers(question.incorrect_answers, question.correct_answer)); 
    const [correct, setCorrect] = React.useState(question.correct_answer); // the correct answer string
    const [correctIndex, setCorrectIndex] = React.useState(shuffled.indexOf(correct)); // index of the correct answer in the shuffled array


    // TODO: utils
    function shuffleAnswers(incorrectArr, correct) {
        /* 
        get the array of incorrect answers and the correct answers
        get a random number from 0 - 4
        use toSpliced to insert correct answer at the random index */
        const correctIndex = Math.floor(Math.random() * 4);
        const newArr = incorrectArr.toSpliced(correctIndex, 0, correct);

        return newArr;
    }

    function decodeText(text) {
        return decode(text, {level: 'html5' });
    }


    return (
        <div>
            
            <h3 className="question">{decodeText(question.question)}</h3>
            
            <div className="answers-container">

                <span>
                {/* // ! ids need unique names in case 2 questions have the same options */}
                    <input type="radio" id={shuffled[0]} name={question.question} value={shuffled[0]} onChange={() => setChoiceIndex(0, props.id)} /> 
                    <label htmlFor={shuffled[0]}> {decode(shuffled[0])} </label>
                </span>

                <span>
                    <input type="radio" id={shuffled[1]} name={question.question} value={shuffled[1]} onChange={() => setChoiceIndex(1, props.id)} /> 
                    <label htmlFor={shuffled[1]}> {decode(shuffled[1])} </label>
                </span>

                <span>
                    <input type="radio" id={shuffled[2]} name={question.question} value={shuffled[2]} onChange={() => setChoiceIndex(2, props.id)} /> 
                    <label htmlFor={shuffled[2]}> {decode(shuffled[2])}</label>
                </span>

                <span>
                    <input type="radio" id={shuffled[3]} name={question.question} value={shuffled[3]} onChange={() => setChoiceIndex(3, props.id)} />
                    <label htmlFor={shuffled[3]}>
                     {decode(shuffled[3])}
                </label>
                </span>
            </div>
            
            <hr/>
        </div>
    )
}