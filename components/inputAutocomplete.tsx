import { useState, KeyboardEvent } from 'react';
import { IInputProps } from '../models/inputProps';
import styles from './inputAutocomplete.module.scss';
import cn from 'classnames';
import { ICity } from '../models/FlightSearchData';

export default function InputAutocomplete({
  suggestions,
  placeholder,
  onClickFlightReference,
  loading,
  inputClasses = [],
}: IInputProps) {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<ICity[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    // const filteredSuggestions = suggestions.filter(
    //   (suggestion: string) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    // );
    let filteredSuggestions: ICity[] = [];
    if (suggestions) {
      filteredSuggestions = suggestions.filter(
        (suggestion: ICity) => suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
      );
    }

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  }

  function onSelectItem(suggestion: string) {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(suggestion);
    onClickFlightReference(suggestion);
  }

  function onKeyDown(e: KeyboardEvent) {
    const filterSuggestions = filteredSuggestions;
    // User pressed the enter key
    if (e.key === '13') {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filterSuggestions[activeSuggestion].name);
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
                key={suggestion.id}
                onClick={() => onSelectItem(suggestion.name)}
              >
                {suggestion.name}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className={styles.noSuggestions}>
          <em>No suggestions, you&apos;re on your own!</em>
        </div>
      );
    }
  }

  return (
    <div className={styles.inputAutocomplete}>
      <input
        className={cn(...inputClasses, { loading: loading })}
        type="text"
        onChange={onChange}
        onKeyDown={(event) => onKeyDown(event)}
        value={userInput}
        placeholder={placeholder}
        disabled={loading}
      />
      {suggestionsListComponent}
    </div>
  );
}
