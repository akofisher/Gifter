import React, { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import GenericText from '../../../ComponentsShared/GenericText/GenericText';
import { Colors } from '../../../Constants/Colors';
import { Chats, Messages } from '../../../Data/Data';
import { parseTimestamp } from '../../../Utils/unicTimeStamp.utils';

type ChatItem = (typeof Chats)[0];

type Props = {
  data: ChatItem;
  currentUserId: string | number;
  onPress?: (chat: ChatItem) => void;
};

const ChatCard: React.FC<Props> = ({ data, currentUserId, onPress }) => {
  // all messages belonging to this chat
  const chatMessages = useMemo(
    () => Messages.filter(m => String(m.chat_id) === String(data.chat_id)),
    [data.chat_id],
  );

  // last message by sent_in (most recent)
  const lastMessage = useMemo(() => {
    if (chatMessages.length === 0) return undefined;
    return chatMessages.reduce((prev, cur) =>
      (cur.sent_in || 0) > (prev.sent_in || 0) ? cur : prev,
    );
  }, [chatMessages]);

  // unread if last msg exists, was sent by other user, and not seen yet
  const isUnread =
    !!lastMessage &&
    String(lastMessage.id) !== String(currentUserId) &&
    !lastMessage.seen_at;

  const previewText = lastMessage
    ? lastMessage.message.split(' ').slice(0, 4).join(' ') +
      (lastMessage.message.split(' ').length > 4 ? '...' : '')
    : 'No messages yet';

  const timeText = lastMessage ? parseTimestamp(lastMessage.sent_in) : '';

  return (
    <TouchableOpacity
      style={styles.chatCardContainer}
      onPress={() => onPress?.(data)}
      activeOpacity={0.8}
    >
      {/* Avatar */}
      <Image source={{ uri: data.guest_image }} style={styles.circleImage} />

      {/* Name + last message */}
      <View style={styles.textContainer}>
        <GenericText
          textType="Title"
          text={`${data.guest_firstName} ${data.guest_lastName}`}
        />
        <GenericText
          textType="SubTitle"
          text={previewText}
          textStyles={{
            color: isUnread ? Colors.dark : Colors.black,
            fontWeight: isUnread ? '700' : '400',
          }}
        />
        {timeText ? (
          <GenericText
            textType="Universal"
            text={timeText}
            textStyles={{ fontSize: 11, color: Colors.dark, marginTop: 3 }}
          />
        ) : null}
      </View>

      {/* Right side: time + unread badge */}
      <View style={styles.rightContainer}>
        {isUnread && (
          <View style={styles.unreadBadge}>
            <GenericText
              textType="Universal"
              text="1"
              textStyles={{ color: '#fff', fontSize: 12 }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  chatCardContainer: {
    width: '100%',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    backgroundColor: Colors.gray2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  circleImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    resizeMode: 'cover',
    backgroundColor: Colors.gray2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 70,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  unreadBadge: {
    marginTop: 8,
    minWidth: 22,
    height: 22,
    borderRadius: 12,
    backgroundColor: Colors.mein,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
});
