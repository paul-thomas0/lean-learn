import { useState, useCallback } from 'react';
import type { QuizQuestion } from '../types';
import { shuffle } from '../utils/quiz';

interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  selectedAnswer: number | null;
  isRevealed: boolean;
  score: number;
  streak: number;
  history: { questionIndex: number; selectedAnswer: number; correct: boolean }[];
  isComplete: boolean;
}

export function useQuiz(allQuestions: QuizQuestion[]) {
  const [state, setState] = useState<QuizState>(() => ({
    questions: shuffle(allQuestions),
    currentIndex: 0,
    selectedAnswer: null,
    isRevealed: false,
    score: 0,
    streak: 0,
    history: [],
    isComplete: false,
  }));

  const currentQuestion = state.questions[state.currentIndex] ?? null;

  const selectAnswer = useCallback((index: number) => {
    setState((prev) => {
      if (prev.isRevealed) return prev;
      const correct = index === prev.questions[prev.currentIndex].correctIndex;
      return {
        ...prev,
        selectedAnswer: index,
        isRevealed: true,
        score: correct ? prev.score + 1 : prev.score,
        streak: correct ? prev.streak + 1 : 0,
        history: [
          ...prev.history,
          { questionIndex: prev.currentIndex, selectedAnswer: index, correct },
        ],
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= prev.questions.length) {
        return { ...prev, isComplete: true };
      }
      return {
        ...prev,
        currentIndex: nextIndex,
        selectedAnswer: null,
        isRevealed: false,
      };
    });
  }, []);

  const restart = useCallback(() => {
    setState({
      questions: shuffle(allQuestions),
      currentIndex: 0,
      selectedAnswer: null,
      isRevealed: false,
      score: 0,
      streak: 0,
      history: [],
      isComplete: false,
    });
  }, [allQuestions]);

  return {
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions: state.questions.length,
    selectedAnswer: state.selectedAnswer,
    isRevealed: state.isRevealed,
    score: state.score,
    streak: state.streak,
    history: state.history,
    isComplete: state.isComplete,
    questions: state.questions,
    selectAnswer,
    nextQuestion,
    restart,
  };
}
