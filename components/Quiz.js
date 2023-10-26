import React from "react";
import Question from "./Question";

export default function Quiz(props) {

    const questions = props.questions;
    console.log('Quiz questions: ', questions); // an array of objects

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
    }

    // create a Question element (component), where props will be a single question object

    return (

        <form 
        className="questions-container flex-centered"
        onSubmit={handleSubmit}>

            <Question question={questions[0]}/>

            <button className="btn action-btn">Check answers</button>

        </form>
    )
}