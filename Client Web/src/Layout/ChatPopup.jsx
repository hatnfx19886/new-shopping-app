import { useRef } from 'react';
import { useState } from 'react';
import { Messenger } from 'react-bootstrap-icons';
import { CSSTransition } from 'react-transition-group';

import classes from './ChatPopup.module.css';
import ChatWindows from './ChatWindows';

const ChatPopup = () => {
  const [show, setShow] = useState(false);
  const [transition, setTransition] = useState();
  const nodeRef = useRef(null);
  const toggleWindows = () => {
    if (show) {
      setTransition(false);
      setTimeout(() => {
        setShow(false);
      }, 300);
    } else {
      setShow(true);
      setTimeout(() => {
        setTransition(true);
      }, 1);
    }
  };
  return (
    <div className={classes.chat}>
      <div className={classes.border}>
        <Messenger className={classes.icon} onClick={toggleWindows} />
      </div>
      {show && (
        <CSSTransition
          in={transition}
          timeout={300}
          nodeRef={nodeRef}
          classNames="float-up-down"
        >
          <ChatWindows nodeRef={nodeRef} />
        </CSSTransition>
      )}
    </div>
  );
};

export default ChatPopup;
