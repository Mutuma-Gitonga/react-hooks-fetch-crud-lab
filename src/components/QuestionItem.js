import React from "react";

function QuestionItem({onAnswerChange, onDeleteQuestion, question }) {
  const { id, prompt, answers, correctIndex } = question;

  // const [correctAnswer, setCorrectAnswer] = useState(0);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {

    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "DELETE"})
      .then(res => res.json())
      .then(() => onDeleteQuestion(question))
  }

  function handleChange(e) {
    // setCorrectAnswer(e.target.value);

    console.log(e.target.value);

    console.log(question)

    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({correctIndex: e.target.value})
    })
      .then(res => res.json())
      .then((patchedQstn) => onAnswerChange(patchedQstn))
    
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
