import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(props) {

    const questions = props.questions;

    return (

        <div className="questions-container flex-centered">
            <Question key={nanoid()} questions={questions[0]}/>
            <Question key={nanoid()} questions={questions[1]}/>
            <Question key={nanoid()} questions={questions[2]}/>
            <Question key={nanoid()} questions={questions[3]}/>
            <Question key={nanoid()} questions={questions[4]}/>
            <br />
            <button className="btn action-btn">Check answers</button>
        </div>
        
    )
}