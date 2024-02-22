import logo from "./logo.svg";
import "./App.css";
import { useGetQuestionQuery } from "./slices/questionlist";
function App() {
  const userID = 1;
  const quizId = 1;
  const { data: questionlist } = useGetQuestionQuery({ userID, quizId });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
