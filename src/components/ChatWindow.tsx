import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

const ChatHeader = styled.div`
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatTitle = styled.h2`
  color: #333;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const ChatSubtitle = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
`;

const MessageGroup = styled.div`
  margin-bottom: 20px;
`;

const Message = styled.div<{ isOwn: boolean }>`
  max-width: 70%;
  margin: 5px 0;
  margin-left: ${props => props.isOwn ? 'auto' : '0'};
  margin-right: ${props => props.isOwn ? '0' : 'auto'};
`;

const MessageBubble = styled.div<{ isOwn: boolean }>`
  padding: 12px 16px;
  border-radius: 18px;
  background: ${props => props.isOwn ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#fff'};
  color: ${props => props.isOwn ? 'white' : '#333'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  position: relative;
`;

const MessageTime = styled.div<{ isOwn: boolean }>`
  font-size: 11px;
  color: ${props => props.isOwn ? 'rgba(255, 255, 255, 0.7)' : '#999'};
  margin-top: 5px;
  text-align: ${props => props.isOwn ? 'right' : 'left'};
`;

const MessageInput = styled.div`
  padding: 20px;
  background: #fff;
  border-top: 1px solid #e9ecef;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;

const TextInput = styled.textarea`
  flex: 1;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 14px;
  resize: none;
  min-height: 20px;
  max-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  text-align: center;
`;

const EmptyStateTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
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

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
}

interface ChatWindowProps {
  selectedChat: Chat | null;
  currentUser: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat, currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock messages for demonstration
    if (selectedChat) {
      const mockMessages: Message[] = [
        {
          id: '1',
          text: 'Hey there! How are you doing?',
          senderId: selectedChat.participants.find(p => p.id !== currentUser.id)?.id || '1',
          senderName: selectedChat.participants.find(p => p.id !== currentUser.id)?.name || 'Unknown',
          timestamp: new Date(Date.now() - 1000 * 60 * 60)
        },
        {
          id: '2',
          text: 'I\'m doing great! Just working on some projects. How about you?',
          senderId: currentUser.id,
          senderName: currentUser.name,
          timestamp: new Date(Date.now() - 1000 * 60 * 55)
        },
        {
          id: '3',
          text: 'That sounds awesome! I\'d love to hear more about your projects.',
          senderId: selectedChat.participants.find(p => p.id !== currentUser.id)?.id || '1',
          senderName: selectedChat.participants.find(p => p.id !== currentUser.id)?.name || 'Unknown',
          timestamp: new Date(Date.now() - 1000 * 60 * 50)
        },
        {
          id: '4',
          text: 'Sure! I\'m building a messenger app with Electron and React. It\'s been really fun to work on!',
          senderId: currentUser.id,
          senderName: currentUser.name,
          timestamp: new Date(Date.now() - 1000 * 60 * 45)
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedChat, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        senderId: currentUser.id,
        senderName: currentUser.name,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const formatMessageTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!selectedChat) {
    return (
      <ChatContainer>
        <EmptyState>
          <EmptyStateTitle>Welcome to Messenger</EmptyStateTitle>
          <p>Select a conversation to start chatting</p>
        </EmptyState>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>{selectedChat.name}</ChatTitle>
        <ChatSubtitle>
          {selectedChat.participants.length > 2 
            ? `${selectedChat.participants.length} participants`
            : 'Active now'
          }
        </ChatSubtitle>
      </ChatHeader>
      
      <MessagesContainer>
        {messages.map(message => (
          <MessageGroup key={message.id}>
            <Message isOwn={message.senderId === currentUser.id}>
              <MessageBubble isOwn={message.senderId === currentUser.id}>
                {message.text}
              </MessageBubble>
              <MessageTime isOwn={message.senderId === currentUser.id}>
                {formatMessageTime(message.timestamp)}
              </MessageTime>
            </Message>
          </MessageGroup>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <MessageInput>
        <InputContainer onSubmit={handleSubmit}>
          <TextInput
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
          />
          <SendButton type="submit" disabled={!newMessage.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </SendButton>
        </InputContainer>
      </MessageInput>
    </ChatContainer>
  );
};

export default ChatWindow;
