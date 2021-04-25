import MessageFrom from './MessageForm';
import Mymessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div 
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        ))
    }

    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index -1];
            const isMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={{ width : '100%' }}>
                    <div className='message-block'>
                        {
                            isMessage
                            ? <Mymessage  message={message} />
                            : <TheirMessage lastMessage={messages[lastMessageKey]} message={message} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight : isMessage ? '18px' : '0px', marginLeft : isMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMessage)}
                    </div>
                </div>
            );
        })
    };

    if(!chat) return 'Loading...';

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username} `)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height : '100px' }} />
            <div className="message-form-container">
                <MessageFrom {...props} chatId={activeChat} />
            </div>
        </div>
    );
}

export default ChatFeed;