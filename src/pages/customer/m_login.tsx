import React, {useState} from 'react';
import accounts from '../../img/accounts1.png'
import { BACKEND_URL } from '../../backend';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        paddingTop: 0,
        paddingBottom: 0,
    },
};

const LoginM = () => {
    const [modal, setModal] = useState(false)
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

    const modalClick = () => {
        setModal(!modal);
    }
    
    


    return (
        <div className="h-screen">
            <div className="container mx-auto py-11 h-full flex flex-wrap content-center justify-center px-5">
                <div className="grid justify-items-center">
                    <h1 className="text-4xl text-white font-semibold mb-1">Hint Phone</h1>
                    <h1 className="text-3xl text-white font-medium mb-4">고객용 로그인</h1>
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
                                <button className="border-2 w-full hover:shadow-lg shadow hover:bg-secondary border-white" onClick={modalClick} type="button"><h1 className="text-white">CONNECT</h1></button>
                                <ReactModal 
                                    isOpen={modal}
                                    contentLabel="Connect"
                                    style={customStyles}
                                >
                                    <div className="flex justify-between my-5">
                                        <h1 className="text-xl font-bold">Connect</h1>
                                        <button className="flex text-2xl font-bold" onClick={modalClick}>
                                            <h1>×</h1>
                                        </button>
                                    </div>
                                    <hr/>
                                    <div className="my-12">
                                        <h1><span className="font-bold">Email</span> : biachoollab@naver.com</h1>
                                        <h1><span className="font-bold">Phone</span> : 010-3076-3572</h1>
                                    </div>
                                    <hr/>
                                    <div className="text-center">
                                        <button className="my-5" onClick={modalClick}>
                                            <h1>closs</h1>
                                        </button>
                                    </div>

                                </ReactModal>
                            </div>
                        </form>
                        <div className="pt-3">
                            <h1 className="text-center text-red-700 font-bold">{notCorrect}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginM;