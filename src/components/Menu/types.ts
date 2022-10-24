export type MenuItemType = {
    price: number;
    questions: QuestionType[]
}

export type QuestionType = {
    isMultiAnswer: boolean;
    question: string;
    answers: AnswerType[];
}

export type AnswerType = {
    isAnswer: boolean;
    answer: string;
}

export type GameConfigType = {
    currentLevelId: number;
    present: number;
}