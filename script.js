import { wordList } from "./words.js"

const hint = document.querySelector("#hint")
const letters = document.querySelectorAll(".letter")
const lose = document.querySelector("#lose")
const word = document.querySelector(".word")
const wrongCount = document.querySelector("#wrong-count")
const wordDisplay = document.querySelector("#word-display")
const hangmanImg = document.querySelector("#hangman-img")

let currentWord = ""
let displayArr = []
let wrongLCount = 0
const maxGuesses = 6

const wordChosen = () => {
  const randomIndex = Math.floor(Math.random() * wordList.length)
  currentWord = wordList[randomIndex].word.toLowerCase()
  hint.textContent = `Hint : ${wordList[randomIndex].hint}`
  displayArr = Array(currentWord.length).fill("_")
  wordDisplay.textContent = displayArr.join(" ")
  wrongLCount = 0
  wrongCount.textContent = wrongLCount
  hangmanImg.src = "img/0.PNG"
  word.textContent = ""
  lose.style.display = "none"
  letters.forEach((btn) => (btn.disabled = false))
}

const updateWordDisplay = () => {
  wordDisplay.textContent = displayArr.join(" ")
}

const checkWin = () => {
  if (!displayArr.includes("_")) {
    lose.style.display = "block"
    lose.querySelector("h2").textContent = "You Save Brook’s Life 🏴‍☠️ "
    letters.forEach((btn) => (btn.disabled = true))
  }
}

const handleGuess = (event) => {
  const letter = event.target.textContent.toLowerCase()
  event.target.disabled = true

  if (currentWord.includes(letter)) {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === letter) displayArr[i] = letter
    }
    updateWordDisplay()
    checkWin()
  } else {
    wrongLCount++
    wrongCount.textContent = wrongLCount
    hangmanImg.src = `img/${wrongLCount}.PNG`

    if (wrongLCount >= maxGuesses) {
      word.textContent = `The Correct Word is ${currentWord}`
      lose.style.display = "block"
      lose.querySelector("h2").textContent = "Game Over!"
      letters.forEach((btn) => (btn.disabled = true))
    }
  }
}

letters.forEach((btn) => {
  btn.addEventListener("click", handleGuess)
})

wordChosen()
