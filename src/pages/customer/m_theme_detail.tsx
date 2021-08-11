import React, {useState, useEffect} from 'react';
import reset from '../../img/reset1.png'
import question from '../../img/question.png'
import { useHistory } from 'react-router-dom';
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

export const ThemeDetailM = () => {
    const [modal, setModal] = useState(false)
    const [hintCount, setHintCount] = useState("");
    const [currentCount, setCurrentCount] = useState("");
    const [currentHint, setCurrentHint] = useState("");
    const [ value, setValue ] = useState("");
    const escapeRoom = localStorage.getItem('escapeRoom');
    const name = localStorage.getItem('themeName');
    let history = useHistory();

    const hintCodeList = [
        'DB38', 'DA60', 'CA59', 'BD67', 'AC35',
        'BC71', 'AD58', 'CB88', 'CD37', 'CC38',
        'DC54', 'DD88', 'DB34', 'AB65', 'CA29',
        'BC63', 'AC25', 'BC31', 'AD98', 'CB48',
        'CD27', 'CC98', 'DC01', 'DD08', 'BC51',
        'CD47', 'CB02', 'DC14', 'CC58', 'DD48',
        
        'BC77', 'CD44', 'DC55', 'DD90', 'BC53',
        'CD93', 'CB21', 'DC22', 'CC11', 'DD65',
        'EA10', 'EB31', 'EC52', 'EA73', 'EB94',
        'FA20', 'FB41', 'FC62', 'FA83', 'FB04',
        'EA11', 'EB32', 'EC53', 'EA74', 'EB85',
        'FA31', 'FB52', 'FC73', 'FA94', 'FB15',

        'EA20', 'EB41', 'EC62', 'EA83', 'EB04',
        'FA10', 'FB31', 'FC52', 'FA73', 'FB94',
        'GA20', 'GB41', 'GC62', 'GA83', 'GB04',
        'GA10', 'GB31', 'GC52', 'GA73', 'GB94',
    ]

    useEffect(() => {      
        fetch(BACKEND_URL+'theme/'+localStorage.getItem('themeId')+'/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + String(localStorage.getItem('token')),
            },
        })
        .then(res => res.json())
        .then(json => {
            setCurrentCount(json["currentCount"]);
            setCurrentHint(json["currentHint"]);
            setHintCount(json["hintCount"]);
        })
    }, [])

    const onSubmit = (event:any) => {
        const code = event.target[0].value;
        event.preventDefault();
        if (hintCodeList.indexOf(code.toUpperCase()) !== -1) {
            const currentHintList = currentHint.split(',');
            const hintNumber = hintCodeList.indexOf(code.toUpperCase()) + 1
            localStorage.setItem("hintNumber", String(hintNumber));
            setValue("");
            if(currentHintList.indexOf(String(hintNumber)) === -1) {
                if (currentCount < hintCount) {
                    fetch(BACKEND_URL+'theme/'+localStorage.getItem('themeId')+'/', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token ' + String(localStorage.getItem('token')),
                        },
                        body: JSON.stringify({
                            addCount: true,
                            currentCount: currentCount+1,
                            currentHint: currentHint+String(hintNumber)+',',
                        }),
                    })
                    .then(res => res.json())
                    .then(response => console.log('Success: ', response))
                    .catch(error => console.error('Error:', error))
                    history.push('/m/hint');
                } else {
                    history.push('/m/not-hint-count');
                }
            } 
            else {
                console.log("이미 한번 사용한 힌트")
                history.push('/m/hint');
            }
        } else {
            setValue("존재하지 않는 힌트코드입니다.")
        }
    }

    const resetButton = () => {
        history.push('/m/reset');
    }

    const modalClick = () => {
        setModal(!modal);
    }

    return (
        <div className="w-screen h-screen grid grid-cols-1">
            <div className="text-center text-white my-auto">
                <h1 className="text-2xl mb-2 font-bold">{escapeRoom}</h1>
                <h1 className="text-3xl">{name}</h1>
            </div>
            <form className="my-auto" onSubmit={onSubmit} >
                <div className="flex px-12">
                    <h1 className="border-2 text-sm rounded-l px-4 py-2 bg-secondary text-white text-center">HINT CODE</h1>
                    <input name="field_name" className="w-full border-r-2 outline-none rounded-r pl-3" type="text" placeholder="대•소문자 구분 X" autoComplete='off'/>
                </div>
                <div className="p-3 text-center">
                    <h1 className="text-red-700">{value}</h1>
                </div>
            </form>
            <div className="text-center text-white my-auto">
                <h1 className="text-3xl font-bold">HINT COUNT</h1>
                <h1 className="text-3xl font-semibold">{currentCount} / {hintCount}</h1>
            </div>
            
            <div className="fixed bottom-5 left-5">
                <button onClick={resetButton}>
                    <img src={reset} width={50} alt="reset"/>
                </button>
            </div>
            <div className="fixed bottom-5 right-5">
                <button onClick={modalClick}>
                    <img src={question} width={50} alt="question"/>
                </button>
                <ReactModal 
                    isOpen={modal}
                    contentLabel="Minimal Modal Example"
                    style={customStyles}
                >
                    <div className="flex justify-between my-5">
                        <h1 className="text-xl font-bold">힌트 사용방법</h1>
                        <button className="flex text-2xl font-bold" onClick={modalClick}>
                            <h1>×</h1>
                        </button>
                    </div>
                    <hr/>
                    <div className="my-5">
                        <h1 className="font-bold">힌트폰 사용안내</h1><br/>
                        <h1>1. 힌트가 필요한 문제의 힌트 코드를 힌트 코드란에 입력합니다.</h1><br/>
                        <h1>2. 힌트 코드는 대소문 구분없이 입력 가능합니다.</h1><br/>
                        <h1>3. 힌트는 최대 {hintCount}회 까지만 사용이 가능합니다.</h1><br/>
                        <h1>4. 한번 사용한 힌트는 카운팅 없이 연속 사용이 가능합니다.</h1><br/>
                    </div>
                </ReactModal>
            </div>
        </div>
    )
}