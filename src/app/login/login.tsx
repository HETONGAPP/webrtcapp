"use client"

import { useEffect, useState, useRef } from "react"
import Button from '@/components/Button';
import { BUTTON_TYPES } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from 'react-modal';
import ReactCodeInput from "react-code-input";
export default function Login() {
    const router = useRouter();
    const [loginModal, setLoginModal] = useState(true);
    const [password, setPassword] = useState(Array(6).fill(""));
    const passwordInputRefs = useRef<HTMLInputElement[]>([]);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [text, setText] = useState('');
    function onLoginModal(flag: boolean) {
        setLoginModal(flag);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '12px',
            background: '#0D1629',
            borderColor: '#212630'
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(2px)'
        }
    };

    function handleLoginModal(flag: boolean) {
        setLoginModal(flag);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Check the entered password
        if (isPasswordCorrect) {
            // Password is correct, navigate to the desired page
            router.push("/files");
        }
    };

    // const handleInputChange = (
    //     index: number,
    //     event: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     const value = event.target.value;

    //     if (value.length > 0) {
    //         // Move to the next input field
    //         if (index < passwordInputRefs.current.length - 1) {
    //             if (index < passwordInputRefs.current.length - 1) {
    //                 passwordInputRefs.current[index + 1]!.focus();
    //             }
    //         }

    //         // Update the password value
    //         const updatedPassword = [...password];
    //         updatedPassword[index] = value;
    //         setPassword(updatedPassword);

    //         // Check if the full password has been entered
    //         if (index === 4) {
    //             setIsPasswordCorrect(updatedPassword.join("") === "123456");
    //         }
    //     }
    // };

    const [codeValues, setCodeValues] = useState('');

    const handleInputChange = (value: string) => {
        setCodeValues(value);
        validation();
    };

    function validation() {
        return codeValues == "227752" ? true : false;
    }

    return (
        <div className="relative flex flex-col justify-center mx-auto items-center bg-transparent w-3/4 place-items-center before:absolute before:h-[600px] before:w-[960px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-80 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">

            <Modal
                isOpen={loginModal}
                // onRequestClose={closeRemoveModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Password validation"
            >
                <div className='font-semibold text-[14px] px-[8px] py-[4px] border-[#192234] border-b mb-[20px]'>Password validation</div>
                <div>
                    <ReactCodeInput type='number' fields={6} name={""} inputMode={"tel"} onChange={handleInputChange} />

                    <Button className='px-[24px] py-[10px]' text='Cancel' />
                    <Button className='px-[24px] py-[10px] bg-[#6C208F]' text='Confirm' onClick={() => validation() == true ? router.push('/records') : null} />
                </div>
            </Modal>



        </div>

    );
}
