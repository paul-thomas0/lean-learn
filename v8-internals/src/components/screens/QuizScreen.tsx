import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { moduleMap, v8EngineQuiz, chromeIntegrationQuiz, nodejsIntegrationQuiz } from '../../data/modules';
import { useProgress } from '../../hooks/useProgress';
import { useQuiz } from '../../hooks/useQuiz';
import { QuizOption } from '../quiz/QuizOption';
import { QuizFeedback } from '../quiz/QuizFeedback';
import { Breadcrumb } from '../layout/Breadcrumb';
import type { ModuleId, NavigationTarget, QuizQuestion } from '../../types';

const quizMap: Record<ModuleId, QuizQuestion[]> = {
  'v8-engine': v8EngineQuiz,
  'chrome-integration': chromeIntegrationQuiz,
  'nodejs-integration': nodejsIntegrationQuiz,
};

interface QuizScreenProps {
  moduleId: ModuleId;
  onNavigate: (target: NavigationTarget) => void;
}

export function QuizScreen({ moduleId, onNavigate }: QuizScreenProps) {
  const mod = moduleMap[moduleId];
  const questions = quizMap[moduleId];
  const { dispatch } = useProgress();

  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    isRevealed,
    score,
    isComplete,
    selectAnswer,
    nextQuestion,
  } = useQuiz(questions);

  useEffect(() => {
    if (isComplete) {
      dispatch({ type: 'SAVE_QUIZ_RESULT', moduleId, score, total: totalQuestions });
      if (score / totalQuestions >= 0.7) {
        dispatch({ type: 'EARN_BADGE', moduleId });
      }
      onNavigate({ screen: 'results', moduleId });
    }
  }, [isComplete, score, totalQuestions, moduleId, dispatch, onNavigate]);

  if (!currentQuestion) return null;

  const progressPct = ((currentIndex + 1) / totalQuestions) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Breadcrumb
        moduleId={moduleId}
        sectionTitle="Quiz"
        onNavigateHome={() => onNavigate({ screen: 'home' })}
        onNavigateModule={() =>
          onNavigate({ screen: 'section', moduleId, sectionId: mod.sections[0].id })
        }
      />

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[var(--text-muted)] mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>Score: {score}</span>
        </div>
        <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%`, backgroundColor: mod.color }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
        {currentQuestion.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {currentQuestion.options.map((option, i) => (
          <QuizOption
            key={i}
            index={i}
            text={option}
            isSelected={selectedAnswer === i}
            isCorrect={i === currentQuestion.correctIndex}
            isRevealed={isRevealed}
            onClick={() => selectAnswer(i)}
          />
        ))}
      </div>

      {/* Feedback */}
      {isRevealed && (
        <QuizFeedback
          isCorrect={isCorrect}
          explanation={currentQuestion.explanation}
          onNext={nextQuestion}
          isLast={currentIndex === totalQuestions - 1}
        />
      )}
    </motion.div>
  );
}
