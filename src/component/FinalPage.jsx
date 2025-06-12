import { Fragment, useContext } from "react";
import trophyImg from "../assets/trophy.png";
import { PageContext } from "../store/context";
import { quizQuestions } from "../data/questions";

export default function FinalPage() {
  const { questionAnswer, name } = useContext(PageContext);

  const skipAnswer = questionAnswer.filter((itm) => itm === "");
  const rightAnswer = questionAnswer.filter(
    (itm, idx) => itm === quizQuestions[idx].answers[0],
  );
  const wrongAnswer = questionAnswer.filter(
    (itm, idx) => itm !== "" && itm !== quizQuestions[idx].answers[0],
  );

  function handleResult(value) {
    return ((value / quizQuestions.length) * 100).toFixed(0);
  }

  return (
    <div className="flex justify-center">
      <div className="bg-[#f0c663] w-[800px] my-16 rounded-lg flex flex-col items-center pb-14">
        <img src={trophyImg} className="mx-auto mt-11" width={120} />
        <div className="text-[#373737] mt-3 font-bold text-3xl">
          QUIZ COMPLETED
        </div>
        <div className="mt-14 mb-8 text-2xl text-[#b06600] font-semibold">
          Thank you for joining the quiz, {name}!
        </div>
        <div className="flex text-[#4b4b4b]">
          <div className="w-[180px] text-center">
            <div className="text-6xl">{handleResult(skipAnswer.length)}%</div>
            <div className="text-[15px]">SKIPPED</div>
          </div>
          <div className="w-[180px] text-center">
            <div className="text-6xl">{handleResult(wrongAnswer.length)}%</div>
            <div className="text-[15px]">ANSWERED INCORRECTLY</div>
          </div>
          <div className="w-[180px] text-center">
            <div className="text-6xl">{handleResult(rightAnswer.length)}%</div>
            <div className="text-[15px]">ANSWERED CORRECTLY</div>
          </div>
        </div>
        <div className="bg-[#4b4b4b] w-[550px] h-1 mt-6"></div>
        {questionAnswer.map((itm, idx) => (
          <Fragment key={idx}>
            <div className=" mt-10 text-white w-7 h-7 bg-[#373737] rounded-full flex  justify-center items-center">
              {idx + 1}
            </div>
            <div className="text-[#4b4b4b] mt-2 text-lg mb-1">
              {quizQuestions[idx].text}
            </div>
            <div
              className={`${
                itm === quizQuestions[idx].answers[0]
                  ? "text-[#249100]"
                  : "text-[#c10000]"
              } font-semibold`}>
              {itm || "-"}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
