import React from "react";
import {decode} from 'html-entities';
import { nanoid } from "nanoid";
import Answer from "./Answer";

export default function Question(props) {

    const correctAnswer = props.questions.correct_answer; // not decoded so string can be matched exactly

    const [answers, setAnswers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    function shuffleAnswers(incorrectArr, correct) {
        /* 
        get the array of incorrect answers and the correct answers
        get a random number from 0 - 4
        use toSpliced to insert correct answer at the random index */
        const correctIndex = Math.floor(Math.random() * 4);
        const newArr = incorrectArr.toSpliced(correctIndex, 0, correct);

        return newArr;
    }
    // * we need to track that correct index outside the function scope

    React.useEffect( () => {
        const shuffled = shuffleAnswers(props.questions.incorrect_answers, correctAnswer);
        console.log(correctAnswer);
        console.log(shuffled);
        setAnswers(shuffled); // set answers to the shuffled array
    },[]);

    function decodeText(text) {
        return decode(text, {level: 'html5' });
    }

    // * link a label to an input by using the same value for htmlFor on the label and id on the input


    return (
        <div>
            
                <h3 className="question">{decodeText(props.questions.question)}</h3>
            
            <div className="answers-container">
                <label htmlFor="answer0">
                    <input type="radio" id="answer0" name="answer0" /> {answers[0]}
                </label>


            </div>
            <hr/>
        </div>
    )
}