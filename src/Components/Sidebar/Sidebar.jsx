import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context)

   const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
   }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
        <br />
        <div onClick={()=>newChat()} className="new-chat">
          <img className="plus" src={assets.plus_icon} alt="New Chat Icon" />
          {extended && <p>New Chat</p>}
        </div>
        <br />
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((ClipboardItem,index)=>{
              return (
                <div key={index} onClick={()=>loadPrompt(ClipboardItem)} className="recent-entry">
              <img
                className="message"
                src={assets.message_icon}
                alt="Message Icon"
              />
              <p>{ClipboardItem}...</p>
            </div>
              )
            })}
            
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img
            className="questionmark"
            src={assets.question_icon}
            alt="Help Icon"
          />
          <p>Help</p>
        </div>
        <div className="bottom-item recent-entry">
          <img
            className="history"
            src={assets.history_icon}
            alt="History Icon"
          />
          <p>Activity</p>
        </div>
        <div className="bottom-item recent-entry">
          <img
            className="settingicon"
            src={assets.setting_icon}
            alt="Settings Icon"
          />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
