import React, { MouseEventHandler, useState } from 'react'

export default ({_title, _content, onClose}: {_title: string, _content: string, onClose: MouseEventHandler}) => {

  const [title, setTitle] = useState(_title)
  const [content, setContent] = useState(_content)

  return (
    <dialog id="dialog" className="modal" open>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{content}</p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </form>
    </dialog>
  )
}