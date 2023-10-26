import React from "react";
import {decode} from 'html-entities';
// import Answer from "./Answer";

export default function Question(props) {

    const question = props.question;
    console.log('Question: ', question);

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
            
            <h3 className="question">Question</h3>
            
            <div className="answers-container">
                <label htmlFor="answer">
                    <input type="radio" id="answer" name="question" value="answer" /> Answer
                </label>
            </div>
            <hr/>
        </div>
    )
}