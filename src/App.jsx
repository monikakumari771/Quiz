import { useEffect, useState } from "react";
import "./App.css";
import Question from "./component/Question";
import axios from "axios";
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // configure vite config since it gives  cors error so change endpoint
        const response = await axios.get("/api");

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="quiz-top-area text-center">
        <h1>{data?.title} Quiz</h1>
        <div className="quiz-countdown text-center ul-li"></div>
      </div>
      <div className="wrapper position-relative">
        <div className="wizard-content-1 clearfix">
          <div className="steps d-inline-block position-absolute clearfix">
            <ul className="tablist multisteps-form__progress">
              <li className="multisteps-form__progress-btn js-active current"></li>
              <li className="multisteps-form__progress-btn "></li>
              <li className="multisteps-form__progress-btn"></li>
              <li className="multisteps-form__progress-btn"></li>
              <li className="multisteps-form__progress-btn"></li>
            </ul>
          </div>
          <div className="step-inner-content clearfix position-relative">
            <div className="multisteps-form__form" id="wizard">
              <div className="form-area position-relative">
                <Question data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
