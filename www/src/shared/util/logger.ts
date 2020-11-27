const logger = (...msg: any) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  console.log('[The Expanse]', msg.join(' '));
};

logger.error = (...msg: any) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  console.error(`[The Expanse: Error]`, msg.join(' '));
};

logger.time = (name: string) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  console.time(`[The Expanse] ${name}`);
};

logger.timeEnd = (name: string) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  console.timeEnd(`[The Expanse] ${name}`);
};

export { logger };
