const enter = document.querySelector("#enter");
enter.addEventListener("click", function () {
  const music = new Audio("mao.mp3");
  music.play();
  enter.style.display = "none";
  drawScene();
});

let canvas = document.getElementById("scene");
let ctx = canvas.getContext("2d");
let particles = [];

function drawScene() {
  let g = document.createElement("canvas");
  g.setAttribute("id", "scene");
  particles = [];
  canvas.width = png.width * 6;
  canvas.height = png.height * 6;

  ctx.drawImage(png, 0, 0);

  const data = ctx.getImageData(0, 0, png.width, png.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";

  for (let y = 0, y2 = data.height; y < y2; y++) {
    for (let x = 0, x2 = data.width; x < x2; x++) {
      if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
        const particle = {
          x0: x,
          y0: y,
          x1: png.width / 2,
          y1: png.height / 2,
          speed: Math.random() * 4 + 2,
        };
        gsap.to(particle, {
          duration: particle.speed + 5,
          x1: particle.x0,
          y1: particle.y0,
          delay: y / 30,
          ease: Elastic.easeOut,
        });
        particles.push(particle);
      }
    }
  }

  requestAnimationFrame(render);
}
const render = function () {
  requestAnimationFrame(render);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0, j = particles.length; i < j; i++) {
    const particle = particles[i];
    ctx.fillRect(particle.x1 * 6, particle.y1 * 6, 3, 3);
  }
};

const png = new Image();

png.src =
  "data:image/png;base64,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";
