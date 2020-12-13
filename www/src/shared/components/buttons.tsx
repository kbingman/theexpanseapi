import { ReactNode } from 'react';
import classnames from 'classnames';

export interface TextButtonProps {
  children: ReactNode;
  onClick: (e: React.MouseEvent) => void;
}

/**
 * @param onCLick
 *
 * @returns JSX.Element
 */
export const TextButton = ({ children, onClick }: TextButtonProps) => (
  <button
    className={classnames(
      'transition duration-300 ease-in-out',
      'text-indigo-900 font-sans font-semibold text-xs text-gray-800',
      'focus:outline-none ring-gray-300 focus:ring-2',
      'px-1 py-0.5 rounded-sm mx-1'
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export interface CloseButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

/**
 * A styled button for closing modal windows
 * @param onClick
 *
 * @returns JSX.Element
 */
export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <button
    title="Close"
    className={classnames(
      'transition duration-300 ease-in-out',
      'absolute top-5 right-6 px-2 rounded',
      'font-sans text-3xl font-light text-indigo-900', 
      'transition duration-500 ease-in-out', 
      'focus:outline-none ring-gray-300 focus:ring-2',
    )}
    onClick={onClick}
  >
    X
  </button>
);
