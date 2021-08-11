import React, {useState} from 'react';
import accounts from '../../img/accounts1.png'
import { BACKEND_URL } from '../../backend';


const Login = () => {
    const [notCorrect, setNotCorrect] = useState("")
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitHandler = (event:React.ChangeEvent<any>) => {
        event.preventDefault();
        fetch(BACKEND_URL+'api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:id, password:password})
        })
        .then(res => res.json())
        .then(json => {
            if (json.non_field_errors) {
                setNotCorrect("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.")
                setPassword("");
            } else {
                console.log(json.non_field_errors);
                localStorage.setItem('token', json.token);
                localStorage.setItem('profileId', json.profile_id);                
                window.location.reload();
            }
        })
    }


    return (
        <div className="h-screen">
            <div className="container mx-auto py-11 h-full flex flex-wrap content-center justify-center">
                <div className="grid justify-items-center">
                    <h1 className="text-4xl text-white font-semibold mb-1">HintPhone</h1>
                    <h1 className="text-3xl text-white font-medium mb-4">관리자 로그인</h1>
                    <div className="border-white rounded-md border-2 w-80 p-10">
                        <img src={accounts} width="130" height="130" className="mx-auto" alt="login"/>
                        <form
                            onSubmit={onSubmitHandler} 
                            className="grid gap-5 mt-8"
                            >
                            <input
                                required
                                onChange={(e) => setId(e.target.value)}
                                name="id"
                                className="bg-primary border-b-2 outline-none text-white" 
                                placeholder="ID"
                                autoComplete='off'
                            />
                            <input
                                required
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-primary border-b-2 outline-none text-white" 
                                placeholder="Password" 
                                type="password"
                                autoComplete='off'
                                value={password}
                            />
                            <div className="">
                                <button className="border-2 w-full mb-3 hover:shadow-lg shadow hover:bg-secondary border-white" type="submit"><h1 className="text-white">LOGIN</h1></button>
                                <button className="border-2 w-full hover:shadow-lg shadow hover:bg-secondary border-white"><h1 className="text-white">CONNECT</h1></button>
                            </div>
                        </form>
                        <div className="pt-3">
                            <h1 className="text-center text-red-700 font-bold">{notCorrect}</h1>
                        </div>
                    </div>
                    <div className="h-11"/>
                    <div className="h-11"/>
                    <div className="h-11"/>
                    <div className="h-11"/>
                </div>
            </div>
        </div>
    )
}

export default Login;