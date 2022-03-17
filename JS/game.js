const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


/* added real data to questions & choices */
let questions = [
    {
        question: "A sales ops user has been identified as the dashboards expert within Cloud Kicks. This user needs to be able to update dashboard folder access for all non-private folders. Which permission should the administrator assign to the user?",
        choice1: "Manage reports in public folders",
        choice2: "Manage dashboards in public folders",
        choice3: "Create dashboard folders",
        choice4: "Create and customize dashboards",
        answer: 2,
    },
    {
        question: "A Sales executive at Universal Containers (UC) is utilizing Collaborative Forecasting to track sales rep quote attainment and wants to be alerted when an opportunity stage is moved backward In the sales process. Which feature should the administrator use to fulfill this request? ",
        choice1: "Validation Rule",
        choice2: "Workflow Rule",
        choice3: "Big Deal Alert",
        choice4: "Field History Tracking Report",
        answer: 2,
    },
    {
        question: "Sales users at Cloud Kicks are requesting that the data in the Industry field on the Account object displays on the Opportunity page layout. Which type of field should an administrator create to accomplish this?",
        choice1: "Cross-object formula field",
        choice2: "Custom Account field",
        choice3: "Standard Account field",
        choice4: "Master-detail relationship field",
        answer: 1,
    },
    {
        question: "Users at Universal Containers have reported that the related lists on the Lightning record page for Accounts are showing only four fields. They would like more fields to be visible. Which customization should an administrator use to allow for up to ten fields on related lists?",
        choice1: "Change the related list type to custom",
        choice2: "Change the related list type to default",
        choice3: "Change the related list type to enhanced list",
        choice4: "Change the related list type to list view",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questioncounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/HTML/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${((questionCounter/MAX_QUESTIONS) - .25) * 100}%` //fixed backticks for template literals

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
