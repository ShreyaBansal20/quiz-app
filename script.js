const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is called the powerhouse of the cell?',
    answers: [
      { text: 'Mitochondria', correct: true },
      { text: 'Golgi apparatus', correct: false },
      {text: 'Ribosomes', correct: false},
      {text: 'Chloroplast', correct: false}
    ]
  },
  {
    question: 'Who discovered cell?',
    answers: [
      { text: 'Faraday', correct: false },
      { text: 'Tim Cook', correct: false},
      { text: 'Robert Hook', correct: true },
      { text: 'Elon Musk', correct: false}
    ]
  },
  {
    question: 'Who named proton first?',
    answers: [
      { text: 'Rutherford', correct: true },
      { text: 'Marie Curie', correct: true },
      { text: 'James Bond', correct: false },
      { text: 'Einstein', correct: false }
    ]
  },
  {
    question: 'Who gave thery of relativity?',
    answers: [
      { text: 'Marie Curie', correct: false },
      { text: 'Einstien', correct: true },
      {text: 'Hitler', correct: false},
      {text : 'None of the above', correct : false}
    ]
  }
]