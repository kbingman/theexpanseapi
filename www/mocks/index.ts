// @ts-ignore - ignoring  [tsserver 1207] [E] All files must be modules when the '--isolatedModules'
(async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
})();
