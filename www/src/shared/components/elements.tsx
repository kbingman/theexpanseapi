import { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: 'truncate';
}

export const Cell = ({ children }: Props) => (
  <div className="h-48 p-1 bg-gray-100 rounded">{children}</div>
);

export const Grid = ({ children }: Props) => (
  <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
    {children}
  </div>
);

export const H1 = ({ children, className }: Props) => (
  <h1 className={classnames(className, 'font-sans text-5xl font-light')}>
    {children}
  </h1>
);

export const H2 = ({ children, className }: Props) => (
  <h2 className={classnames(className, 'font-sans text-2xl font-light')}>
    {children}
  </h2>
);

export const H3 = ({ children, className }: Props) => (
  <h3 className={classnames(className, 'font-sans text-1xl font-medium')}>
    {children}
  </h3>
);

export const P = ({ children }: Props) => (
  <p className="font-sans text-base font-normal">{children}</p>
);
