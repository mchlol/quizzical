import React from "react";
import Question from "./Question";

export default function Quiz(props) {

    const questions = props.questions;
    

    // copy the object with a new property
    // TODO: look into why this can't be done
    // const [question0, setQuestion0] = React.useState( { ...questions[0], key: "value" });

    // TODO: if these won't be used, remove before build
    // const [question0, setQuestion0] = React.useState(questions[0]);
    // const [question1, setQuestion1] = React.useState(questions[1]);
    // const [question2, setQuestion2] = React.useState(questions[2]);
    // const [question3, setQuestion3] = React.useState(questions[3]);
    // const [question4, setQuestion4] = React.useState(questions[4]);

    // console.table('Question0: ', question0)

    const [quizAnswers, setQuizAnswers] = React.useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        // returns question: answer key value pairs as strings only - no other info
        setQuizAnswers(formJson);
        // console.log('quizAnswers: ', quizAnswers);

    } // handleSubmit

    function checkAnswers(data) {
        
        // extract all the correct answers from each question object
        const correctAnswers = [];
        for (const question of questions) {
            correctAnswers.push(question.correct_answer);
        }
        // store the user answers returned from the from
        const userAnswers = Object.values(data);

        console.log('User answers: ',userAnswers)
        // console.log('Correct answers: ', correctAnswers);

        // loop through the user answers and compare to the correct answers
        const results = [];
        for (let i = 0; i < userAnswers.length; i++) {
            userAnswers[i] === correctAnswers[i]
            ? results.push(true)
            : results.push(false)
        };

        console.log('Results: ', results);
        // return an array of booleans in each corresponding position
        return results;

    }

    React.useEffect( () => {
        checkAnswers(quizAnswers);
    }, [quizAnswers]);


    return (

        <form 
        className="questions-container flex-centered"
        onSubmit={handleSubmit}>

            <Question question={questions[0]} />
            <Question question={questions[1]} />
            <Question question={questions[2]} />
            <Question question={questions[3]} />
            <Question question={questions[4]} />


            <button className="btn action-btn">Check answers</button>

        </form>
    )
}