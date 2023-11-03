import React from "react";
import Quiz from "./Quiz";

export default function App() {

    const [start, setStart] = React.useState(false);

    return (
        <div>

            <svg className="blob-large" width="269" height="273" viewBox="0 0 269 273" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M62.9973 213.544C34.7091 183 -3.0943 153.931 0.760539 112.456C5.0272 66.5503 39.4419 26.7905 82.0069 9.01646C122.385 -7.84434 169.623 1.89353 205.409 27C235.535 48.1352 236.41 88.2738 245.729 123.878C255.758 162.2 282.109 202.96 260.089 235.929C237.126 270.308 188.579 275.581 147.519 270.918C111.906 266.873 87.3383 239.826 62.9973 213.544Z" fill="#FFFAD1"/>
            </svg>

            <svg className="blob-small" width="297" height="235" viewBox="0 0 297 235" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M143.448 4.90596C184.961 1.77498 231.243 -9.72149 261.306 19.1094C294.581 51.0203 304.282 102.703 291.701 147.081C279.767 189.18 242.745 220.092 200.821 232.476C165.528 242.902 133.567 218.605 99.8993 203.738C63.6625 187.737 15.3588 182.993 3.25932 145.239C-9.35799 105.868 16.7305 64.5881 45.9358 35.3528C71.2672 9.99541 107.727 7.60006 143.448 4.90596Z" fill="#DEEBF8"/>
            </svg>

    

        { 
            start 
            ? 
                <Quiz start={start} setStart={setStart}/>
            : 
                <div className="flex-centered">
                <h1>Quizzical</h1>
                <p>Test your knowledge!</p>
                <button className="submit-btn" onClick={() => setStart(true)}>
                        Start Quiz
                    </button>
                </div>
        }
            
        </div>
    )
}