export const Overlay = ({ children }) => (
  <div className="fixed top-0 bottom-0 left-0 right-0 content-center justify-center bg-gray-50 grid bg-opacity-90">
    {children}
  </div>
);

export const Modal = ({ children }) => (
  <div className="relative p-8 mb-12 bg-white w-96 box-content">{children}</div>
);

