document.addEventListener("DOMContentLoaded", () => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let humanPlayer = "X";
  let aiPlayer = "O";
  let isGameActive = true;

  const cells = document.querySelectorAll(".cell");
  const restartBtn = document.getElementById("restartButton");
  const winnerModal = document.getElementById("winnerModal");
  const winnerText = document.getElementById("winnerText");
  const modalRestartBtn = document.getElementById("modalRestartBtn");

  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // --- Faster Canvas Emoji Burst ---
  function launchCanvasEmojiBurst(emojiList) {
    const canvas = document.getElementById("spaceCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const particles = [];
    const particleCount = 28;
    const startX = canvas.width / 2;
    const startY = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 4;
      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
        size: Math.random() * 16 + 30,
        alpha: 1,
        gravity: 0.08
      });
    }

    function animateEmojis() {
      let active = false;

      particles.forEach(p => {
        if (p.alpha <= 0) return;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= 0.02;

        if (p.alpha > 0) {
          active = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.font = `${p.size}px sans-serif`;
          ctx.fillText(p.emoji, p.x, p.y);
          ctx.restore();
        }
      });

      if (active) {
        requestAnimationFrame(animateEmojis);
      }
    }

    animateEmojis();
  }

  function launchHappyEmojis() {
    launchCanvasEmojiBurst(["🥳", "🎉", "⭐", "😎", "🔥", "👑"]);
  }

  function launchSadEmojis() {
    launchCanvasEmojiBurst(["😢", "😭", "💔", "😞", "🌧️"]);
  }

  function launchDrawEmojis() {
    launchCanvasEmojiBurst(["🤝", "😐", "⚔️", "⚖️", "🤔", "🤷"]);
  }

const comets = [];
const maxComets = 5;

function createComet() {
  const angle = (Math.PI / 180) * (30 + Math.random() * 15); // Slightly randomized downward trajectory
  return {
    x: Math.random() * width * 1.2 - width * 0.1,
    y: Math.random() * -height * 0.4,
    length: Math.random() * 180 + 120, // Longer, realistic trailing tail
    speed: Math.random() * 6 + 4,
    angle: angle,
    size: Math.random() * 2.5 + 2, // Core nucleus radius
    opacity: Math.random() * 0.6 + 0.4
  };
}

for (let i = 0; i < maxComets; i++) {
  comets.push(createComet());
}

// Add this block inside your main drawScene() function where comets are drawn:
comets.forEach((comet) => {
  // Move along trajectory
  comet.x += Math.cos(comet.angle) * comet.speed;
  comet.y += Math.sin(comet.angle) * comet.speed;

  // Tail endpoint calculations (behind the movement head)
  const tailX = comet.x - Math.cos(comet.angle) * comet.length;
  const tailY = comet.y - Math.sin(comet.angle) * comet.length;

  // 1. Tapered & Glowing Gas Tail
  const tailGradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
  tailGradient.addColorStop(0, `rgba(224, 242, 254, ${comet.opacity * 0.9})`); // Bright icy white-blue head
  tailGradient.addColorStop(0.15, `rgba(56, 189, 248, ${comet.opacity * 0.6})`); // Vibrant cyan coma glow
  tailGradient.addColorStop(0.5, `rgba(129, 140, 248, ${comet.opacity * 0.25})`); // Indigo gas tail
  tailGradient.addColorStop(1, "rgba(0, 0, 0, 0)"); // Fades into space

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(comet.x, comet.y);
  ctx.lineTo(tailX, tailY);
  ctx.strokeStyle = tailGradient;
  ctx.lineWidth = comet.size * 2;
  ctx.lineCap = "round";
  ctx.stroke();

  // 2. Diffuse Coma (Outer Gas Cloud around nucleus)
  const comaGrad = ctx.createRadialGradient(
    comet.x, comet.y, 0,
    comet.x, comet.y, comet.size * 5
  );
  comaGrad.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
  comaGrad.addColorStop(0.3, `rgba(56, 189, 248, ${comet.opacity * 0.5})`);
  comaGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.beginPath();
  ctx.arc(comet.x, comet.y, comet.size * 5, 0, Math.PI * 2);
  ctx.fillStyle = comaGrad;
  ctx.fill();

  // 3. Bright Solid Nucleus (Core)
  ctx.beginPath();
  ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${comet.opacity})`;
  ctx.fill();
  ctx.restore();

  // Reset comet when it leaves the visible screen boundaries
  if (comet.y > height + 100 || comet.x > width + 100) {
    Object.assign(comet, createComet());
  }
});

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    const comets = [];
    const maxComets = 8;

    function createComet() {
      return {
        x: Math.random() * width * 1.3,
        y: Math.random() * -height * 0.3,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 5 + 3,
        angle: Math.PI / 4,
        opacity: Math.random() * 0.8 + 0.2,
        size: Math.random() * 2 + 1
      };
    }

    for (let i = 0; i < maxComets; i++) {
      comets.push(createComet());
    }

    function drawScene() {
      ctx.clearRect(0, 0, width, height);

      comets.forEach((comet) => {
        comet.x -= Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;

        const tailX = comet.x + Math.cos(comet.angle) * comet.length;
        const tailY = comet.y - Math.sin(comet.angle) * comet.length;

        const cometGradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
        cometGradient.addColorStop(0, `rgba(192, 132, 252, ${comet.opacity})`);
        cometGradient.addColorStop(0.4, `rgba(129, 140, 248, ${comet.opacity * 0.6})`);
        cometGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = cometGradient;
        ctx.lineWidth = comet.size;
        ctx.lineCap = "round";
        ctx.stroke();

        if (comet.y > height + 100 || comet.x < -100) {
          Object.assign(comet, createComet());
        }
      });

      requestAnimationFrame(drawScene);
    }

    drawScene();
  }

  function handleCellClick(event) {
    const index = parseInt(event.target.getAttribute("data-index"));

    if (board[index] !== "" || !isGameActive) return;

    makeMove(index, humanPlayer);

    if (isGameActive) {
      setTimeout(computerTurn, 350);
    }
  }

  function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].style.color = player === "X" ? "#818cf8" : "#ec4899";

    const winner = checkWinner(board);
    if (winner) {
      endGame(winner);
    }
  }

  function computerTurn() {
    if (!isGameActive) return;

    const emptyIndexes = [];
    board.forEach((val, idx) => {
      if (val === "") emptyIndexes.push(idx);
    });

    if (emptyIndexes.length === 0) return;

    let chosenMove = findWinningMove(aiPlayer);

    if (chosenMove === -1) {
      chosenMove = findWinningMove(humanPlayer);
    }

    if (chosenMove === -1) {
      if (Math.random() < 0.6) {
        const preferredSpots = [4, 0, 2, 6, 8].filter(idx => board[idx] === "");
        if (preferredSpots.length > 0) {
          chosenMove = preferredSpots[Math.floor(Math.random() * preferredSpots.length)];
        }
      }
    }

    if (chosenMove === -1) {
      chosenMove = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    }

    makeMove(chosenMove, aiPlayer);
  }

  function findWinningMove(player) {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      const values = [board[a], board[b], board[c]];
      if (values.filter(val => val === player).length === 2 && values.includes("")) {
        if (board[a] === "") return a;
        if (board[b] === "") return b;
        if (board[c] === "") return c;
      }
    }
    return -1;
  }

  function checkWinner(b) {
    for (let condition of winningConditions) {
      const [a, bIdx, c] = condition;
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        return b[a];
      }
    }
    if (b.every(cell => cell !== "")) {
      return "draw";
    }
    return null;
  }

  function endGame(winner) {
    isGameActive = false;

    if (winnerText) {
      if (winner === humanPlayer) {
        winnerText.textContent = "🏆 You Won!";
        launchHappyEmojis();
        if (typeof confetti === "function") {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      } else if (winner === aiPlayer) {
        winnerText.textContent = "🤖 Computer Won!";
        launchSadEmojis();
      } else if (winner === "draw") {
        winnerText.textContent = "🤝 It's a Draw!";
        launchDrawEmojis();
      }
    }

    if (winnerModal) {
      winnerModal.style.display = "flex";
      winnerModal.classList.add("show");
    }
  }

  function restartGame(e) {
    if (e) e.stopPropagation();

    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;

    if (winnerModal) {
      winnerModal.style.display = "none";
      winnerModal.classList.remove("show");
    }

    cells.forEach(cell => {
      cell.textContent = "";
      cell.style.color = "";
    });
  }

  cells.forEach(cell => cell.addEventListener("click", handleCellClick));

  if (restartBtn) {
    restartBtn.addEventListener("click", restartGame);
  }

  if (modalRestartBtn) {
    modalRestartBtn.addEventListener("click", restartGame);
  }
});
