import logo from "./logo.svg";
import "./App.css";
import Quiz from "./components/quiz";

import Quizapp from "./components/Quizapp";
function App() {
  console.log("hello");
  return (
    <div className="App">
      {/* <Quiz /> */}
      <Quizapp />
    </div>
  );
}

export default App;
