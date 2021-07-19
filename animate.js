const TimingFunctions = {
    // no easing, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t*t,
    // decelerating to zero velocity
    easeOutQuad: t => t*(2-t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
    // accelerating from zero velocity 
    easeInCubic: t => t*t*t,
    // decelerating to zero velocity 
    easeOutCubic: t => (--t)*t*t+1,
    // acceleration until halfway, then deceleration 
    easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  }


function animate({ duration, render, timing }) {
  let activeAnimation = null;
  const startTime = performance.now();
  const cancel = () => cancelAnimationFrame(activeAnimation);
  return new Promise((resolve) => {
    function animation(currentTime) {
      let progress = (currentTime - startTime) / duration;
      progress = timing(progress)
      render(progress, cancel);
      if (progress < 1) {
        activeAnimation = requestAnimationFrame(animation);
      } else {
        resolve(animation);
      }
    }
    activeAnimation = requestAnimationFrame(animation);
  });
}

function AnimationController(){
    this.value = null
    this.listeners = []
}

AnimationController.prototype.onPush = function(cb){
    this.listeners.push(cb)
}

AnimationController.prototype.push = function(val){
    this.val = val
    this.listeners.forEach(listener => listener(val))
}

function controlledAnimate({ controller, limit, render, timing }){
    const [start, end] = limit;
    const distance = end-start;
    controller.onPush(val => {
        if(val < start || val > end) return;
        let progress =(val-start)/distance
        if(timing) progress = timing(progress)
        render(progress)
    })
}



// utils
const extrapolate = (start, end) => (progress) => {
  const distance = end - start;
  return start + distance * progress;
};

const delay = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

