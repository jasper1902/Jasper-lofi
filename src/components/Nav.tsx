import { BackgroundStateType } from '@/pages';
import React, { useCallback } from 'react'
import { FaGithubSquare } from 'react-icons/fa';

type Props = {
    backgroundState: BackgroundStateType
    setBackgroundState: (selectedBackground: BackgroundStateType) => void
}

const Nav = ({ backgroundState, setBackgroundState }: Props) => {
    const handleBackgroundChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedBackground = e.target.value as BackgroundStateType;
            setBackgroundState(selectedBackground);
            localStorage.setItem("background", selectedBackground);
        },
        [setBackgroundState]
    );
    return (
        <div className="navbar bg-transparent absolute z-20">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-4xl">Jasper</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex items-center gap-4">
                    <li><div><a href="https://github.com/jasper1902/Jasper-lofi"><FaGithubSquare size={30}/></a></div></li>
                    <li>
                        <select
                            className="select select-ghost max-w-xs "
                            value={backgroundState}
                            onChange={handleBackgroundChange}
                        >
                            <option value="day-sunday">Day Sunday</option>
                            <option value="day-rainny">Day Rainny</option>
                            <option value="night-clear">Night Clear</option>
                            <option value="night-rainny">Night Rainny</option>
                        </select>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Nav
