import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { BACKEND_URL } from '../../backend';


export default function ThemeListM() {
    const [themeList, setThemeList] = useState([]); 
    const [escapeRoom, setEscapeRoom] = useState("");
    let history = useHistory();
    useEffect(() => {        
        if (localStorage.getItem('profileId')) {
            fetch(BACKEND_URL+'profile/'+localStorage.getItem('profileId')+'/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + String(localStorage.getItem('token')),
                }
            })
            .then(res => res.json())
            .then(json => {
                setThemeList(json.themes);
                setEscapeRoom(json.escape_room);
                localStorage.setItem('escapeRoom', json.escape_room);
                localStorage.setItem('resetCode', json.reset);
                console.log(json.reset)
                console.log(json.escapeRoom);
                console.log(json.themes);
            })
        }
    }, [])

    function logOut() {
        localStorage.setItem('token', '');
        history.replace('/m/logout');
        console.log(themeList)
        window.location.reload();
    }

    function onClick(id:any, enterKey:any, name: any) {
        console.log(id)
        localStorage.setItem('themeId', String(id));
        localStorage.setItem('themeEnterKey', String(enterKey));
        localStorage.setItem('themeName', String(name))
        history.push('/m/enter');
        window.location.reload();
    }


    return (
        <div className="">
            <div className="text-center my-14">
                <div className="text-white text-2xl font-semibold mb-1">{escapeRoom}</div>
                <div className="text-white text-xl">테마 선택</div>
            </div>
            <div className="flex mx-auto items-center justify-center">
                <ul className="flex flex-col">
                    {themeList.map(({id, name, enterKey}) => (
                        <li className="flex flex-row mb-5">
                            <button className="select-none flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-white mx-auto" onClick={() => onClick(id, enterKey, name)}>
                                <div className="">
                                    <div className="font-medium text-white text-2xl text-center">
                                        <h1>{name}</h1>
                                    </div>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-center flex mx-auto items-center justify-center my-10">
                <button className="text-white font-semibold text-xl w-48 bg-secondary p-5 rounded-md hover:bg-opacity-90 hover:shadow-xl" onClick={logOut}>LOG OUT</button>
            </div>
        </div>

    )
}
