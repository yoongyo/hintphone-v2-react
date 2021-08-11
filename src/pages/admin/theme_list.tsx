import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { BACKEND_URL } from '../../backend';

export default function ThemeList() {
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
                console.log(json)
                setThemeList(json.themes);
                setEscapeRoom(json.escape_room);
                localStorage.setItem('escapeRoom', json.escape_room);
                console.log(json.escape_room);
                console.log(json.themes);
            })
        }
    }, [])

    function logOut() {
        localStorage.setItem('token', '');
        history.replace('/logout');
        window.location.reload();
    }

    function onClick(id:any) {
        localStorage.setItem('themeId', String(id));
        history.push('/theme-edit');
        window.location.reload();
    }


    return (
        <div className="container mx-auto">
            <div className="text-center py-24">
                <div className="text-white text-3xl">{escapeRoom}</div>
                <div className="text-white text-2xl mt-3">테마 수정</div>
            </div>
            <div className=" mb-2 flex mx-auto items-center justify-center">
                <ul className="flex flex-col p-4">
                    {themeList.map(({id, name}) => (
                        <li className="flex flex-row mb-5">
                            <button className=" max-w-2xl select-none flex flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-white" onClick={() => onClick(id)}>
                                <div className="flex-1 pl-1 mr-16">
                                    <div className="font-medium text-white text-2xl w-80">
                                        <h1>{name}</h1>
                                    </div>
                                </div>
                                <div className="w-1/4 text-wrap text-center flex text-white text-bold flex-col rounded-md bg-secondary justify-center items-center mr-5 p-3">
                                    <h1>Edit</h1>
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
