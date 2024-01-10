import Progress from './Progress.jsx';
import { QUESTIONS } from '../questions.js';
import { useEffect, useState } from 'react';

const shuffledAnswers = QUESTIONS.map(question => (
    question.answers.map(answer => ({ answer, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ answer }) => answer)
));

export default function Question({ answer, answerDispatch }){
    const [timer, setTimer] = useState(8000);

    function handleAnswer(event){
        if(timer === 3000){
            // Where handling answer twice; disable further attempts
            cleanAnswers();
        }

        event.target.className = 'selected';
        answerDispatch({
            type: timer === 3000 ? 'add_last_try' : 'add',
            nextValue: event.target.textContent
        });
        setTimer(prevTimer => prevTimer = 3000);
    }

    function cleanAnswers(){
        const answerItems = document.querySelectorAll('#answers button');
        answerItems.forEach(item => {
            item.className = '';
            item.disabled = false;
        });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(answer.validation.length < answer.values.length){
                // Outstanding validation required
                const result = answer.values[answer.validation.length] === QUESTIONS[answer.validation.length].answers[0]
                    ? 'correct'
                    : 'wrong';
                
                const selected = document.querySelector('.selected');
                if(selected){ selected.className = result; }
                const answerItems = document.querySelectorAll('#answers button');
                answerItems.forEach(item => (item.disabled = true));
                
                answerDispatch({
                    type: 'validate',
                    nextValidation: answer.values[answer.validation.length] === null ? 'skipped' : result
                });
                setTimer(prevTimer => prevTimer = 4000);
            } else {
                if(timer === 8000){
                    // if its a timeout with no selected answer
                    const answerItems = document.querySelectorAll('#answers button');
                    answerItems.forEach(item => (item.disabled = true));
                    answerDispatch({ type: 'add' });
                    setTimer(prevTimer => prevTimer = 3000);
                } else {
                    cleanAnswers();
                    setTimer(prevTimer => prevTimer = 8000);
                }
            }
        }, timer);

        return () => clearTimeout(timeout);
    }, [timer, handleAnswer]);

    const questionIndex = timer === 8000 ? answer.values.length : answer.values.length - 1;
    return(
        <section id="quiz">
            <div id="question">
                <Progress max={timer} />
                <h2>{QUESTIONS[questionIndex].text}</h2>
                <ul id="answers">
                    { shuffledAnswers[questionIndex].map((item, index) => (
                        <li key={index} className="answer">
                            <button onClick={handleAnswer}>
                                { item }
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}