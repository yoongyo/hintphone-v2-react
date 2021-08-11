import React from 'react';
import NotHint from '../../img/not_hint.png'
import reset from '../../img/reset1.png'
import question from '../../img/question.png'
import { useHistory } from 'react-router-dom';


export const NotHintCount = () => {
    let history = useHistory();

    const resetButton = () => {
        history.push('/m/reset');
    }

    const questionButton = () => {

    }

    return (
        <div className="text-center py-10">
            <h1 className="text-white my-10 text-2xl font-semibold">힌트를 모두 사용하셨습니다</h1>
            <img src={NotHint} className="w-full" alt="notHint"/>
            <div className="fixed bottom-5 left-5">
                <button onClick={resetButton}>
                    <img src={reset} width={50} alt="reset"/>
                </button>
            </div>
            <div className="fixed bottom-5 right-5">
                <button onClick={questionButton}>
                    <img src={question} width={50} alt="question"/>
                </button>
            </div>
        </div>
    )
}