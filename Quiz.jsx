import {useEffect, useState} from "react";
import questions from "./questions.json";

export default function Quiz() {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(600);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((t) => {
                if (t <= 1) {
                    setFinished(true);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const current = questions[index];

    const chooseAnswer = (option) => {
        if (option === current.answer) {
            setScore((s) => s + 1);
        }
        if (index + 1 < questions.length) {
            setIndex((i) => i + 1);
        } else {
            setFinished(true);
        }
    };

    if (finished) {
        return (
            <div className="result">
                <h2>پایان آزمون</h2>
                <p>امتیاز شما: {score} از {questions.length}</p>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="timer">
                زمان: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
            </div>

            <h2>{current.question}</h2>

            <div className="options">
                {current.options.map((op) => (
                    <button key={op} onClick={() => chooseAnswer(op)}>
                        {op}
                    </button>
                ))}
            </div>

            <p>
                سوال {index + 1} / {questions.length}
            </p>
        </div>
    );
}