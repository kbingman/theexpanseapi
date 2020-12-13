import classnames from 'classnames';

export interface InputProps {
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  textSize?: 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl';
  type?: 'text' | 'email';
  value?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = ({ textSize, ...props }: InputProps) => (
  <input
    className={classnames(
      textSize,
      'transition duration-300 ease-in-out',
      'relative -left-2 w-full px-2 font-sans font-normal text-gray-900',
      'border-b border-gray-200 rounded-sm focus:border-indigo-700 focus:outline-none'
    )}
    {...{
      autoCorrect: 'off',
      autoComplete: 'off',
      type: 'text',
      ...props,
    }}
  />
);

export const Label = ({ children }) => (
  <label className="m-0 text-xs text-gray-400">{children}</label>
);

export const Fieldset = ({ children }) => (
  <fieldset className="mb-2">{children}</fieldset>
);

export const Field = ({ children }) => (
  <div className="mb-2 text-gray-400 transition duration-300 ease-in-out focus-within:text-indigo-800">
    <label className="m-0 text-xs">{children}</label>
  </div>
);

export const Overlay = ({ children }) => (
  <div className="fixed top-0 bottom-0 left-0 right-0 content-center justify-center bg-white grid bg-opacity-90">
    {children}
  </div>
);

export const Modal = ({ children }) => (
  <div className="p-4 mb-12 bg-white w-96 box-content">{children}</div>
);

export const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit}>{children}</form>
);
