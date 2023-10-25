import React from "react";
import {decode} from 'html-entities';

export default function Answer(props) {

    console.log('Answer props: ',props);

    return (
        <label>
            <input className="btn answer-btn" name="myInput" type="radio" value={props.value} onChange={() => props.phoneHome(props.value)}/> {decode(props.value, { level: 'html5' }) }
        </label>
    )
}