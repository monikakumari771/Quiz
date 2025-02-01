import React, { useEffect, useState } from "react";
import Score from "./Score";

function Question({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [showExplanation, setShowExplanation] = useState(false); // Track if explanation is shown
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Track quiz completion
  const questions = data?.questions || [];
  const currentQuestion = questions[currentIndex];

  const handleNext = (event) => {
    event.preventDefault();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null); // Reset selection for the next question
      setShowExplanation(false); // Hide explanation for the next question
    } else {
      setIsQuizCompleted(true); // Mark the quiz as completed
    }
  };

  useEffect(() => {
    if (currentIndex + 1 === questions?.length) {
      setIsQuizCompleted(true);
    }
  }, [currentIndex]);

  const handleOptionSelect = (isCorrect, index) => {
    if (selectedOption === null) {
      setSelectedOption(index); // Mark the selected option
      if (isCorrect) {
        setScore((prevScore) => prevScore + 4);
        setShowExplanation(false); // Hide explanation for correct answers
      } else {
        setScore((prevScore) => prevScore - 1);
        setShowExplanation(true); // Show explanation for incorrect answers
      }
    }
  };

  return (
    <div className="quiz-container">
      {!isQuizCompleted ? (
        <div
          className="multisteps-form__panel js-active"
          data-animation="fadeIn"
        >
          {currentQuestion && (
            <div className="wizard-forms clearfix position-relative">
              <div className="quiz-title text-center">
                <span>Question {currentIndex + 1}</span>
                <h2>{currentQuestion?.topic}</h2>
                <p>{currentQuestion.description}</p>
              </div>
              <div className="quiz-option-selector clearfix">
                <ul>
                  {currentQuestion.options?.map((option, index) => (
                    <li key={index}>
                      <label
                        className={`start-quiz-item ${
                          selectedOption === index
                            ? option.is_correct
                              ? "correct"
                              : "incorrect"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`quiz-${currentIndex}`}
                          value={option.description}
                          className="exp-option-box"
                          onClick={() =>
                            handleOptionSelect(option.is_correct, index)
                          }
                          disabled={selectedOption !== null} // Disable input after selection
                        />
                        <span className="exp-number text-uppercase">
                          {index + 1}
                        </span>
                        <span className="exp-label">{option.description}</span>
                        <span className="checkmark-border"></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {showExplanation && currentQuestion.detailed_solution && (
                <div className="explanation-area text-center">
                  <p className="explanation-text">
                    <strong>Explanation:</strong>{" "}
                    {currentQuestion.detailed_solution}
                  </p>
                </div>
              )}
              <div className="quiz-progress-area">
                <div className="progress">
                  <div
                    className="progress-bar position-relative"
                    style={{
                      width: `${
                        ((currentIndex + 1) / questions.length) * 100
                      }%`,
                    }}
                  >
                    <span>
                      {Math.round(
                        ((currentIndex + 1) / questions.length) * 100
                      )}
                      % complete, keep it up!
                    </span>
                  </div>
                </div>
              </div>
              <div className="actions clearfix">
                <ul>
                  <li>
                    <button
                      className="js-btn-next"
                      onClick={handleNext}
                      disabled={currentIndex === questions.length - 1}
                    >
                      {currentIndex === questions.length - 1
                        ? "Finish Quiz"
                        : "Next Question"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Score score={score} totalQuestions={questions.length} />
      )}
    </div>
  );
}

export default Question;
