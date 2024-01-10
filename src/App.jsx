import Header from './components/Header.jsx';
import Question from './components/Question.jsx';
import Summary from './components/Summary.jsx';
import { QUESTIONS } from './questions.js';
import { useReducer } from 'react';

function App() {
    
    const [answer, answerDispatch] = useReducer(answerReducer, {
        validation: [],
        values: []
    });

    function answerReducer(state, action){
        switch (action.type) {
            case 'add': {
                return {
                    ...state,
                    values: [...state.values, action.nextValue ? action.nextValue : null],
                }
            }
            case 'add_last_try': {
                const newValues = [...state.values];
                newValues.pop();
                return {
                    ...state,
                    values: [...newValues, action.nextValue]
                }
            }
            case 'validate': {
                return {
                    ...state,
                    validation: [...state.validation, action.nextValidation],
                }
            }
        }
    }

    return <>
        <Header />
        { answer.validation.length < QUESTIONS.length
            ? <Question answer={answer} answerDispatch={answerDispatch} />
            : <Summary answer={answer} />
        }
    </>
}

export default App;
