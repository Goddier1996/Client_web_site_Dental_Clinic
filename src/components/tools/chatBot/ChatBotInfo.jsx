import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { steps } from "./ChatBot";
import React, { useState } from "react";


const theme = {
  background: "rgba(55, 55, 55, 0.90)",
  headerBgColor: "#2e9def",
  headerFontColor: "#fff",
  headerFontSize: "16px",
  botBubbleColor: "#2e7d32",
  botFontColor: "#fff",
  userBubbleColor: "orange",
  userFontColor: "#4a4a4a",
};


const ChatBotInfo = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="styleButtonHelp">
        <img
          src={
            isOpen
              ? "https://i.postimg.cc/GpZYGgbf/cross.webp"
              : "https://i.postimg.cc/8CCf2Qz9/help-10771442.webp"
          }
          alt="Chat"
          style={{
            width: isOpen ? "50px" : "65px",
            height: isOpen ? "50px" : "65px",
            objectFit: "cover",
            transition: "all 0.3s ease",
          }}
        />
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={steps}
              botAvatar="https://i.postimg.cc/13Fcnd7B/doctor1.webp"
              userAvatar="https://i.postimg.cc/h4C0HT7L/user.webp"
              headerTitle="Chatbot"
            />
          </ThemeProvider>
        </div>
      )}
    </>
  );
};

export default ChatBotInfo;
