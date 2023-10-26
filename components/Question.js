import React from "react";
import {decode} from 'html-entities';
// import Answer from "./Answer";

export default function Question(props) {

    const [question, setQuestion] = React.useState(props.question);
    const [shuffled, setShuffled] = React.useState(shuffleAnswers(question.incorrect_answers, question.correct_answer));

    // TODO: for debugging only - remove before build
    // React.useEffect( () => {
    //     console.log('Question: ', question);
    //     console.log('Correct: ', correct);
    //     console.log('Shuffled: ', shuffled);

    // }, [question]);

    // TODO: move 2 functions below into a utils file
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
                <label className="btn answer-btn" htmlFor={shuffled[0]}>
                    <input type="radio" id={shuffled[0]} name={question.question} value={shuffled[0]} defaultChecked={true}/> {decode(shuffled[0])}
                </label>

                <label className="btn answer-btn" htmlFor={shuffled[1]}>
                    <input type="radio" id={shuffled[1]} name={question.question} value={shuffled[1]} /> {decode(shuffled[1])}
                </label>

                <label className="btn answer-btn" htmlFor={shuffled[2]}>
                    <input type="radio" id={shuffled[2]} name={question.question} value={shuffled[2]} /> {decode(shuffled[2])}
                </label>

                <label className="btn answer-btn" htmlFor={shuffled[3]}>
                    <input type="radio" id={shuffled[3]} name={question.question} value={shuffled[3]} /> {decode(shuffled[3])}
                </label>
            </div>

            <hr/>
        </div>
    )
}