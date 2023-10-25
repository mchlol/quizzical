import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(props) {

    const [questions, setQuestions] = React.useState(props.questions);
    // ? value on mount and setter value are the same, doesn't seem right
    React.useEffect( () => {
        setQuestions(props.questions);
        // questions here is an array of objects as returned from the API
    },[]);

    // test child component returning info to the parent - passed as onClick 
    function phoneHome(arg) {
        console.log('Passed back from question component: ',arg);
        // * this could be used to return a boolean if the user clicked the right answer
    }

    // create five question components with key, questions prop and function callback prop to send the results back from the question components to the quiz component to check if user is correct

    function createElements(objs) {
        // loop over the objects
        // create a Question component for each one
        // add a key 
        // add a questions prop that passes the whole object eg questions[0]
        // add a callback (phone home)
        console.log('objs: ',objs)
    }

    createElements(questions);

    return (

        <div className="questions-container flex-centered">
            <Question key={nanoid()} questions={questions[0]} phoneHome={phoneHome} />
            <br />
            <button className="btn action-btn">Check answers</button>
        </div>
        
    )
}