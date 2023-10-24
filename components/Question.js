import React from "react";
import {decode} from 'html-entities';
import { nanoid } from "nanoid";

export default function Question(props) {

    const question = props.questions;
    const correctAnswer = props.questions.correct_answer;
    const [answers, setAnswers] = React.useState([]);

    React.useEffect( () => {
        setAnswers(shuffleAnswers(props.questions.incorrect_answers, props.questions.correct_answer))
    },[]);

    

    function shuffleAnswers(incorrectArr, correct) {
        // get the array of incorrect answers and the correct answers
        // get a random number from 0 - 4 
        // use toSpliced to insert correct answers at index random
        const randomNum = Math.floor(Math.random() * 4);
        const newArr = incorrectArr.toSpliced(randomNum, 0, correct);
        const object = {
            correctIndex: randomNum,
            correctAnswer: correctAnswer,
            array: newArr
        };

        return object;
    }

    function getAnswerElements(answers) {
        for (const key in answers) {
            console.log(`${key}: ${answers[key]}`)
        }
    }

    getAnswerElements(answers);

    return (
        <div className="flex-centered">

            <h3 className="question">{decode(question.question, {level: 'html5'})}</h3>

            <div className="answers-container">
                <button key={nanoid()} className="btn answer-btn selected">{decode(question.correct_answer, {level: 'html5'})}</button>
                <button key={nanoid()} className="btn answer-btn">{decode(question.incorrect_answers[0], {level: 'html5'})}</button>
                <button key={nanoid()} className="btn answer-btn">{decode(question.incorrect_answers[1], {level: 'html5'})}</button>
                <button key={nanoid()} className="btn answer-btn">{decode(question.incorrect_answers[2], {level: 'html5'})}</button>
            </div>

            <hr/>

        </div>
    )
}