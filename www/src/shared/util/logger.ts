const logger = (...msg: any) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  console.log('[The Expanse]', ...msg);
};

logger.error = (...msg: any) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  console.error(`[The Expanse: Error]`, ...msg);
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
