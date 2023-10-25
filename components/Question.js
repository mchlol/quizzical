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

    React.useEffect( () => {
        const shuffled = shuffleAnswers(props.questions.incorrect_answers, correctAnswer);
        console.log(correctAnswer);
        console.log(shuffled);
        setAnswers(shuffled); // set answers to the shuffled array
    },[]);

    function decodeText(text) {
        return decode(text, {level: 'html5' });
    }

    // create inputs
    function createElement(question, item) {
        return (
        <label htmlFor={question}>
            <input type="radio" name={question} value={item} id={item} /> {item}
        </label>
        )
    }

    /*
    function createElements(arr) {
        const els = arr.map(item => <Answer key={nanoid()} value={item} phoneHome={props.phoneHome} />)
        return els;
    }

    const elements = createElements(answers);
    */

    // console.log('Question props: ',props);

    return (
        <div>
            <label key={nanoid()} className="flex-centered" htmlFor="question1">
                <h3 className="question">{decodeText(props.questions.question)}</h3>
            </label>
            <div className="answers-container">
                {createElement(props.questions.question, answers[0])}
                {createElement(props.questions.question, answers[1])}
                {createElement(props.questions.question, answers[2])}
                {createElement(props.questions.question, answers[3])}

            </div>
            <hr/>
        </div>
    )
}