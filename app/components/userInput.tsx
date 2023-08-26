'use client';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import { isURLValid } from '../lib/utils';
import Dialog from './modal';

export default () => {
  const router = useRouter();
  const submitBtn = React.createElement('button', { className: 'btn btn-square' }, <FaArrowRight />);
  const loadingBtn = React.createElement('button', { className: 'btn btn-square btn-disabled' }, <span className="loading loading-spinner"></span>);
  const [buttonState, setButtonState] = useState(submitBtn);
  const [inputClass, setInputClass] = useState('input input-bordered input-info w-full');
  const [isloading, setIsLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (isloading) {
      setButtonState(loadingBtn);
      setInputClass('input input-bordered input-info w-full input-disabled');
    } else {
      setButtonState(submitBtn);
      setInputClass('input input-bordered input-info w-full');
    }
  }, [isloading])

  const onCloseDialog = () => {
    setModalShow(false);
  }

  const onShowDialog = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setModalShow(true);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const input = e.currentTarget.querySelector('input')?.value.trim();
    if (input && isURLValid(input)) {
      try {
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
      } catch (e) {
        onShowDialog('Sorry', 'Something went wrong, please try again later: ' + e.message);
      } finally {
        setIsLoading(false)
      }
    } else {
      const input = e.currentTarget.querySelector('input')
      if (input) {
        input.value = '';
      }
      onShowDialog('Sorry', 'It seems the url is not a valid twitter thread URL');
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="form-control">
        <form className="input-group" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="paste twitter thread URL here"
            className={inputClass}
          />
          {buttonState}
        </form>
      </div>
      {
        modalShow ? <Dialog
        _title={modalTitle}
        _content={modalContent}
        onClose={onCloseDialog}
        /> : null
      }
    </>
  )
}