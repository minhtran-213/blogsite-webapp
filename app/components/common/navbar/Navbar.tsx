import AuthenticationButtons from './AuthenticationButtonGroup'
import React from 'react'

export const Navbar = () => {
    return (
        <>
        <div className="navbar bg-white shadow-md">
            <div className="flex-1">
                <a href='/' className="btn btn-ghost text-xl">
                    DevAI Writer
                </a>
            </div>
            <div className="flex-none gap-2">
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
