import src from '../assets/quiz-logo.png';

export default function Header(){
    return <header>
        <img src={src} attr="quiz pen and paper" />
        <h1>REACTQUIZ</h1>
    </header>
}