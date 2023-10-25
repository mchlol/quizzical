import React from "react";
import {decode} from 'html-entities';
import { nanoid } from "nanoid";
import Answer from "./Answer";

export default function Question(props) {

    const question = props.questions.question;
    const correctAnswer = props.questions.correct_answer;
    const [answers, setAnswers] = React.useState([]);
    // const [selected, setSelected] = React.useState(null);

    function shuffleAnswers(incorrectArr, correct) {
        // get the array of incorrect answers and the correct answers
        // get a random number from 0 - 4
        // use toSpliced to insert correct answer at the random index
        const correctIndex = Math.floor(Math.random() * 4);
        const newArr = incorrectArr.toSpliced(correctIndex, 0, correct);
        // const object = {
        //     correctIndex: correctIndex,
        //     correctAnswer: correctAnswer,
        //     array: newArr
        // };

        // return object;
        return newArr;
    }

    React.useEffect( () => {
        const shuffled = shuffleAnswers(props.questions.incorrect_answers, correctAnswer);
        setAnswers(shuffled);
    },[]);

    function decodeText(text) {
        return decode(text, {level: 'html5' });
    }

    function createElements(arr) {
        const els = arr.map(item => <Answer key={nanoid()} value={item} phoneHome={() => props.phoneHome(item)} />)
        return els;
    }

    const elements = createElements(answers);

    console.log('Question props: ',props);

    return (
        <label key={nanoid()} className="flex-centered" htmlFor="question1">

            <h3 className="question">{decodeText(question)}</h3>

            <div className="answers-container">
                {elements}
            </div>
            

            <hr/>

        </label>
    )
}