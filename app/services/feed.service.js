'use strict';

angular.module('feedApp.feed-service', [])
    .factory('feedService', function () {
        const QnA = {
            isInitialized: false,
            init: (callback) => {
                getQuestionsAndAnswers().then(res => {
                    [QnA.questions, QnA.answers] = [sortByDate(res[0] || []), sortByDate(res[1] || [])];
                    QnA.isInitialized = true;
                    // console.log(QnA.questions); //ok
                    // console.log(QnA.answers);
                    callback();
                });
            },
        };

        return QnA;
    })

async function getQuestionsAndAnswers() {
    try {
        const questions = await fetch("https://api.myjson.com/bins/dck5b").then(blob => blob.json());
        const answers = await fetch("https://api.myjson.com/bins/hildr").then(blob => blob.json());
        return [questions.feed_questions, answers.feed_answers];
    } catch (e) {
        console.error(e);
    }
}

function sortByDate(entries) { //date format: 12/Apr/18 13:30
    return entries.sort((a, b) =>
        moment(a.created_at, "DD/MMM/YY HH:mm")
        .isBefore(moment(b.created_at, "DD/MMM/YY HH:mm")) ? 1 : -1
    );
}