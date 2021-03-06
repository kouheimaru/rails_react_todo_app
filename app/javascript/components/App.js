import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import EditTodo from './EditTodo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css'

const Nabvar = styled.nav`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`

function App() {
  return (
    <>
      <Nabvar>
        <Logo>
          TODOアプリ
        </Logo>
        <NavItems>
          <NavItem>
            <Link to="/todos">
              Todoリスト一覧
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/todos/new">
              新規追加
            </Link>
          </NavItem>
        </NavItems>
      </Nabvar>
      <Wrapper>
        <Routes>
          <Route exact path="/todos" element={<TodoList />} />
          <Route exact path="/todos/new" element={<AddTodo />} />
          <Route path="/todos/:id/edit" element={<EditTodo />} />
        </Routes>
      </Wrapper>
      <ToastContainer />
    </>
  )
}

export default App