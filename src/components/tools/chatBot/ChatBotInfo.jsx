import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { steps } from "./ChatBot";


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

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        botAvatar="https://i.postimg.cc/13Fcnd7B/doctor1.webp"
        userAvatar="https://i.postimg.cc/h4C0HT7L/user.webp"
        headerTitle="Chatbot"
        steps={steps}
        floating={true}
      />
    </ThemeProvider>
  );
};


export default ChatBotInfo;