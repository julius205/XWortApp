import LetterInput from "../components/LetterInput";
import React, { useEffect, useRef, useState } from "react";

const Play = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [inputState, setInputState] = useState("waiting");
  const [userInput, setUserInput] = useState(Array(answer.length).fill(""));
  const [initialLetters, setInitialLetters] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const inputRefs = useRef([]);
  const apiUrl = process.env.API_URL;

  useEffect(() => {
    calculateInitialLetters();
  }, [answer]);

  const calculateInitialLetters = () => {
    if (answer.length > 0) {
      const initialInput = Array(answer.length).fill("");
      let numInitialLetters = 0;
      if (difficulty === "leicht") {
        if (answer.length <= 3) {
          numInitialLetters = 1;
        } else if (answer.length >= 4 && answer.length < 6) {
          numInitialLetters = 3;
        } else if (answer.length >= 6 && answer.length < 8) {
          numInitialLetters = 4;
        } else if (answer.length >= 8) {
          numInitialLetters = 5;
        }
      } else if (difficulty === "mittel") {
        if (answer.length >= 5 && answer.length < 7) {
          numInitialLetters = 2;
        } else if (answer.length >= 7) {
          numInitialLetters = 3;
        }
      } else if (difficulty === "schwer") {
        if (answer.length >= 6) {
          numInitialLetters = 1;
        }
      }
      const initialLetterIndices = [];
      for (let i = 0; i < numInitialLetters; i++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * answer.length);
        } while (initialLetterIndices.includes(randomIndex));
        initialLetterIndices.push(randomIndex);
        initialInput[randomIndex] = answer[randomIndex];
      }
      setInitialLetters(initialLetterIndices);
      setUserInput(initialInput);
    }
  };

  const fetchNewQuestion = () => {
    console.log("versuche frage zu holen");
    setInputState("waiting");
    fetch(`/api/randomQuestion`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Hole Frage aus der API");
        console.log("kreuzwortdata: ", data.kreuzwort);
        // Daten erfolgreich erhalten, setze Frage und Antworten
        setQuestion(data.kreuzwort.frage);
        // Wähle einen zufälligen Eintrag aus den Antworten
        const randomIndex = Math.floor(
          Math.random() * data.kreuzwort.antworten.length
        );
        console.log("frage aus db: ", data.kreuzwort.frage);
        setAnswer(data.kreuzwort.antworten[randomIndex]);
        // Initialisiere userInput mit der gleichen Länge wie die Antwort, gefüllt mit leeren Strings
        setUserInput(
          Array(data.kreuzwort.antworten[randomIndex].length).fill("")
        );
        const searchParams = new URLSearchParams(location.search);
        const difficultyParam = searchParams.get("difficulty");
        setDifficulty(difficultyParam);
        console.log("Frage geholt: ", question);
      })
      .catch((error) => {
        console.error("Error fetching random question:", error);
        setError("Error fetching random question");
      });
  };

  const handleInputChange = (index, value) => {
    // Wenn das Input-Feld deaktiviert ist (InitialLetter), beende die Funktion
    if (initialLetters.includes(index)) {
      return;
    }

    // Setze den eingegebenen Buchstaben im aktuellen Input-Feld
    const newUserInput = [...userInput];
    newUserInput[index] = value;
    setUserInput(newUserInput);

    // Fokussiere das nächste leere Input-Feld
    for (let i = index + 1; i < userInput.length; i++) {
      if (userInput[i] === "") {
        inputRefs.current[i]?.focus();
        break;
      }
    }

    // Überprüfe, ob alle Felder ausgefüllt sind
    const allFieldsFilled = newUserInput.every((input) => input !== "");

    // Überprüfe, ob das Wort korrekt ist
    if (allFieldsFilled) {
      if (newUserInput.every((input, i) => input === answer[i])) {
        setInputState("right");
      } else {
        setInputState("wrong");
      }
    } else {
      setInputState("waiting");
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && !userInput[index]) {
      // Überprüfe, ob das vorherige Feld ein Initialletter ist
      let previousIndex = index - 1;
      while (previousIndex >= 0) {
        if (!initialLetters.includes(previousIndex)) {
          inputRefs.current[previousIndex].focus();
          break;
        }
        previousIndex--;
      }
    }
  };

  const createRef = () => {
    inputRefs.current.push(React.createRef());
  };

  const handleNewQuestion = () => {
    fetchNewQuestion();
  };

  const handleClickShowAnswers = () => {
    setUserInput(answer.split(""));
    setInputState("right");
  };

  const getContainerClassname = () => {
    let containerClassname = "";
    if (answer.length < 4) {
      containerClassname = "flex flex-col -mt-[6px]";
    } else if (answer.length === 4) {
      containerClassname = "flex flex-row mt-20";
    } else if (4 < answer.length && answer.length < 9) {
      containerClassname = "grid grid-cols-4 grid-rows-4 mt-[5px]";
    } else if (answer.length >= 9) {
      containerClassname = "grid grid-cols-4 grid-rows-4 -mt-[40px]";
    }
    containerClassname += " input-grid";
    return containerClassname;
  };

  return (
    <div className="iphone-7-container flex flex-col items-center justify-center h-screen">
      <div className="content-top bg-transparent">
        <h1 className="sm:text-3xl text-xl text-center font-extrabold mb-4">
          {question}
        </h1>
        <p className="mb-8 text-center font-semibold text-lg bg-transparent">
          ({answer.length} Buchstaben)
        </p>
      </div>
      <div
        className={`mt-12 main-content max-w-md bg-transparent ${getContainerClassname()}`}
      >
        {answer.split("").map((letter, index) => (
          <LetterInput
            key={index}
            value={userInput[index]}
            onChange={(value) => handleInputChange(index, value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            ref={(ref) => {
              if (ref && !inputRefs.current.includes(ref)) {
                inputRefs.current[index] = ref;
              }
            }}
            inputState={inputState}
            isInitialLetter={initialLetters.includes(index)}
          />
        ))}
      </div>
      <div className="buttons flex flex-col">
        <button
          onClick={handleNewQuestion}
          className="newGameBtn bg-[#322E38] hover:bg-stone-800 text-white font-bold py-3 px-4 mb-5 rounded-2xl text-2xl"
        >
          Neue Frage
        </button>
        <button
          onClick={handleClickShowAnswers}
          className="showAnswersBtn bg-[#853a3a] hover:bg-red-900 text-white font-bold py-3 px-4 rounded-2xl text-2xl"
        >
          Antwort zeigen
        </button>
      </div>
    </div>
  );
};

export default Play;
