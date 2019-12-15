import {Question} from './validateQuizUtils'

export type Result = {
    questions: Question[],
    answers: boolean[][]
}

export type Respond = {
    correctAnswers: number,
    answerStatus: boolean[]
}
