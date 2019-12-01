import * as functions from 'firebase-functions';
import {
    findEmptyAnswer,
    findEmptyTitle,
    findQuestionsWithoutCorrectAnswer,
    quizConfig,
    ValidationDetails
} from "./validateQuizUtils";

export const validateEmail = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*");
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');

    const email: string = request.body.email;
    const reg: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(reg.test(String(email).toLowerCase())) {
        response.send(true)
    }else response.send(false)
});

export const validateQuiz = functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', "*");
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');

    const validationDetails: ValidationDetails = {
        validationStatus: true,
        numberOfQuestions: false,
        emptyTitle: [],
        emptyAnswer: [],
        correctAnswerNotSelected: []
    };

    const config: quizConfig = request.body;

    try {
        const questions = await config.questions;
        const emptyTitle = await findEmptyTitle(questions);
        if(emptyTitle.length > 0) {
            validationDetails.validationStatus = false;
            validationDetails.emptyTitle = emptyTitle;
        }

        const emptyAnswer = await findEmptyAnswer(questions);
        if(emptyAnswer.length > 0) {
            validationDetails.validationStatus = false;
            validationDetails.emptyAnswer = emptyAnswer;
        }

        const correctAnswerNotSelected = await findQuestionsWithoutCorrectAnswer(questions);
        if(correctAnswerNotSelected.length > 0) {
            validationDetails.validationStatus = false;
            validationDetails.correctAnswerNotSelected = correctAnswerNotSelected;
        }

        if(config.numberOfQuestions < 5) {
            validationDetails.validationStatus = false;
            validationDetails.numberOfQuestions = true;
        }

    }catch (e) {
        console.log(e)
    }

    response.send(validationDetails)
});

