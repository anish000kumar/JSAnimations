async function main() {
  const rectangle = document.querySelector("#rect");

// //   await animate({
// //     duration: 1000,
// //     timing: TimingFunctions.easeOutCubic,
// //     render(progress) {
// //       const x = extrapolate(0, 500)(progress);
// //       rectangle.style.transform = `translateX(${x}px)`;
// //     },
// //   });

// //   await delay(500);

//   await animate({
//     duration: 300,
//     timing: TimingFunctions.easeOutCubic,
//     render(progress) {
//       const x = extrapolate(500, 1000)(progress);
//       rectangle.style.transform = `translateX(${x}px)`;
//     },
//   });

  const beer = document.querySelector("img");
  const h1 = document.querySelector("h1")
  const p = document.querySelector("p")

  const scrollController = new AnimationController();

  window.addEventListener('scroll', function(e){
    scrollController.push(window.pageYOffset)
  })

  controlledAnimate({ 
      controller: scrollController,
      limit: [0, 300],
      render(progress){
        const val = extrapolate(0, 200)(progress);
        const scale = extrapolate(1, 1.2)(progress);
        const h1Opacity = extrapolate(1, 0)(progress)
        const h1Move = extrapolate(100, 0)(progress)
        beer.style.transform = `translateY(${val}px) scale(${scale})`;
        h1.style.opacity =  h1Opacity;
        h1.style.transform = `translateY(${h1Move}px)`;
      }
  })

  controlledAnimate({ 
    controller: scrollController,
    limit: [300, 500],
    render(progress){
      const op = extrapolate(1.5, 0)(progress)
      const val = extrapolate(200, 400)(progress);
      const scale = extrapolate(1, 0.7)(progress)
      beer.style.transform = `translateY(${val}px) scale(${scale})`;
      beer.style.opacity = op
    }
})



}

main();

