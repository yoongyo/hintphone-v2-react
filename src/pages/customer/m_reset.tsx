import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { BACKEND_URL } from '../../backend';

export const Reset = () => {
    const escapeRoom = localStorage.getItem('escapeRoom');
    const [value, setValue] = useState("");
    const [notCorrect, setNotCorrect] = useState("");
    const resetCode = localStorage.getItem('resetCode');
    const name = localStorage.getItem('themeName');
    const id = localStorage.getItem('themeId');
    let history = useHistory();

    const onClickEnter = (event:any) => {
        event.preventDefault();
        console.log(resetCode);
        if(resetCode === value) {
            fetch(BACKEND_URL+'theme/'+id+'/', {
                method: 'PUT',
                body: JSON.stringify({
                    reset: true
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + String(localStorage.getItem('token')),
                },
            })
            .then(res => res.json())
            .then(response => (
                console.log('Success: ', JSON.stringify(response),
                history.push('/m/theme-detail')
            )))
            .catch(error => console.error('Error:', error));
        } else {
            setNotCorrect("Reset Code가 일치하지 않습니다.")
        }
    }

    const onChange = (event: any) => {
        setValue(event.target.value)
    }

    const onClickBack = () => {
        history.push('/m/theme-detail')
    }


    return (
        <div>
            <form>
                <div className="text-center my-28">
                    <h1 className="text-white text-2xl mb-2">{escapeRoom}</h1>
                    <h1 className="text-white text-4xl font-bold">{name}</h1>
                </div>
                <div className="flex items-center justify-center px-14 pt-12">
                    <input className="bg-primary border-b-2 outline-none w-full placeholder-white border-white text-white" onChange={onChange} placeholder="Reset Code를 입력해주세요" autoFocus={true}/>
                </div>
                <div className="mt-10 px-14">
                    <button className="border-2 border-white w-full mb-3 hover:shadow-lg shadow hover:bg-secondary p-1" onClick={onClickEnter} type="submit"><h1 className="text-white">Reset</h1></button>
                    <button className="border-2 border-white w-full hover:shadow-lg shadow hover:bg-secondary p-1" onClick={onClickBack} type="button"><h1 className="text-white">관리자가 아닐시 돌아가기</h1></button>
                </div>
                <div className="text-center py-6 text-white font-semibold">
                    <h1>{notCorrect}</h1>
                </div>
            </form>
        </div>
    )
}