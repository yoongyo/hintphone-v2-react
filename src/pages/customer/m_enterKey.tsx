import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

export const EnterKey = () => {
    const [value, setValue] = useState("");
    const [notCorrect, setNotCorrect] = useState("");
    const enterKey = localStorage.getItem('themeEnterKey');
    const name = localStorage.getItem('themeName');
    let history = useHistory();

    const onClickEnter = () => {
        if(enterKey === value) {
            history.push('/m/theme-detail')
        } else {
            setNotCorrect("Enter Key가 일치하지 않습니다.")
        }
    }

    const onChange = (event: any) => {
        setValue(event.target.value)
    }

    const onClickBack = () => {
        history.push('/m/theme-list')
    }
    return (
        <div>
            <form>
                <div className="text-center my-28">
                    <h1 className="text-white">{name}</h1>
                    <h1 className="text-white text-4xl font-bold">Enter Key</h1>
                </div>
                <div className="flex items-center justify-center px-14 pt-12">
                <input className="bg-primary border-b-2 outline-none w-full placeholder-white border-white text-white" onChange={onChange} placeholder="Enter Key를 입력해주세요" autoFocus={true}/>
                </div>
                <div className="mt-10 px-14">
                    <button className="border-2 border-white w-full mb-3 hover:shadow-lg shadow hover:bg-secondary p-1" onClick={onClickEnter} type="submit"><h1 className="text-white">Enter</h1></button>
                    <button className="border-2 border-white w-full hover:shadow-lg shadow hover:bg-secondary p-1" onClick={onClickBack} type="button"><h1 className="text-white">Back</h1></button>
                </div>
                <div className="text-center py-6 text-white font-semibold">
                    <h1>{notCorrect}</h1>
                </div>
            </form>
        </div>
    )
}