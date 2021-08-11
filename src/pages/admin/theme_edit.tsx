import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { BACKEND_URL } from '../../backend';
import JoditReact from "jodit-react-ts";
import 'jodit/build/jodit.min.css';

const hintCodeList = [
    'code',
    'DB38', 'DA60', 'CA59', 'BD67', 'AC35',
    'BC71', 'AD58', 'CB88', 'CD37', 'CC38',
    'DC54', 'DD88', 'DB34', 'AB65', 'CA29',
    'BC63', 'AC25', 'BC31', 'AD98', 'CB48',
    'CD27', 'CC98', 'DC01', 'DD08', 'BC51',
    'CD47', 'CB02', 'DC14', 'CC58', 'DD48',
]

export function ThemeEdit() {
    const [data, setData] = useState({
        "id": "", "name": "", "enterKey": "", "hintCount": "",
        "hint1": "", "sub_hint1": "", "textHint1": "", "sub_textHint1": "",
    });
    const [themeName, setThemeName] = useState("");
    const escapeRoom = localStorage.getItem('escapeRoom');
    let history = useHistory();

    useEffect(() => {        
        fetch(BACKEND_URL+'theme/'+localStorage.getItem('themeId')+'/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + String(localStorage.getItem('token')),
            }
        })
        .then(res => res.json())
        .then(json => {
            setData(json)
            setThemeName(json.name);
        })
    }, [])

    function submint(event:any) {
        event.preventDefault();
        console.log(data);
        history.push('/theme-list');
    }

    const { name, enterKey, hintCount, 
        hint1, sub_hint1, textHint1, sub_textHint1,
    } = data   

    const onChange = (e:any) => {
        console.log(e)
        const { id, value } = e.target   
        const nextInputs = {            
            ...data,  
            [id]: value,
        }
        setData(nextInputs);     
    }
    
    return (
        <div className="py-12 container mx-auto">
            <form method="PUT" onSubmit={submint} >
                <div className="px-28">
                    <div className="text-center py-16">
                        <div className="text-white text-3xl">{escapeRoom}</div>
                        <div className="text-white text-2xl mt-3">{themeName}</div>
                    </div>
                    <div className="mt-12 rounded-3xl p-5 border-4 border-secondary">
                        <div className="text-white text-2xl -mt-10 bg-primary w-32 text-center">테마 수정</div>
                        <div className="flex text-white text-xl font-semibold">
                            <div className="flex flex-1 p-6 mx-1">
                                <h1>테마명: </h1>
                                <input id="name" className="border-2 rounded-lg text-black outline-none w-3/5 ml-5 px-2" value={name} onChange={onChange}/>
                            </div>
                            <div className="flex flex-1 p-6 mx-1">       
                                <h1>Enter Key: </h1>
                                <input id="enterKey" className="border-2 rounded-lg text-black outline-none w-1/2 ml-5 px-2" value={enterKey} onChange={onChange}/>
                            </div>
                            <div className="flex flex-1 p-6 mx-1">                            
                                <h1>힌트 허용 개수: </h1>
                                <input id="hintCount" className="border-2 rounded-lg text-black outline-none w-1/2 ml-5 px-2" type="number" value={hintCount} onChange={onChange} min={1}/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 rounded-3xl p-5 border-4 border-secondary">
                        <div className="text-white text-2xl -mt-10 bg-primary w-48 text-center">Hint 1 ({hintCodeList[1]})</div>
                        <form method="POST" className="flex">
                            <div className="flex-1 p-6 mx-1">
                                <div className="mb-2">
                                    <label className="text-xl text-white">Main Hint </label>
                                    <JoditReact onChange={(content) => console.log(content)} defaultValue={textHint1}/>
                                </div>
                                <div className="flex">
                                    <label className="w-64 text-sm border-2 rounded-l py-2 bg-secondary hover:bg-opacity-90 border-secondary text-white font-bold text-center">
                                        <span className="text-base">
                                            힌트 선택
                                            <input id="hint1" type="file" style={{ "display": "none"}} onChange={onChange}/>
                                        </span>
                                    </label>
                                    <input name="field_name" className="border-2 rounded-r px-4 py-2 w-full" type="text" value={hint1} readOnly/>
                                </div>
                            </div>
                            <div className="flex-1 p-6 mx-1">
                                <div className="mb-2">
                                    <label className="text-xl text-white">Sub Hint </label>
                                    <textarea className="border-2 border-gray-500" value={sub_textHint1} id="sub_textHint1" onChange={onChange}/>
                                </div>
                                <div className="flex">
                                    <label className="w-64 text-sm border-2 rounded-l py-2 bg-secondary hover:bg-opacity-90 border-secondary text-white font-bold text-center">
                                        <span className="text-base">
                                            힌트 선택
                                            <input id="sub_hint1" type="file" style={{ "display": "none"}} onChange={onChange}/>
                                        </span>
                                    </label>
                                    <input name="field_name" className="border-2 rounded-r px-4 py-2 w-full" type="text" value={sub_hint1} readOnly/>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div>
                        
                    </div>
                     
                    <div className="fixed bottom-14 right-14">
                        <button type="submit" className="inline-block px-6 py-2 leading-6 text-center text-white uppercase transition bg-secondary rounded-full shadow ripple hover:shadow-lg hover:bg-opacity-90 focus:outline-none text-xl font-bold">
                            완료
                        </button>
                    </div>
                </div>
            </form>
        </div>  

    )
}