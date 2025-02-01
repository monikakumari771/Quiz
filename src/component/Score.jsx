import React from "react";

function Score({ score, totalQuestions }) {
  return (
    <>
      <div className="wrapper position-relative">
        <div className="wizard-content-1 clearfix">
          <div className="step-inner-content clearfix position-relative">
            <div className="form-area position-relative">
              <div className="wizard-forms">
                <div className="quiz-option-selector">
                  <div className="thankyou-msg text-center">
                    <img src="assets/img/th.png" alt="" />
                    <p>Your submission has been received</p>
                    <h2>Thankyou For you Response!</h2>
                    <p>Your final score is:</p>
                    <h3>
                      {score} / {totalQuestions * 4} points
                    </h3>
                    <button
                      onClick={() => window.location.reload()}
                      className="js-btn-next"
                    >
                      Restart Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Score;
