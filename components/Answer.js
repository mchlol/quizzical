import React from "react";
// import {decode} from 'html-entities';

export default function Answer(props) {
    return (
        <label>
            <input className="btn answer-btn" name="myInput" type="radio" value={props.value}/> {props.value}
        </label>
    )
}