import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(qstnData => setQuestions(qstnData))
  },[])


  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
    setPage("List");
  }

  function handleDeleteQuestion(deletedQuestion) {
    const listAfterDeletion = questions.filter(question => question.id !== deletedQuestion.id);

    setQuestions(listAfterDeletion);
  }

  function handleAnswerChange (patchedQuestion) {
    // console.log(changedAnswer.id, changedAnswer.prompt);
    const listAfterPatching = questions.map(question => {
      return (question.id === patchedQuestion.id ? patchedQuestion : question);
    })

    setQuestions(listAfterPatching);
    console.log(listAfterPatching);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onAnswerChange={handleAnswerChange} />}
    </main>
  );
}

export default App;
