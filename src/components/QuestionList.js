import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({onAnswerChange, onDeleteQuestion, questions}) {

  return (
    <section>
    <h1>Quiz Questions</h1>
    <ul>
      {
        questions.map(question => {
          return <QuestionItem key={question.id} question={question} onDeleteQuestion={onDeleteQuestion} onAnswerChange={onAnswerChange} />
        })
      }
      </ul>
  </section>
  );
}

export default QuestionList;
