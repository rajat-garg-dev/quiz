import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userId: 0,
  quizId: 0,
  questions: [],
};

const quizreducerslice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setter(state, { payload }) {
      const { userId, quizId, questions } = payload;
      console.log("rajat", state);
      state.quiz = {
        userId: userId,
        quizId: quizId,
        questions: questions?.map((q) => {
          const { correctAnswer, incorrectAnswers } = q;
          const options = [...incorrectAnswers];
          const data = options.map((data) => ({
            value: data,
            correct: false,
          }));
          data.push({
            value: correctAnswer,
            correct: true,
          });
          return {
            ...q,
            options: data,
            userFlag: false,
            userAnswer: [],
            attempt: 3,
            score: 0,
          };
        }),
      };
      console.log("payload", payload);
      return { ...state.quiz, payload };
      // return { ...state.quiz, ...payload };
    },
    answerFun(state, { payload }) {
      let { answer, id } = payload;
      // answer = JSON.parse(answer);

      // const { id, answer } = payload;
      const existingQues = state.questions.find(
        (question) => question.id === id
      );
      if (existingQues) {
        existingQues.userAnswer.push(answer);
      }
      // return { ...state.quiz.questions, existingQues };
    },
    flagFun(state, { payload }) {
      console.log("datasss");
      const { id } = payload;
      const existingQues = state.questions.find(
        (question) => question.id === id
      );
      if (existingQues) {
        existingQues.userFlag = !existingQues.userFlag;
      }
    },

    attemptFun(state, { payload }) {
      let { id } = payload;
      // answer = JSON.parse(answer);

      // const { id, answer } = payload;
      const existingQues = state.questions.find(
        (question) => question.id === id
      );
      if (existingQues) {
        existingQues.attempts = existingQues.attempts - 1;
      }
    },
    scoreFun(state, { payload }) {
      const { id } = payload;
      const existingQues = state.questions.find(
        (question) => question.id === id
      );
      if (existingQues) {
        existingQues.score = 1;
      }
    },
  },
});

export const { setter, answerFun, flagFun, attemptFun, scoreFun, optionsFun } =
  quizreducerslice.actions;
export const quizSelector = (state) => state.quiz;
export default quizreducerslice.reducer;
