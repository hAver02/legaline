
import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { RecoveryPass, NewPassword } from './pages/RecoveryPass'

import { UserProvider } from './context/userContext'
import { IsAuth, IsThereToken } from './pages/IsAuth'
import { CasosProvider } from './context/casoContext'
import { ChatProvider } from './context/chatContext'
import { AddCase } from './componentes/AddCase'
import { Header } from './componentes/header/Header'
import { CorrectToken } from './pages/CorrectToken'





function App() {
  return (
    <>

    <UserProvider>
    <CasosProvider>
    <ChatProvider >

      <BrowserRouter>
        <Routes>
          <Route element={<IsThereToken />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/recovery-pass' element={<RecoveryPass />}/>
            <Route path='/new-password' element={<NewPassword />}/>
          </Route>

          <Route element={<IsAuth />}>
            <Route element={<Header />}>
              <Route path='/' element={<Main />} />
              <Route path='/addcase' element={<AddCase />}/>
            </Route>
          </Route>
          <Route path='*' element={<h1>not found</h1>}/>
        </Routes>
      </BrowserRouter>

    </ChatProvider>
    </CasosProvider>
    </UserProvider>
    </>
  ) 
}

export default App
