//* 콜백함수
const foo = () => {
  setTimeout(() => {
    console.log('Callback based stuff');
    console.log('yet another thing');
    // lots more stuff
  }, 2000);
}
// foo();

//* await
// const asyncFoo = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   console.log('nice');
//   console.log('way better');
// }
// asyncFoo();

//* sleep
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const asyncFoo = async () => {
  await sleep(2000);
  console.log('look at this');
  await sleep(1000);
  console.log('getting fancy now');
}
// asyncFoo();

//* setInterval
// task must return true or false 
const fakeServerCheck = async () => {
  console.log('check...');
  return Math.random() > 0.8;
}
const asyncInterval = async (callback, ms, triesLeft = 5) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async() => {
      if(await callback()) {
        resolve();
        clearInterval(interval);
      } else if (triesLeft <= 1) {
        reject();
        clearInterval(interval);
      }
      triesLeft--;
    }, ms);
  });
}
const wrapper = async () => {
  try {
    await asyncInterval(fakeServerCheck, 500);
  } catch (e) {
    console.log('error handling');
  }
  console.log("Done!")
}
wrapper();
