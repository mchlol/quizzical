import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(props) {

    const questions = props.questions; // data returned from the API

    const [quizAnswers, setQuizAnswers] = React.useState([]); // data returned from the form - an object that contains only question/user answer pairs
    const [questionIds, setQuestionIds] = React.useState([
        nanoid(), nanoid(), nanoid(), nanoid(), nanoid()
    ]) // five unique ids in order for each question // ? how are these useful?

    const [choiceData, setChoiceData] = React.useState({});

    React.useEffect( () => {
        console.log('Quiz: choiceData: ',choiceData);
    },[choiceData])


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
        // render the score at the bottom
        // render a new button that says play again and triggers a re-render of the quiz component with new questions

        console.log('Results from form submit: ', results)

    } // handleSubmit

    function checkAnswers(data) {
        
        // extract all the correct answers from each question object
        const correctAnswers = [];
        for (const question of questions) {
            correctAnswers.push(question.correct_answer);
        }

        // ! check if all the questions were answered 

        // store the user answers returned from the form
        const userAnswers = Object.values(data);

        console.log('Quiz: userAnswers: ',userAnswers); // an array of strings

        // loop through the user answers and compare to the correct answers
        const results = [];
        for (let i = 0; i < userAnswers.length; i++) {
            userAnswers[i] === correctAnswers[i]
            ? results.push(true)
            : results.push(false)
        };

        // return an array of booleans in each corresponding position
        // we need more info - the correct answer AND the answer the user chose
        return results;

    } // checkAnswers


    // a phone home function for the child component to send back data

    function sendChoices(questionId, correctIndex, choiceIndex) {
        
        const object = {
            questionId,
            correctIndex,
            choiceIndex
        }

        // ! answers have to be selected in the correct order
        setChoiceData( prev => {
            return [
                ...prev,
                object
            ]
        })

        console.log('Quiz: sendChoices: ', object)
    }


    return (

        <form 
        className="questions-container flex-centered"
        onSubmit={handleSubmit}>

            <Question question={questions[0]} id={questionIds[0]} sendChoices={sendChoices}/>
            <Question question={questions[1]} id={questionIds[1]} sendChoices={sendChoices} />
            <Question question={questions[2]} id={questionIds[2]} sendChoices={sendChoices} />
            <Question question={questions[3]} id={questionIds[3]} sendChoices={sendChoices} />
            <Question question={questions[4]} id={questionIds[4]} sendChoices={sendChoices} />


            <button className="btn submit-btn">Check answers</button>

        </form>
    )
}