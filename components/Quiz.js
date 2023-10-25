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

    function handleSubmit(e) {
        e.preventDefault();
    }

    // test child component returning info to the parent - passed as onClick 
    function phoneHome(arg) {
        console.log('Phoned home : ',arg);
        // * this could be used to return a boolean if the user clicked the right answer
    }

    function createElements(objs) {
        // loop over the objects
        // create a Question component for each one
        // add a key 
        // add a questions prop that passes the whole object eg questions[0]
        // add a callback (phone home)
        // console.log('Quiz: objs: ',objs);

        const elements = objs.map(obj => <Question key={nanoid()} questions={obj} phoneHome={phoneHome} />
        )

        return elements;
    }

    const elements = createElements(questions);

    return (

        <form className="questions-container flex-centered"
        onSubmit={handleSubmit}>
            {elements}
            <br />
            <button className="btn action-btn">Check answers</button>
        </form>
    )
}