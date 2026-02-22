import useQuiz from "./hooks/useQuiz";
import CATEGORIES from "./data/categories";
import ALL_QUESTIONS from "./data/questions/index";
import MenuScreen from "./components/MenuScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import LearnScreen from "./components/LearnScreen";
import CheatSheetScreen from "./components/CheatSheetScreen";

export default function App() {
  const quiz = useQuiz();

  if (quiz.mode === 0) {
    return (
      <MenuScreen
        categories={CATEGORIES}
        allQuestions={ALL_QUESTIONS}
        cats={quiz.cats}
        setCats={quiz.setCats}
        gameMode={quiz.gameMode}
        setGameMode={quiz.setGameMode}
        onStart={quiz.start}
        onLearn={quiz.goToLearn}
        onCheatSheet={quiz.goToCheatSheet}
      />
    );
  }

  if (quiz.mode === 1 && quiz.question) {
    return (
      <QuizScreen
        question={quiz.question}
        qi={quiz.qi}
        total={quiz.total}
        score={quiz.score}
        streak={quiz.streak}
        gameMode={quiz.gameMode}
        timeLeft={quiz.timeLeft}
        hint={quiz.hint}
        done={quiz.done}
        showEx={quiz.showEx}
        sel={quiz.sel}
        onAnswer={quiz.answer}
        onHint={quiz.showHint}
        onNext={quiz.next}
      />
    );
  }

  if (quiz.mode === 2) {
    return (
      <ResultsScreen
        history={quiz.history}
        score={quiz.score}
        best={quiz.best}
        onRetry={() => quiz.start(quiz.cats)}
        onMenu={quiz.goToMenu}
      />
    );
  }

  if (quiz.mode === 3) {
    return (
      <LearnScreen
        catKey={quiz.learnCat}
        onBack={quiz.goToMenu}
        onQuiz={(catKey) => { quiz.setCats(new Set([catKey])); quiz.start(new Set([catKey])); }}
      />
    );
  }

  if (quiz.mode === 4) {
    return <CheatSheetScreen onBack={quiz.goToMenu} />;
  }

  return null;
}
