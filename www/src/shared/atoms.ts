import { atomFamily } from 'recoil';

interface Message {
  message?: string;
  messageType?: 'error' | 'message'
}

/**
 * Central error state
 */
export const messageState = atomFamily<Message, string>({
  key: '@error/message',
  default: {
    message: undefined,
    messageType: undefined
  },
});
