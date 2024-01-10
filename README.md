## React third project - Quiz App
<p align="center"><img style="width: 56px; height: 56px; margin: 7px 0; fill: #facc15;" src="public/quiz-logo.png" /></p>

React - The Complete Guide 2023 (incl. React Router & Redux)
- Build a "Quiz" App
- - Shuffles quiz answers on start
- - Can select and change answer only once with interactivity
- - Displaying of timers and timeouts
- - A quiz summary is presented upon quiz completion

- useReducer
- - Applied in App to manage quiz state object containing arrays for both validation and values
- - Both useReducer state and dispatch function is provided to the child component Question.jsx

- useEffect
- - Progress.jsx for setting/clean up of the decrements of the timeRemaining
- - Question.jsx for managing the cleanup of timeout events for dependencies; timer and handleAnswer click event

- Bugs to review on solution
- - Progress bar remainingTime clean up is set to the initial value and not the new value.
- - css file indicates a 'skip action' button and 'last try' header with no demo use in module introduction.
- - General improvement refactor regarding the use of query selectors (review further components / useRef)