import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(props) {

    const questions = props.questions; // data returned from the API

    const [quizAnswers, setQuizAnswers] = React.useState([]); // data returned from the form - an object that contains only question/user answer pairs
    const [questionIds, setQuestionIds] = React.useState([
        nanoid(), nanoid(), nanoid(), nanoid(), nanoid()
    ]) // five unique ids in order for each question // ? how are these useful?


    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        const formJson = Object.fromEntries(formData.entries());
        console.log('Quiz: formJson ',formJson);

        // set the form data in state
        setQuizAnswers(formJson); // gets the question and the user answer

        // checks the answers
        const results = checkAnswers(quizAnswers);
        console.log('Results from form submit: ', results)

        // TODO: render the score at the bottom
        // TODO: render a new button that says play again and triggers a re-render of the quiz component with new questions

    } // handleSubmit

    function checkAnswers(data) {
        
        // extract all the correct answers from each question object
        const correctAnswers = [];
        for (const question of questions) {
            correctAnswers.push(question.correct_answer);
        }

        const correctIndexes = [];
        // loop through each question
        // return the index of the correct question in the shuffled array
        // return the index of the user answer in the shuffled array
        // ! the shuffled array only exists in the Question component

        // store the user answers returned from the form
        const userAnswers = Object.values(data);

        console.log('Quiz: userAnswers: ',userAnswers); // an array of strings

        // loop through the user answers and compare to the correct answers
        const results = []; // will be an array of booleans
        for (let i = 0; i < userAnswers.length; i++) {
            userAnswers[i] === correctAnswers[i]
            ? results.push(true)
            : results.push(false)
        };

        // we need more info - the index of the correct answer AND the index of the answer the user chose

        // ! Validate: check if all the questions were answered & early return - where does this need to happen?

        return results;

    } // checkAnswers



    return (

        <form 
        className="questions-container flex-centered"
        onSubmit={handleSubmit}>

            <Question question={questions[0]} id={questionIds[0]} />
            <Question question={questions[1]} id={questionIds[1]} />
            <Question question={questions[2]} id={questionIds[2]} />
            <Question question={questions[3]} id={questionIds[3]} />
            <Question question={questions[4]} id={questionIds[4]} />


            <button className="btn submit-btn">Check answers</button>

        </form>
    )
}