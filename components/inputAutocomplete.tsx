import React, { KeyboardEvent } from 'react';
import styles from './inputAutocomplete.module.scss';
import cn from 'classnames';

type InputProps = {
  suggestions: string[];
  id: string;
};

export default function InputAutocomplete({ suggestions, id }: InputProps) {
  const [activeSuggestion, setActiveSuggestion] = React.useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [userInput, setUserInput] = React.useState('');

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion: string) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  }

  function onClick(suggestion: string) {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(suggestion);
  }

  function onKeyDown(e: KeyboardEvent) {
    const actSuggestion = activeSuggestion;
    const filterSuggestions = filteredSuggestions;
    // User pressed the enter key
    if (e.key === '13') {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filterSuggestions[activeSuggestion]);
    }
    // User pressed the up arrow
    else if (e.key === '38') {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.key === '40') {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  }

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className={styles.suggestions}>
          {filteredSuggestions.map((suggestion, index) => {
            return (
              <li
                className={cn({ [styles.suggestionActive]: index === activeSuggestion })}
                key={suggestion}
                onClick={() => onClick(suggestion)}
              >
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
    <div>
      <input
        className={styles.inputAutocomplete}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        id={id}
      />
      {suggestionsListComponent}
    </div>
  );
}
