import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 320px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  margin-right: 12px;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #333;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e9ecef;
  border-radius: 20px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ChatsList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div<{ selected: boolean }>`
  padding: 15px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  background: ${props => props.selected ? '#e3f2fd' : 'transparent'};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.selected ? '#e3f2fd' : '#f5f5f5'};
  }
`;

const ChatInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ChatDetails = styled.div`
  flex: 1;
`;

const ChatName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const LastMessage = styled.div`
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
`;

const ChatMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MessageTime = styled.div`
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
`;

const UnreadBadge = styled.div<{ count: number }>`
  background: #667eea;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  display: ${props => props.count > 0 ? 'block' : 'none'};
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

interface SidebarProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  currentUser: User;
}

const formatTime = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return diffInMinutes < 1 ? 'now' : `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ chats, selectedChat, onChatSelect, currentUser }) => {
  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <SidebarContainer>
      <Header>
        <UserInfo>
          <Avatar>{getInitials(currentUser.name)}</Avatar>
          <UserName>{currentUser.name}</UserName>
        </UserInfo>
        <SearchInput placeholder="Search conversations..." />
      </Header>
      <ChatsList>
        {chats.map(chat => (
          <ChatItem
            key={chat.id}
            selected={selectedChat?.id === chat.id}
            onClick={() => onChatSelect(chat)}
          >
            <ChatInfo>
              <ChatDetails>
                <ChatName>{chat.name}</ChatName>
                <LastMessage>{chat.lastMessage}</LastMessage>
              </ChatDetails>
              <ChatMeta>
                {chat.lastMessageTime && (
                  <MessageTime>{formatTime(chat.lastMessageTime)}</MessageTime>
                )}
                <UnreadBadge count={chat.unreadCount || 0}>
                  {chat.unreadCount}
                </UnreadBadge>
              </ChatMeta>
            </ChatInfo>
          </ChatItem>
        ))}
      </ChatsList>
    </SidebarContainer>
  );
};

export default Sidebar;
