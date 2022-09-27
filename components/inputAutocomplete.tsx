import { useState, KeyboardEvent } from "react";
import { IInputProps } from "../models/inputProps";
import styles from './inputAutocomplete.module.scss';


export default function InputAutocomplete({suggestions, placeholder, onClickFlightReference}: IInputProps) {
    
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter((suggestion: string ) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  };

  function onClick(suggestion: string) {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(suggestion);
    onClickFlightReference(suggestion);
  };

  function onKeyDown(e: KeyboardEvent) {
    const filterSuggestions = filteredSuggestions;
    // User pressed the enter key
    if (e.key === "13") {
        setActiveSuggestion(0);
        setShowSuggestions(false);
        setUserInput(filterSuggestions[activeSuggestion]);  
    }
    // User pressed the up arrow
    else if (e.key === "38") {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.key === "40") {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className={styles.suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestionActive";
              }
              return (
                <li className={className} key={suggestion} onClick={() => onClick(suggestion)}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className={styles.noSuggestions}>
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <>
        <input
          className={styles.inputAutocomplete}
          type="text"
          onChange={onChange}
          onKeyDown={(event) => onKeyDown(event)}
          value={userInput}
          placeholder = {placeholder}
        />
        {suggestionsListComponent}
      </>
      );
  };