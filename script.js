const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettis = [];

function Confetti() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 6 + 4;
    this.speed = Math.random() * 3 + 2;
    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((c, i) => {
        c.y += c.speed;
        if (c.y > canvas.height) confettis[i] = new Confetti();
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.size, c.size);
    });
    requestAnimationFrame(update);
}

for (let i = 0; i < 150; i++) confettis.push(new Confetti());
update();
