

"use client";

import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { BUTTON_TYPES } from '@/constants';
import { remove } from '@/helpers/fileManagementHelper';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from 'react-modal';

export default function Files({ freeSpace, edgeFiles }: any) {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [removeModalInfo, setRemoveModalInfo] = useState<any>({ open: false, fileName: null });
    const [processModal, setProcessModal] = useState<any>(false);
    const [localZips, setLocalZips] = useState<any>([]);
    const [localPlys, setLocalPlys] = useState<any>([]);
    const searchParams = useSearchParams();
    const localProcess = searchParams.get('localProcess') === 'true';

    useEffect(() => {
        if (localProcess) refreshLocalFiles();
    }, []);

    const refreshLocalFiles = async () => {
        setLocalZips((await (await fetch('http://localhost:8767/listzip', { method: 'POST', cache: "no-cache" })).text()).split('\n').map(fileName => {
            const path = fileName.split('/');
            return path[path.length - 1];
        }));
        setLocalPlys((await (await fetch('http://localhost:8767/listply', { method: 'POST', cache: "no-cache" })).text())
            .split('\n')
            .filter(fileName => !fileName.includes('*'))
            .map(fileName => {
                const path = fileName.split('/');
                return path[path.length - 1];
            }));
    };

    const download = (fileName: string) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = '/download?file=' + fileName;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    const refreshLists = async () => {
        if (localProcess) refreshLocalFiles();
        setIsRefreshing(true);
        router.refresh()
    };

    useEffect(() => {
        setIsRefreshing(false);
    }, [freeSpace, edgeFiles]);

    const processCustomStyles = {
        content: {
            width: '80%',
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

    function openRemoveModal(fileName: string) {
        setRemoveModalInfo({ open: true, fileName });
    }

    function closeRemoveModal() {
        setRemoveModalInfo({ open: false, fileName: null });
    }

    function openProcessModal() {
        setProcessModal(true);
    }

    function closeProcessModal() {
        setProcessModal(false);
    }

    return (
        <div className="relative flex flex-col justify-center mx-auto items-center bg-transparent w-3/4 place-items-center before:absolute before:h-[600px] before:w-[960px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-80 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">


            <Modal
                isOpen={processModal}
                onRequestClose={closeProcessModal}
                style={processCustomStyles}
                ariaHideApp={false}
                contentLabel="Delete Recording Modal"
            >
                <div className='font-semibold text-[14px] px-[8px] py-[4px] border-[#192234] border-b mb-[20px]'>Process Progress</div>
                <div className='flex flex-coljustify-between h-full my-[20px]'>
                    <iframe id="my-iframe" src={`http://127.0.0.1:8765/`} className='w-full h-[400px] overflow-auto mb-[20px]' />
                </div>
                <div className='flex flex-row w-full justify-end gap-[4px]'>
                    <Button className='border-[1px] px-[24px] py-[10px] border-[1px]' onClick={closeProcessModal} text='Close' />
                </div>
            </Modal>

            <Modal
                isOpen={removeModalInfo.open}
                onRequestClose={closeRemoveModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Delete Recording Modal"
            >
                <div className='font-semibold text-[14px] px-[8px] py-[4px] border-[#192234] border-b mb-[20px]'>Delete Recording</div>
                <div className='sm:px-[104px] px-[20px] mb-[20px] font-normal text-[12px] text-center w-full'>Are you sure you want to delete {removeModalInfo.fileName}?</div>
                <div className='sm:px-[104px] px-[20px] mb-[20px] font-normal text-[12px] text-center w-full'>{removeModalInfo.fileName} will be permanently deleted</div>
                <div className='flex flex-row w-full justify-end gap-[4px]'>
                    <Button className='px-[24px] py-[10px]' onClick={closeRemoveModal} text='Cancel' />
                    <Button className='px-[24px] py-[10px] bg-[#6C208F]' text='Delete' onClick={() => {
                        remove(removeModalInfo.fileName).then(refreshLists).then(closeRemoveModal);
                    }} />
                </div>
            </Modal>

            <div className='w-full flex flex-row justify-between items-center mb-[12px]'>
                <div className='flex flex-row w-fit items-center'>
                    <Button className='bg-[#1A2335]' icon='/back.svg' onClick={() => router.push('/viewer')} />
                    <span className='ml-[20px] font-semibold text-[16px]'> Back to Camera</span>
                </div>
                <Button className='bg-[#1A2335] rounded-[8px]' type={BUTTON_TYPES.H} text='Refresh' icon='/refresh.svg' onClick={refreshLists} loading={isRefreshing} />
            </div>

            <div className='bg-[#0D1629] p-[12px] w-full rounded-[8px] mb-[30px]'>
                <div className='flex flex-row justify-between w-full mb-[8px] px-[12px] py-[16px] border-b border-[#192234]'>
                    <div className='font-semibold sm:text-[16px] text-[11px]'>Luxolis SceneCap 3D</div>
                    <div className='flex flex-row items-center font-semibold sm:text-[12px] text-[10px]'>Remaining Storage:&nbsp;<span className='font-normal'>{freeSpace}</span></div>
                </div>
                {edgeFiles.map(({ fileName, fileSize }: any) => {
                    return <div className='w-full bg-[#192234] rounded-[4px] mb-[8px] p-[8px] text-[12px] flex flex-row justify-between items-center' key={fileName}>
                        <div className='flex flex-row items-center'>
                            <div>{fileName}</div>
                            <div className='sm:block hidden mx-[12px] w-[4px] h-[4px] rounded-[4px] bg-[#303848]' />
                            <div className='sm:block hidden'>{fileSize}</div>
                        </div>
                        <div className='flex gap-[12px]'>
                            <Button className='bg-[#3C4352]' type={BUTTON_TYPES.H} icon='/dl.svg' text='Download' onClick={() => {
                                download(fileName);
                            }} />
                            <Button className='bg-[#3C4352]' type={BUTTON_TYPES.H} text='Delete' icon='/trash.svg' onClick={() => openRemoveModal(fileName)} />
                        </div>
                    </div>
                })}
            </div>

            {searchParams.get('localProcess') &&
                <>
                    <div className='bg-[#0D1629] p-[12px] w-full rounded-[8px] mb-[30px]'>
                        <div className='flex flex-row justify-between w-full mb-[8px] px-[12px] py-[16px] border-b border-[#192234]'>
                            <div className='font-semibold sm:text-[16px] text-[11px]'>Local Raw Captures</div>
                            <div className='flex flex-row items-center font-semibold sm:text-[12px] text-[10px] border-[1px]'><Button text='Show Logs' onClick={openProcessModal} /></div>
                        </div>
                        {localZips.map((fileName: any) => {
                            return <div className='w-full bg-[#192234] rounded-[4px] mb-[8px] p-[8px] text-[12px] flex flex-row justify-between items-center' key={fileName}>
                                <div className='flex flex-row items-center'>
                                    <div>{fileName}</div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <Button className='border-[1px]' type={BUTTON_TYPES.H} text='Process' onClick={() => {
                                        fetch('http://localhost:8767/process', { method: 'POST', cache: "no-cache", body: fileName }).then(refreshLists);
                                        openProcessModal();
                                    }} />
                                </div>
                            </div>
                        })}
                    </div>

                    <div className='bg-[#0D1629] p-[12px] w-full rounded-[8px]'>
                        <div className='flex flex-row justify-between w-full mb-[8px] px-[12px] py-[16px] border-b border-[#192234]'>
                            <div className='font-semibold sm:text-[16px] text-[11px]'>Local Processed Models</div>
                        </div>
                        {localPlys.map((fileName: any) => {
                            return <div className='w-full bg-[#192234] rounded-[4px] mb-[8px] p-[8px] text-[12px] flex flex-row justify-between items-center' key={fileName}>
                                <div className='flex flex-row items-center'>
                                    <div>{fileName}</div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <Button className='border-[1px]' type={BUTTON_TYPES.H} text='View' onClick={() => {
                                        fetch('http://localhost:8766/view', { method: 'POST', cache: "no-cache", body: fileName });
                                    }} />
                                </div>
                            </div>
                        })}
                    </div>
                </>
            }

        </div>


    );
}