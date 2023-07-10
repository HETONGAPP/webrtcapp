import { BUTTON_TYPES } from "@/constants";
import Image from "next/image";

function Button({ onClick, text, icon, type, className = '', disabled = false, loading = false, custom = false }: any) {

    if (!custom) {
        if (icon && !text) return (
            <button disabled={disabled} className={`p-[4px] border-[#262F40] items-center flex justify-center flex w-[44px] h-[44px] rounded-[22px] border-0 items-center justify-center ${className}`} onClick={onClick}>
                <Image className={loading ? 'animate-spin' : ''} width='20' height='20' alt={text || 'btn'} src={icon} />
            </button>);
        else if (text && !icon) return (
            <button disabled={disabled} className={`p-[4px] border-[#262F40] rounded-[4px] items-center flex justify-center px-[12px] py-[8px] h-[34px] ${className}`} onClick={onClick}>
                <span className="text-[12px] font-normal leading-3">{text}</span>
            </button>
        );
        else if (type === BUTTON_TYPES.H) return (
            <button disabled={disabled} className={`p-[4px] border-[#262F40] rounded-[4px] items-center flex justify-center ${className}`} onClick={onClick}>
                <div className='flex-row flex p-[5px] justify-between items-center w-full h-full'>
                    <Image className={loading ? 'animate-spin' : ''} width='16' height='16' alt={text || 'btn'} src={icon} />
                    <span className="sm:block hidden ml-[8px] text-[12px] font-normal leading-3">{text}</span>
                </div>
            </button>
        );
        else return (
            <button disabled={disabled} className={`p-[4px] border-[#262F40] rounded-[4px] items-center flex justify-center aspect-square sm:w-[60px] w-[40px] ${disabled ? 'bg-[#192234]' : ''} ${className}`} onClick={onClick}>
                <div className='flex-col flex p-[5px] justify-between items-center w-full h-full'>
                    <Image className={'sm:w-[20px] w-[15px] aspect-square ' + (loading ? 'animate-spin' : '')} width='0' height='0' alt={text || 'btn'} src={icon} />
                    <span className={`sm:text-[12px] text-[8px] font-normal leading-3 ${disabled ? 'text-[#BABDC2]' : ''}`}>{text}</span>
                </div>
            </button>
        );
    }
    return (
        <button disabled={disabled} className={`${className}`} onClick={onClick}>
            <a
                //className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    Downloads{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Download the files.
                </p>
            </a>
        </button>)

};

export default Button;