import { useState, useRef } from 'react'
import './ProgressiveInput.css'

export default function ProgressiveInput({ questions = [] }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  const handleCapsuleClick = (question) => {
    setText(question)
    textareaRef.current?.focus()
  }

  return (
    <div className="progressive-input">
      <div className="capsule-bar">
        {questions.map((q, i) => (
          <button
            key={i}
            className="capsule"
            onClick={() => handleCapsuleClick(q)}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="input-area">
        <textarea
          ref={textareaRef}
          className="textarea"
          placeholder="写下你的思考..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="mic-btn" aria-label="语音输入">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z" />
            <path d="M17 11a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.93V21h2v-3.07A7 7 0 0 0 19 11h-2Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
