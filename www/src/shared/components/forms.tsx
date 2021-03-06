import classnames from 'classnames';

export interface InputProps {
  name: string;
  value: string;
  autoFocus?: boolean;
  disabled?: boolean;
  placeholder?: string;
  textSize?: 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl';
  type?: 'text' | 'email';
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

export const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit}>{children}</form>
);
