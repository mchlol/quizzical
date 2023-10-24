import React from "react";
import {decode} from 'html-entities';

export default function Question(props) {

    const [question, setQuestion] = React.useState(props.questions);

    console.log('Questions question variable: ',question)

    return (
        <div className="flex-centered">

            <h3 className="question">{decode(question.question, {level: 'html5'})}</h3>

            <div>
                <button>{decode(question.correct_answer, {level: 'html5'})}</button>
                <button>{decode(question.incorrect_answers[0], {level: 'html5'})}</button>
                <button>{decode(question.incorrect_answers[1], {level: 'html5'})}</button>
                <button>{decode(question.incorrect_answers[2], {level: 'html5'})}</button>
            </div>

            <hr/>

        </div>
    )
}