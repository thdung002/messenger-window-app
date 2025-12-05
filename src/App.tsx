import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import LoginForm from './components/LoginForm';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  background: white;
  border-radius: 10px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  participants: User[];
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    if (currentUser) {
      const mockChats: Chat[] = [
        {
          id: '1',
          name: 'John Doe',
          lastMessage: 'Hey, how are you?',
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
          unreadCount: 2,
          participants: [
            { id: '1', name: 'John Doe' },
            { id: currentUser.id, name: currentUser.name }
          ]
        },
        {
          id: '2',
          name: 'Team Project',
          lastMessage: 'Meeting at 3 PM today',
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
          unreadCount: 0,
          participants: [
            { id: '2', name: 'Alice Smith' },
            { id: '3', name: 'Bob Johnson' },
            { id: currentUser.id, name: currentUser.name }
          ]
        },
        {
          id: '3',
          name: 'Sarah Wilson',
          lastMessage: 'Thanks for your help!',
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
          unreadCount: 0,
          participants: [
            { id: '4', name: 'Sarah Wilson' },
            { id: currentUser.id, name: currentUser.name }
          ]
        }
      ];
      setChats(mockChats);
      setSelectedChat(mockChats[0]);
    }
  }, [currentUser]);

  const handleLogin = (name: string) => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name
    };
    setCurrentUser(user);
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  if (!currentUser) {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <LoginForm onLogin={handleLogin} />
        </AppContainer>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MainContent>
          <Sidebar 
            chats={chats}
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            currentUser={currentUser}
          />
          <ChatWindow 
            selectedChat={selectedChat}
            currentUser={currentUser}
          />
        </MainContent>
      </AppContainer>
    </>
  );
};

export default App;
