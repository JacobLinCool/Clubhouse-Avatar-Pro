function wait(t = 1000) {
  return new Promise(r => {
    setTimeout(() => {
      r();
    }, t);
  });
}

export { wait };
