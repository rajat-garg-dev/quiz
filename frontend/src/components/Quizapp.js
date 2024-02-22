import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useGetQuestionQuery } from "../slices/questionlist";
import { setter, quizSelector } from "../slices/quizreducerslice";
export default function Quizapp() {
  const dispatch = useDispatch();
  const userId = 1;
  const quizId = 1;
  const { data: questionlist, isSuccess } = useGetQuestionQuery({
    userId,
    quizId,
  });
  const data = {
    userId: userId,
    quizId: quizId,
    questions: questionlist?.questions,
  };
  if (questionlist) {
    dispatch(setter(data));
  }
  if (questionlist) {
    console.log("yes yes");
  }
  const abc = useSelector(quizSelector);
  if (questionlist) {
    console.log("bye", abc.payload.questions);
  }
  return (
    <div>
      heellloo
      {/* {abc?.quiz?.questions.map((item, index) => {
        return (
          <>
            <h1>hello</h1>

          </>
        );
      })} */}
    </div>
  );
}
