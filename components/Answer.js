import React from "react";
import {decode} from 'html-entities';

export default function Answer(props) {

    const [selected, setSelected] = React.useState(null);

    console.log('Answer props: ',props);

    // pass selected back to the question component
    
    React.useEffect( () => {
        console.log(selected);
        props.phoneHome(selected);
    }, [selected])

    return (
        <label htmlFor={props.value}>
            <input 
                className="btn answer-btn" 
                name={props.value} 
                type="radio" 
                value={props.value} 
                onChange={() => setSelected(props.value)} 
            /> {decode(props.value, { level: 'html5' })}

        </label>
    )
}