export const ErrorMessage = ({ children }) => (
  <div className="p-2 mx-2 mt-2 text-white bg-red-500">{children}</div>
);

export const Message = ({ children }) => (
  <div className="p-2 mx-2 mt-2 text-white bg-green-500">{children}</div>
);
