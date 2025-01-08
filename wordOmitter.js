import React, { useState } from "react";

const OMITTED_WORDS = ["a", "the", "and", "or", "but"];

function WordOmitter() {
    const [inputText, setInputText] = useState("");
    const [omitWords, setOmitWords] = useState(true);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        //omit words when typing
        getProcessedText()
    };

    const toggleOmitWords = () => {
        setOmitWords(!omitWords);
    };

    const clearFields = () => {
        setInputText("")
    };

    const getProcessedText = () => {
        if (omitWords) {
            const wordSet = new Set(OMITTED_WORDS);
            let processedText = inputText
                .split(/\s+/)  // Split by whitespace
                .filter(word => !wordSet.has(word.toLowerCase()))  // Remove words in the set
                .join(" ");  // Join the words back into a string
            return processedText.trim();
        }
        else {

            return inputText;
        }
    };

    return (
        <div className="omitter-wrapper">
            <textarea
                placeholder="Type here..."
                value={inputText}
                onChange={handleInputChange}
                data-testid="input-area"
            />
            <div>
                <button onClick={toggleOmitWords} data-testid="action-btn">
                    {omitWords ? "Show All Words" : "Omit Words"}
                </button>
                <button onClick={clearFields} data-testid="clear-btn">
                    Clear
                </button>
            </div>
            <div>
                <h2>Output:</h2>
                <p data-testid="output-text">{getProcessedText()}</p>
            </div>
        </div>
    );
}

export { WordOmitter };