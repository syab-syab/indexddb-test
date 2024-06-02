import React from 'react'
import { useState } from 'react'
import { db } from '../models/db'

const { deadline } = db

const Deadline = () => {
  // id は自動でインクリメント
  const [name, setName] = useState<string>("")
  // ミリ秒二つ↓も一応文字列で型付け
  const [deadline, setDeadline] = useState<string>("")
  const [startSec, setStartSec] = useState<string>("")
  const [achievement, setAchievement] = useState<boolean>(false)
  const [finished, setFinished] = useState<boolean>(false)

  const nameHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const deadlineHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value)
  }

  const addDeadline = (e: React.FormEvent<HTMLFormElement>): void => {
    // デフォルトのリロードを防ぐ(？)
    e.preventDefault()
    
    const tmpStart: number = Date.now()
    setStartSec(String(tmpStart))
    console.log(tmpStart)
    console.log(e)
    console.log("startSec, ", startSec)
    console.log(name, Number(deadline)*6000, startSec, achievement, finished)
    setName('')
    setDeadline('')
    setStartSec('')
  }

  return (
    <div>
      <p>Deadline</p>
      <div>
        <form onSubmit={(e) => addDeadline(e)}>
          <label>何を我慢する？</label>
          <input type="text" value={name} onChange={nameHandleChange} required />
          {/* 期限は短いのから試していくこと */}
          {/* <label>何日我慢する？*86400000</label> */}
          {/* <label>何時間我慢する？*3600000</label> */}
          <label>何分我慢する？*60000</label>
          <input type="text" value={deadline} onChange={deadlineHandleChange} />
          <button type='submit'>
            登録
          </button>
        </form>
      </div>
    </div>
  )
}

export default Deadline