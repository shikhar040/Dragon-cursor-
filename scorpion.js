const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

document.addEventListener('mousemove', function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

class Node {
  constructor(x, y, parent = null) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.length = 10;
  }

  update() {
    if (this.parent) {
      let dx = this.x - this.parent.x;
      let dy = this.y - this.parent.y;
      let angle = Math.atan2(dy, dx);
      this.x = this.parent.x + Math.cos(angle) * this.length;
      this.y = this.parent.y + Math.sin(angle) * this.length;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "white";
    if (this.parent) {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.parent.x, this.parent.y);
      ctx.stroke();
    }
  }
}

class LimbSystem {
  constructor(length) {
    this.nodes = [];
    this.length = length;
    let parent = { x: mouse.x, y: mouse.y };
    for (let i = 0; i < length; i++) {
      let node = new Node(parent.x, parent.y, parent);
      parent = node;
      this.nodes.push(node);
    }
  }

  update() {
    this.nodes[0].x = mouse.x;
    this.nodes[0].y = mouse.y;

    for (let i = 1; i < this.nodes.length; i++) {
      this.nodes[i].update();
    }
  }

  draw() {
    for (let node of this.nodes) {
      node.draw();
    }
  }
}

const scorpion = new LimbSystem(50);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  scorpion.update();
  scorpion.draw();
  requestAnimationFrame(animate);
}

animate();
