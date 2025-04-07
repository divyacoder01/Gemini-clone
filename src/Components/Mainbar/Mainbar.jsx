// src/Components/Mainbar/Mainbar.jsx
import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { assets } from '../../assets/assets';
import './Mainbar.css';

const Mainbar = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img className='user' src={assets.user_icon} alt="User Icon" aria-label="User Icon" />
      </div>

      <div className='main-container'>
        {
          !showResult
            ? (
              <>
                <div className="greet">
                  <p><span>Hello, Div</span></p>
                  <p>How can I help you today?</p>
                </div>
                <div className="cards">
                  <div className="card">
                    <p>Suggest beautiful road on an upcoming road</p>
                    <img className='compass' src={assets.compass_icon} alt="Compass Icon" aria-label="Compass Icon" />
                  </div>
                  <div className="card">
                    <p>Briefly summarize this concept: Urban planning</p>
                    <img className='bulb' src={assets.bulb_icon} alt="Bulb Icon" aria-label="Bulb Icon" />
                  </div>
                  <div className='card'>
                    <p>Brainstorm team activities for our work retreat</p>
                    <img className='message' src={assets.message_icon} alt="Message Icon" aria-label="Message Icon" />
                  </div>
                  <div className='card'>
                    <p>Improve the readability of the following code</p>
                    <img className='code' src={assets.code_icon} alt="Code Icon" aria-label="Code Icon" />
                  </div>
                </div>
              </>
            )
            : (
              <div className="result">
                <div className="result-title">
                  <img src={assets.user_icon} alt="User Icon" aria-label="User Icon" />
                  <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="Gemini Icon" aria-label="Gemini Icon" />
                  {loading ? (
                    <div className='loader'>
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: resultData }} />
                  )}
                </div>
              </div>
            )
        }

        <div className='main-bottom'>
          <div className='search-box'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type='text'
              placeholder='Enter a prompt here'
              aria-label="Prompt input field"
            />
            <img className='gallery' src={assets.gallery_icon} alt="Gallery Icon" aria-label="Gallery Icon" />
            <img className='mic' src={assets.mic_icon} alt="Microphone Icon" aria-label="Microphone Icon" />
            <img
              onClick={onSent}
              className='sent'
              src={assets.sent_icon}
              alt="Send Icon"
              aria-label="Send Icon"
            />
          </div>
        </div>

        <p className='bottom-info'>
          Gemini may display inaccurate information, including about people, so double-check its responses. Your privacy and Gemini Apps...
        </p>
      </div>
    </div>
  );
};

export default Mainbar;