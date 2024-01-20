import React, { useEffect } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { NavLink, Outlet } from 'react-router-dom';
import weatherStore from '../stores/weatherStore';
import { IToast } from '../types/definitions';

const pages = [
    { path: '/forecasts', text: 'List' },
    { path: '/add-forecast', text: 'Add' },
];

const toggleScrollBtn = (): void => {
    const btn = document.getElementById("scrollToTopBtn");

    if (window.scrollY > 80) {
        btn?.classList.add('flex');
        btn?.classList.remove('hidden');
    } else {
        btn?.classList.add('hidden');
        btn?.classList.remove('flex');
    }
};

const useScrollToggle = (): void => {
    useEffect(() => {
        document.addEventListener('scroll', toggleScrollBtn);

        () => {
            document.removeEventListener('scroll', toggleScrollBtn);
        };
    }, []);
};

const Toasts: React.FC = observer((): React.ReactElement | null => {
    const { toastsQueue } = weatherStore;

    if (!toastsQueue.length) return null;
    return (
        <div className='top-[98px] fixed w-full flex flex-col items-center z-10'>
            {weatherStore.toastsQueue.map((toast: IToast) => {
                return (
                    <div
                        key={toast.id.toString()}
                        className={clsx('py-2 px-9 mt-2 text-center rounded-lg text-white',
                            toast.status === 'success' ? 'bg-green-500' :
                                toast.status === 'info' ? 'bg-blue-300' : 'bg-red-600'
                        )}
                    >
                        {toast.msg}
                    </div>
                );
            })}
        </div>
    );
});

const ScrollToTopBtn: React.FC = (): React.ReactElement => {
    return (
        <div className='fixed bottom-5 justify-center w-full hidden' id="scrollToTopBtn">
            <button
                className='bg-gray-900  rounded py-2 px-3 text-white'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <svg
                    className="w-6 h-6 stroke-white"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </div>
    );
};

const Nav: React.FC = (): React.ReactElement => {
    return (
        <nav className='w-full p-4 border-b-2 flex flex-col items-center'>
            <div>
                <span className='font-bold text-4xl font-mono text-gray-700'>WeatherApp</span>
            </div>
            <ul className='flex text-gray-700'>
                {pages.map(({ path, text }: { path: string, text: string; }, i: number) => (
                    <li key={i} className='mr-4 hover:underline'>
                        <NavLink to={path} className={({ isActive }) => isActive ? 'font-bold underline' : ''}>
                            {text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const PageWrapper: React.FC = (): React.ReactElement => {
    return (
        <div className='mt-4 flex-col p-10 lg:mx-auto lg:w-[904px]'>
            <Outlet />
        </div>
    );
};


const Layout: React.FC = (): React.ReactElement => {
    useScrollToggle();

    return (
        <div className='flex flex-col relative'>
            <Nav />
            <Toasts />
            <PageWrapper />
            <ScrollToTopBtn />
        </div>
    );
};

export default Layout;