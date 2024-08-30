import { LogoText } from '../svgs'
import AuthenticationButtons from './AuthenticationButtonGroup'
import React from 'react'

export const Navbar = () => {
    return (
        <>
        <div className="navbar bg-white shadow-md grid grid-cols-3">
            <div className="col-span-1">
                <a className="btn btn-link relative justify-start p-5"><LogoText className='absolute w-28 h-28'/></a>
            </div>
            <div className="col-span-2 justify-end gap-3">
                <ul className='menu menu-horizontal px-1'>
                    <li><a>Research papers</a></li>
                    <li>
                        <details>
                            <summary>Articles</summary>
                            <ul className='bg-base-100 rounded-t-none p-2'>
                                <li><a href="/articles/frontend">Frontend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                                <li><a href="/articles/backend">Backend</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <AuthenticationButtons />
            </div>
        </div>
        </>
    )
}
