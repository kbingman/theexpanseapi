import classnames from 'classnames';
import { useRecoilValue } from 'recoil';

import { messageState } from '../atoms';

export const MessageDisplay = ({ children, messageType }) => (
  <div
    className={classnames('absolute my-2 text-xs text-red-700 top-4', {
      'text-red-700': messageType === 'error',
      'text-green-700': messageType === 'message',
    })}
  >
    {children}
  </div>
);

export const Message = ({ uuid }) => {
  const { message, messageType } = useRecoilValue(messageState(uuid));
  if (!message) {
    return null;
  }

  return <MessageDisplay {...{ messageType }}>{message}</MessageDisplay>;
};
