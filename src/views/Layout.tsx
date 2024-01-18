import { NavLink, Outlet } from 'react-router-dom'

const pages = [
    { path: '/forecasts', text: 'List' },
    { path: '/add-forecast', text: 'Add' },
]

const Layout = () => {
    return (
        <div className=''>
            <nav className='w-full p-4 border-b-2 flex flex-col items-center'>
                <div>
                    <span className='font-bold text-xl font-mono'>WeatherApp</span>
                </div>
                <ul className='flex text-gray-700'>
                    {pages.map((p: { path: string, text: string }, i: number) => (
                        <li key={i} className='mr-4 hover:underline'>
                            <NavLink to={p.path} className={({ isActive }) => isActive ? 'font-bold underline' : ''}>
                                {p.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className='lg:w-3/4 mt-4 flex-col mx-auto p-10'>
                <Outlet />

            </div>
        </div >
    )
}

export default Layout;