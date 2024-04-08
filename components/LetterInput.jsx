import React, { forwardRef } from "react";

const LetterInput = forwardRef(
  ({ value, onChange, onKeyDown, inputState }, ref) => {
    const handleChange = (e) => {
      const inputValue = e.target.value.toUpperCase().slice(0, 1);
      onChange(inputValue);
    };

    const inputClassName = `letter-input w-[5rem] h-[5rem] text-center border-4 text-5xl mb-1 mr-1 border-black ${
      inputState === "right"
        ? "border-green-400" // Grüne Border für den Zustand "right"
        : inputState === "wrong"
        ? "border-red-700" // Rote Border für den Zustand "wrong"
        : "" // Standard Border für den Zustand "waiting"
    }`;

    return (
      <div>
        <input
          type="text"
          maxLength="1"
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          ref={ref}
          className={inputClassName} // Verwende die dynamische CSS-Klasse
          disabled={inputState === "right"}
        />
        <p></p>
      </div>
    );
  }
);

LetterInput.displayName = "LetterInput";

export default LetterInput;
