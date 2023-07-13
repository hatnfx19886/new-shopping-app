import { useRef } from 'react';
import { useState } from 'react';
import { EmojiSmile, Paperclip, SendFill } from 'react-bootstrap-icons';
import classes from './ChatWindows.module.css';

const ChatWindows = (props) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const chatWindow = useRef();
  const changeMessage = (e) => {
    setMessage(e.target.value);
  };
  // Add user's message on the windows chat
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      setMessageList((prevState) => [...prevState, message]);
      setMessage('');
    }
  };
  // Submit when user press Enter
  const pressEnter = (k) => {
    if (k.key === 'Enter') {
      onSubmitHandler();
    }
  };
  return (
    <div ref={props.nodeRef} className={classes['chat-windows']}>
      <div className={`flex-centered ${classes['chat-header']}`}>
        <h5>Customer Support</h5>
        <button type="button">Let's Chat App</button>
      </div>
      <div className={classes['chat-content']} ref={chatWindow}>
        {messageList.map((mess, index) => (
          <p className={classes.user} key={index}>
            {mess}
          </p>
        ))}
      </div>
      <form
        className={`flex-centered ${classes['chat-footer']}`}
        onSubmit={onSubmitHandler}
        onKeyDown={pressEnter}
      >
        <img src="./img/default-avatar.png" alt="Default Avatar" />
        <input
          type="text"
          placeholder="Enter Message!"
          onChange={changeMessage}
          value={message}
        />
        <div>
          <Paperclip />
          <EmojiSmile />
          <button type="submit">
            <SendFill className={classes.submit} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindows;
