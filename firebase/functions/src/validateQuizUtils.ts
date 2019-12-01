export function findEmptyTitle(arr: Question[]): number[] {
    const arr2: number[] = [];
    arr.forEach((question, index) => {
        if(question.title === "")
            arr2.push(index)
    });
    return arr2;
}

export function findEmptyAnswer(arr: Question[]): number[] {
    const arr2: Set<number> = new Set<number>();

    arr.forEach((question, index) => {
        question.answers.forEach(answer => {
            if(answer.answerField === "")
                arr2.add(index)
        })
    });
    return [...arr2];
}

export function findQuestionsWithoutCorrectAnswer(arr: Question[]): number[] {
    const arr2: number[] = [];

    arr.forEach((question, index) => {
        const selected = question.answers.some(q => q.correctAnswer);
        if(!selected)
            arr2.push(index)
    });
    return arr2;
}
export type ValidationDetails = {
    validationStatus: boolean
    numberOfQuestions: boolean
    emptyTitle: number[]
    emptyAnswer: number[]
    correctAnswerNotSelected: number[]
}
export type quizConfig = {
    title: string
    category: string
    description: string
    multipleChoices: boolean
    numberOfQuestions: number
    questions: Question[]
}

type Question = {
    answers: Answer[]
    title: string
}

type Answer = {
    answerField: string
    correctAnswer: boolean
}
