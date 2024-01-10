import src from '../assets/quiz-complete.png';
import { QUESTIONS } from '../questions.js';

export default function Summary({answer}){

    function quizStats(stat, size){
        const count = answer.validation.filter(validate => validate === stat).length;
        return (count / size * 100).toFixed();
    }

    return (
        <div id="summary">
            <img src={src} attr="quiz trophy cup" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className='number'>{ quizStats('skipped', answer.values.length) }%</span>
                    <span className='text'>Skipped</span>
                </p>
                <p>
                    <span className='number'>{ quizStats('correct', answer.values.length) }%</span>
                    <span className='text'>Answered Correctly</span>
                </p>
                <p>
                    <span className='number'>{ quizStats('wrong', answer.values.length) }%</span>
                    <span className='text'>Answered Incorrectly</span>
                </p>
            </div>
            <ol>
                { answer.values.map((value, index) => (
                    <li key={index}>
                        <h3>{ index+1 }</h3>
                        <p className="question">{ QUESTIONS[index].text }</p>
                        <p className={'user-answer ' + answer.validation[index]}>{ value ?? 'Skipped!' }</p>
                    </li>
                ))
                }
            </ol>
        </div>
    );
}