import { useCallback, useContext, useState, useMemo } from "react";
import quizIcon from "../../public/quiz.png";
import { quizQuestions } from "../data/questions";
import ProgressBar from "./ProgressBar";
import { PageContext } from "../store/context";

export default function Quiz({ setQuestionAnswer }) {
  const { questionAnswer } = useContext(PageContext);
  const [resultAnswer, setResultAnswer] = useState("");
  const idxQuestion =
    resultAnswer === "" ? questionAnswer.length : questionAnswer.length - 1;

  const currentQuestion = quizQuestions[idxQuestion];

  const answerValidation =
    resultAnswer === "correct"
      ? "bg-[#79b844]"
      : resultAnswer === "wrong"
      ? "bg-[#e84b4b]"
      : "bg-[#FADC91]";

  function shuffleAnswer(question) {
    const data = [...question];
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }

    return data;
  }

  const shuffledAnswers = useMemo(() => {
    return shuffleAnswer(currentQuestion.answers);
  }, [currentQuestion.answers]);

  const handleAnswer = useCallback(
    function handleAnswer(value) {
      const isTimeout = value === "";

      if (isTimeout) {
        setQuestionAnswer((prev) => [...prev, ""]);
        return;
      }

      setResultAnswer("answered");
      setQuestionAnswer((prev) => [...prev, value]);

      setTimeout(() => {
        const isCorrect = value === quizQuestions[idxQuestion].answers[0];
        setResultAnswer(isCorrect ? "correct" : "wrong");

        setTimeout(() => {
          setResultAnswer("");
        }, 1000);
      }, 1000);
    },
    [idxQuestion, setQuestionAnswer],
  );

  return (
    <div className="flex flex-col items-center">
      <img src={quizIcon} className="mx-auto mt-11" width={70} />
      <h1 className="text-5xl mt-6 text-[#b06600] font-semibold">ReactQuiz</h1>
      <div className="bg-[#f0c663] w-[900px] h-[430px] mt-14 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.6)] flex flex-col items-center">
        <ProgressBar handleAnswer={handleAnswer} key={idxQuestion} />
        <div className="text-[26px] mt-12 mb-8 font-semibold">
          {currentQuestion.text}
        </div>
        {shuffledAnswers.map((itm, idx) => {
          const isSelected = questionAnswer[questionAnswer.length - 1] === itm;
          return (
            <div
              key={idx}
              onClick={() => resultAnswer === "" && handleAnswer(itm)}
              className={`${
                isSelected
                  ? answerValidation
                  : "bg-[#e6a448] hover:bg-[#eb9926]"
              } hover:text-[17px] cursor-pointer mb-2 py-3 w-[720px] text-center rounded-3xl`}>
              {itm}
            </div>
          );
        })}
      </div>
    </div>
  );
}
