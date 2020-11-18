export const logger = (...msg: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(msg.join(' '));
  }
};
