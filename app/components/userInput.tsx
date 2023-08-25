'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import { isURLValid } from '../lib/utils';

export default () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input')?.value.trim();
    if (input && isURLValid(input)) {
      const res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: input })
      });
      const data = await res.json();
      const redirectUrl = `/article/${data.mdURL}`;
      router.push(redirectUrl);
    } else {
      const input = e.currentTarget.querySelector('input')
      if (input) {
        input.value = '';
      }
      toggleModal();
    }
  }

  const toggleModal = () => {
    const modal = document.getElementById('dialog') as HTMLDialogElement;
    modal.showModal();
  }

  return (
    <>
      <div className="form-control">
        <form className="input-group" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="paste twitter thread URL here"
            className="input input-bordered input-info w-full"
          />
          <button className="btn btn-square">
            <FaArrowRight />
          </button>
        </form>
      </div>
      <dialog id="dialog" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Sorry</h3>
          <p className="py-4">It seems the url is not a valid twitter thread URL</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
    
  )
}