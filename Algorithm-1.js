let f = () => {
  let d = new Date();
  return d.getMilliseconds() % 2 == 0;
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const retry = async (callback, delay, times) => {
  let tmp;
  for (let i = 1; i <= times.max; i++) {
    await timer(delay);
    if (i === times.max) {
      tmp = callback();
    }
  }
  console.log(tmp);
};

retry(f, 1000, { max: 3 });
