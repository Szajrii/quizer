import * as functions from 'firebase-functions';

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

    const validationDetails = {
        validationStatus: true,
        numberOfQuestions: false,
        emptyTitle: false,
        emptyAnswer: false,
        correctAnswerNotSelected: false
    };

    console.log(validationDetails);
    const config: quizConfig = request.body;
    console.log(config);
    //

    try {
        const emptyTitle = await config.questions.some(q => q.title === "");
        if(emptyTitle) {
            validationDetails.validationStatus = false;
            validationDetails.emptyTitle = true;
        }

        const questions = await config.questions;
        if(findEmptyAnswer(questions)) {
            validationDetails.validationStatus = false;
            validationDetails.emptyAnswer = true;
        }

        const correctAnswerNotSelected = await config.questions.some(q => {
            q.answers.some(answer => answer.correctAnswer);
        });
        if(config.numberOfQuestions < 5) {
            validationDetails.validationStatus = false;
            validationDetails.numberOfQuestions = true;
        }
        if(correctAnswerNotSelected) {
            validationDetails.validationStatus = false;
            validationDetails.correctAnswerNotSelected = true;
        }
    }catch (e) {
        console.log(e)
    }

    response.send(validationDetails)
});

function findEmptyAnswer(arr: Question[]): boolean {
    const arr2: string[] = [];
    arr.forEach(x=> {
        x.answers.forEach(q=> arr2.push(q.answerField) )
    });
    return arr2.some(x=> x === "");
}

type quizConfig = {
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
