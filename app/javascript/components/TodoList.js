import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css';

const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const RemoveAllButton = styled.button`
  width: 16%;
  height: 40px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`

const TodoName = styled.span`
  font-size: 27px;
  ${({ is_completed }) => is_completed && `
    opacity: 0.4;
  `}
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

function TodoList() {
  const [todos, setTodos] = useState([])
  const [searchName, setSearchName] = useState('')

  // 画面が描画されたときに実行する
  useEffect(() => {
    // indexアクションを実行する
    axios.get('/api/v1/todos.json')
    .then(res => {
      setTodos(res.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  const removeAllTodos = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      //全削除のアクションを実行する
      axios.delete('/api/v1/todos/destroy_all')
      .then(resp => {
        // 中身を空にする
        setTodos([])
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  // 完遂のタスクの更新処理
  const updateIsCompleted = (index, val) => {
    // 完了と未完の判定を反対にしたデータ
    var data = {
      id: val.id,
      name : val.name,
      is_completed: !val.is_completed
    }
    // patchを使って、更新処理を呼び出す
    axios.patch(`/api/v1/todos/${val.id}`, data)
    .then(resp => {
      // 現在のデータを取得する
      const newTodos = [...todos]
      // 更新した部分のみを変更する
      newTodos[index].is_completed = resp.data.is_completed
      // 変更したデータを反映させる
      setTodos(newTodos)
    })
  }

  return (
    <>
      <h1>Todo リスト</h1>
      <SearchAndButtton>
        <SearchForm
          type="text"
          placeholder="検索をする..."
          onChange={event => {
            setSearchName(event.target.value)
          }}
        />
        <RemoveAllButton onClick={removeAllTodos}>
          全削除
        </RemoveAllButton>
      </SearchAndButtton>

      <div>
        {todos.filter((val) => {
          if(searchName === "") {
            return val
          } else if (val.name.includes(searchName)) {
            return val
          }
        }).map((val, key) => {
          return (
            <Row key={key}>
              {val.is_completed ? (
                <CheckedBox>
                  <ImCheckboxChecked onClick={() => updateIsCompleted(key, val) } />
                </CheckedBox>
              ) : (
                <UncheckedBox>
                  <ImCheckboxUnchecked onClick={() => updateIsCompleted(key, val) } />
                </UncheckedBox>
              )}
              <TodoName is_completed={val.is_completed}>
                {val.name}
              </TodoName>
              <Link to={"/todos/" + val.id + "/edit"}>
                <EditButton>
                  <AiFillEdit />
                </EditButton>
              </Link>
            </Row>
          )
        })}
      </div>
    </>
  )
}

export default TodoList