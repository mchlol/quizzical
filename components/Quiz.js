import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(props) {

    const [questions, setQuestions] = React.useState(props.questions);

    return (
        <div>
            <Question key={nanoid()} questions={questions[0]}/>
            <Question key={nanoid()} questions={questions[1]}/>
            <Question key={nanoid()} questions={questions[2]}/>
            <Question key={nanoid()} questions={questions[3]}/>
            <Question key={nanoid()} questions={questions[4]}/>
        </div>
    )
}