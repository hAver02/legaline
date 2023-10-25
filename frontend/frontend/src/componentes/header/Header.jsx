import { useContext, useState } from "react"

import { DropMenu } from "./DropMenu"
import { UserContext } from "../../context/userContext"
import { CasosContext } from "../../context/casoContext"
import { Outlet } from "react-router-dom"

export function Header () {
    
    const { setPageAlarmas } = useContext(UserContext)
    const {setInfoCaso} = useContext(CasosContext)
    return(
        <div className="">
            <header className="header flex justify-around items-center bg-gray-900">
                <h2 onClick={() => {
                    setInfoCaso('')
                    setPageAlarmas(true)
                }} className="text-center font-semibold text-4xl text-green-500"> legaLine-chAt</h2>
                <div>
                    <DropMenu />
                </div>

            </header>
            <Outlet />
        </div>
    )
}