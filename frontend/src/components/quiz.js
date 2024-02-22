import React, { useState } from "react";
import { useGetQuestionQuery } from "../slices/questionlist";
import { UseDispatch, useDispatch } from "react-redux";
import {
  quizSelector,
  setter,
  answerFun,
  flagFun,
  attemptFun,
  scoreFun,
} from "../slices/quizreducerslice";
const quizId = 65;
const userId = 1;
export default function Quiz() {
  const dispatch = useDispatch();
  const {
    data: questionlist,
    isLoading: questionIsLoading,
    isFetching: questionIsFetching,
    isSuccess,
    fulfilledTimeStamp: full,
  } = useGetQuestionQuery({ userId, quizId });
  console.log(questionlist, "questionlist");

  const [currentindex, setCurrentindex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [show, setShow] = useState(false);

  let totalscore = 0;
  let totalflag = 0;
  let totalattempted = 0;
  for (var i = 0; i < questionlist.questions?.length; i++) {
    if (questionlist.questions[i].score === 1) totalscore += 1;
    if (questionlist.questions[i].userflag === true) totalflag += 1;
    if (questionlist.questions[i].attempt < 3) totalattempted += 1;
  }
  // let totalincorrect = totalattempted - totalscore;
  // let unanswered = questionlist.questions?.length - totalattempted;

  // let totalincorrect = 0;
  // let unanswered = 0;
  // const obj = {
  //   questionId: questionlist?.questions[currentindex]?.id,
  //   useranswer: questionlist?.questions[currentindex]?.userAnswer,
  //   correct: false,
  //   attempts: questionlist?.questions[currentindex]?.attempt,
  //   isFlag: questionlist?.questions[currentindex]?.userFlag,
  //   availableAttempts: 3,
  //   score: questionlist?.questions[currentindex]?.score,
  // };
  // const questionData = questionlist;

  // console.log(questionData?.question, "data");

  // !isLoading && console.log("apiData", apiData);

  const HandleSubmission = () => {
    dispatch(
      answerFun({
        id: questionlist.questions[currentindex].id,
        answer: answer,
      })
    );

    if (
      (questionlist.questions[currentindex].userAnswer?.length === 0 &&
        answer === "") ||
      answer === undefined
    ) {
      alert("attempt first");
    } else if (answer === questionlist.questions[currentindex].correct) {
      alert("correct");
      dispatch(
        attemptFun({
          id: questionlist.questions[currentindex].id,
        })
      );
      dispatch(
        scoreFun({
          id: questionlist.questions[currentindex].id,
        })
      );
      if (currentindex === 9) {
        setCurrentindex(currentindex);
      } else {
        setCurrentindex(currentindex + 1);
      }
    } else {
      dispatch(
        attemptFun({
          id: questionlist.questions[currentindex].id,
        })
      );

      if (questionlist.questions[currentindex].attempt <= 1) {
        alert("all attempts used");
        if (currentindex === 9) {
          setCurrentindex(currentindex);
        } else {
          setCurrentindex(currentindex + 1);
        }
      }
    }
    // console.log(data.quiz.questions[currentindex], "sahuahu");
    // console.log(data.quiz.questions[currentindex].correct, "correct");

    const Check = (e) => {
      setAnswer(e.target.value);
    };

    const flag = () => {
      dispatch(
        flagFun({
          id: questionlist.questions[currentindex].id,
        })
      );
    };

    // const ques = data?.questions;
    // const currentQuestion = ques[currentindex];

    // console.log(questionlist.questions, "kjhgfddeww");
    // console.log(data.quiz.questions[currentindex]?.userAnswer, "hloo");
    return (
      <>
        {/* {JSON.stringify(questionlist.questions)} */}
        {questionlist ? (
          <>
            {" "}
            {questionlist.questions.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`btn p-3 border-[1px] rounded-lg text-white ${
                    item[index] === item[currentindex] &&
                    item[index]?.attempts === 3 &&
                    item[index]?.userFlag === false
                      ? "bg-blue-200"
                      : "bg-blue-500"
                  } ${
                    item[index]?.userFlag === true
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  } ${
                    item[index]?.score === 1 ? "bg-green-500 " : "bg-blue-500"
                  } ${
                    item[index]?.score === 0 && item[index]?.attempt < 3
                      ? "bg-red-500 "
                      : "bg-blue-500"
                  }`}
                  onClick={() => {
                    setCurrentindex(index);
                    setAnswer(
                      questionlist.questions[index]?.userAnswer[
                        questionlist.questions[index].userAnswer.length - 1
                      ]
                    );
                  }}>
                  {index + 1}
                </button>
              );
            })}
          </>
        ) : (
          <p>loading..</p>
        )}
      </>
    );
  };

  return questionlist ? (
    // <div>
    //   <div className="quiz-btn flex gap-[10px] justify-center border-[1px] p-3 mt-[100px] mx-auto w-[900px] bg-zinc-400">
    //     {questionlist?.questions &&
    //       questionlist?.questions?.map((item, index) => (
    //         <button
    //           key={index}
    //           className={`btn p-3 border-[1px] rounded-lg text-white ${
    //             item[index] === item[currentindex] &&
    //             item[index]?.attempts === 3 &&
    //             item[index]?.userFlag === false
    //               ? "bg-blue-200"
    //               : "bg-blue-500"
    //           } ${
    //             item[index]?.userFlag === true ? "bg-yellow-500" : "bg-blue-500"
    //           } ${item[index]?.score === 1 ? "bg-green-500 " : "bg-blue-500"} ${
    //             item[index]?.score === 0 && item[index]?.attempt < 3
    //               ? "bg-red-500 "
    //               : "bg-blue-500"
    //           }`}
    //           onClick={() => {
    //             setCurrentindex(index);
    //             setAnswer(
    //               questionlist.questions[index]?.userAnswer[
    //                 questionlist.questions[index].userAnswer.length - 1
    //               ]
    //             );
    //           }}>
    //           {index + 1}
    //         </button>
    //       ))}
    //   </div>
    //   {questionlist.questions[currentindex] ? (
    //     <div className="mx-auto bg-slate-400 w-[700px] h-[450px] border-[1px] rounded-[12px] mt-[15px]">
    //       <div className=" mt-[15px] flex flex-col gap-[10px]">
    //         <div className="mt-[15px] flex p-3 justify-between ">
    //           <span className="text-[35px] ml-[10px]">
    //             question {currentindex + 1}
    //           </span>
    //           <button
    //             className={` p-3 border-[1px] rounded-lg ${
    //               questionlist.questions[currentindex].userFlag === true
    //                 ? "bg-yellow-500 "
    //                 : "bg-orange-500"
    //             } `}
    //             onClick={dispatch(
    //               flagFun({
    //                 id: questionlist.questions[currentindex].id,
    //               })
    //             )}
    //             disabled={
    //               questionlist.questions[currentindex].score === 1 ||
    //               questionlist.questions[currentindex].attempt === 0
    //             }>
    //             flag
    //           </button>
    //         </div>
    //         <p className="ml-[10px] text-[17px]">
    //           {questionlist.questions[currentindex].question}
    //           {/* {console.log(
    //             progressData.questions[currentindex].question,
    //             currentindex,
    //             "ques"
    //           )} */}
    //         </p>
    //         <div className="text-orange-300 text-[18px] mx-auto">
    //           Attempts left {questionlist.questions[currentindex].attempts}
    //         </div>
    //         <div className="text-orange-300 text-[18px] mx-auto">
    //           {questionlist.questions[currentindex].score}
    //         </div>
    //         <div>
    //           {/* {console.log(ques.option, "optn")} */}
    //           {questionlist.questions[currentindex].option?.map(
    //             (item, index) => (
    //               <div
    //                 className=" flex flex-row gap-[20px] ml-[10px] disabled:bg-green-500"
    //                 key={index}>
    //                 <input
    //                   type="radio"
    //                   value={item.value}
    //                   onChange={(e) => {
    //                     setAnswer(e.target.value);
    //                   }}
    //                   checked={answer === item.value}
    //                   disabled={
    //                     questionlist.questions[currentindex].score === 1 ||
    //                     questionlist.questions[currentindex].attempt === 0 ||
    //                     questionlist.questions[currentindex].userFlag === true
    //                   }
    //                 />
    //                 <label>{item.value}</label>
    //               </div>
    //             )
    //           )}
    //         </div>
    //       </div>

    //       {/* <button
    //         className=" p-3 mt-[15px] ml-[300px] border-[2px] rounded-[12px]  text-white bg-blue-500 disabled:bg-gray-400"
    //         onClick={HandleSubmission}
    //         disabled={
    //           data.quiz.questions[currentindex].userFlag === true ||
    //           data.quiz.questions[currentindex].score === 1 ||
    //           data.quiz.questions[currentindex].attempt === 0
    //         }>
    //         check
    //       </button> */}

    //       <button
    //         onClick={() => setShow(true)}
    //         className={`${
    //           currentindex === questionlist.questions.length - 1
    //             ? "  p-3 bg-purple-400 border-2 border-white rounded-lg float-right mr-[10px] mt-[20px]"
    //             : "hidden"
    //         }`}>
    //         Submit
    //       </button>
    //     </div>
    //   ) : // JSON.stringify(currentQuestion)
    //   null}
    // </div>
    <>hello</>
  ) : (
    "noyhig"
  );
}
