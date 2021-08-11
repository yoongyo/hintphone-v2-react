import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { BACKEND_URL } from '../../backend';

export const Hint = () => {
    const [main_hint, setMain_hint] = useState(""); 
    const [sub_hint, setSub_hint] = useState(""); 
    const [main_hint_text, setMain_hint_text] = useState(""); 
    const [sub_hint_text, setSub_hint_text] = useState(""); 
    const [subHintText, setSubHintText] = useState("");
    const [subHint, setSubHint] = useState("");
    let history = useHistory();

    useEffect(() => {        
        const hintNumber = localStorage.getItem("hintNumber");
        const themeId = localStorage.getItem("themeId");
        fetch(BACKEND_URL+'theme/'+themeId+'/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + String(localStorage.getItem('token')),
            }
        })
        .then(res => res.json())
        .then(json => {
            setMain_hint(json["hint"+hintNumber])
            setSub_hint(json["sub_hint"+hintNumber])
            setMain_hint_text(json["textHint"+hintNumber])
            setSub_hint_text(json["sub_textHint"+hintNumber])
        })
    }, [])

    const subHintClick = () => {
        setSubHint(sub_hint);
        setSubHintText(sub_hint_text);        
    }

    const back = () => {
        history.goBack();
    }
    
    return(
        <div className="text-center px-3 mt-48">
            {main_hint && <div className="grid justify-items-center"><audio className="w-full" src="https://hintphone.s3.amazonaws.com/mp3/0002.mp3" autoPlay={true} controls controlsList="nodownload"/></div>}
            <div dangerouslySetInnerHTML={{ __html: main_hint_text }} className="text-white py-10"/>
            {(sub_hint_text || sub_hint) && <div><button className="border-2 border-white rounded-lg py-2 text-white px-10 shadow-2xl my-10" onClick={subHintClick}><h1>구체적인 힌트</h1></button></div>}
            {subHint && <div className="grid justify-items-center"><audio className="w-full" src="https://hintphone.s3.amazonaws.com/mp3/0002.mp3" autoPlay={true} controls controlsList="nodownload"/></div>}
            {subHintText && <div dangerouslySetInnerHTML={{ __html:  subHintText}} className="text-white py-10"/>}
            <div className="mb-20">
                <button className="border-2 border-white rounded-lg py-2 text-white px-10 mt-10 shadow-2xl" onClick={back}>
                    <h1>다른 힌트 사용하러가기</h1>
                </button>
            </div>
        </div>
    )
}