import React from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react';
import { db } from "../models/db"
import { Todo } from '../models/Todo';

const { todos } = db

const Task = () => {

  const [taskInput, setTaskInput] = useState<string>("")

  // データベース内のすべてのtodosのデータを取得して配列にする(？)
  // useLiveQueryはindexedDBのデータが更新されたときに再レンダリングする(useEffectに似てるかも)
  const allItems: Array<Todo> | any = useLiveQuery(() => todos.toArray(), [])

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    // デフォルトのリロードを防ぐ(？)
    e.preventDefault()
    // const taskField = document.querySelector('#taskInput')
    console.log('=====>', taskInput)

    // addでデータの追加
    await todos.add({
      // task: taskField['value'],
      task: taskInput,
      completed: false,
    })

    // taskField['value'] = ''
    setTaskInput("")
  }

  // deleteにプライマリーキーを指定して削除できる
  const deleteTask = async (id: number | undefined) => todos.delete(id)

  const toggleStatus = async (
    id: number | any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // updateは更新したいデータのプライマリーキーを第一引数に指定し
    // 第二引数に変更するプロパティとその値を指定する
    await todos.update( id, {completed: !!e.target.checked })
  }

  const taskInputHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskInput(e.target.value)
  }

  // whereでプロパティを指定してequqalsで値を指定すれば検索できるが
  // equalsはboolean値に対応していないっぽい(null、undefined、Objectsも未対応)
  // 加えて文字列の比較では大文字と小文字が区別される
  // const completedItems = todos.where('completed').equals(true).toArray()
  // filterで代用した方が楽かもしれない
  // const completedItems = allItems?.filter((item) => item.completed === true)
  // console.log(completedItems)
  return (
    <>
      <p>{taskInput}</p>
      <h3 className="teal-text center-align">Todo App</h3>
      <form className="add-item-form" onSubmit={(e) => addTask(e)}>
        <input
          type="text"
          className="itemField"
          placeholder="What do you want to do today?"
          id="taskInput"
          value={taskInput}
          onChange={taskInputHandleChange}
          required
        />
        <button type="submit" className="waves-effect btn teal right">
          Add
        </button>
      </form>

      <div className="card white darken-1">
        <div className="card-content">
          {allItems?.map((item: Todo) => (
            <div className="row" key={item.id}>
              <p className="col s10">
                <label>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    className="checkbox-blue"
                    onChange={(e) => toggleStatus(item.id, e)}
                  />
                  {/* completedがtrueの場合のみ打ち消し線(strike-text)を付ける */}
                  <span className={`black-tex ${item.completed && 'strike-text'}`}>{item.task}</span>
                </label>
              </p>
              <i
                onClick={() => deleteTask(item.id)}
                className="col s2 material-icons delete-button"
              >
                delete
              </i>
            </div>            
          ))}
        </div>
      </div>
    </>
  )
}

export default Task