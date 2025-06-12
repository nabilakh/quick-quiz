import { useState } from "react";
import WelcomePage from "./component/WelcomePage";
import { PageContext } from "./store/context";
import Quiz from "./component/Quiz";
import FinalPage from "./component/FinalPage";
import { quizQuestions } from "./data/questions";

function App() {
  const [name, setName] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState([]);

  return (
    <PageContext.Provider value={{ name, questionAnswer }}>
      {name === "" ? (
        <WelcomePage setName={setName} />
      ) : questionAnswer.length === quizQuestions.length ? (
        <FinalPage />
      ) : (
        <Quiz setQuestionAnswer={setQuestionAnswer} />
      )}
    </PageContext.Provider>
  );
}

export default App;
