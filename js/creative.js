/* ============================================================
   CREATIVE.JS — Command Palette (⌘K), Tinker Arcade Mini-Game,
   Matrix Code Rain, and Easter Eggs
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. INJECT COMMAND PALETTE & MODALS HTML ───────────────
  const overlayHtml = `
  <!-- Matrix Rain Canvas -->
  <canvas id="matrixCanvas"></canvas>

  <!-- Floating Tinker Lab Button -->
  <button class="tinker-lab-fab" id="tinkerLabFab" title="Open Tinker Lab (⌘K)">
    <span class="fab-dot"></span>
    <span>⚡ Tinker Lab</span>
  </button>

  <!-- Command Palette Modal -->
  <div class="cmd-modal-overlay" id="cmdOverlay">
    <div class="cmd-modal">
      <div class="cmd-header">
        <i class="fas fa-terminal"></i>
        <input type="text" class="cmd-input" id="cmdInput" placeholder="Type a command, page, or action... (e.g. 'game', 'events', 'matrix')" autocomplete="off" />
        <button class="cmd-close-btn" id="cmdClose" aria-label="Close Command Palette">✕</button>
      </div>
      <div class="cmd-list" id="cmdList">
        <div class="cmd-group-label">Quick Navigation</div>
        <a href="index.html" class="cmd-item" data-keyword="home landing main">
          <div class="cmd-item-left"><div class="cmd-item-icon"><i class="fas fa-home"></i></div><span class="cmd-item-title">Home / Landing</span></div>
          <span class="cmd-item-badge">Page</span>
        </a>
        <a href="about.html" class="cmd-item" data-keyword="about culture pillars story">
          <div class="cmd-item-left"><div class="cmd-item-icon"><i class="fas fa-info-circle"></i></div><span class="cmd-item-title">About &amp; TinkerHub Culture</span></div>
          <span class="cmd-item-badge">Page</span>
        </a>
        <a href="events.html" class="cmd-item" data-keyword="events workshops hackathons buildathon sessions">
          <div class="cmd-item-left"><div class="cmd-item-icon"><i class="fas fa-calendar-alt"></i></div><span class="cmd-item-title">Events &amp; Activities</span></div>
          <span class="cmd-item-badge">Explore</span>
        </a>
        <a href="projects.html" class="cmd-item" data-keyword="projects maker kootam showcase apps hardware">
          <div class="cmd-item-left"><div class="cmd-item-icon"><i class="fas fa-code-branch"></i></div><span class="cmd-item-title">Maker Kootam / Projects</span></div>
          <span class="cmd-item-badge">Archive</span>
        </a>
        <a href="history.html" class="cmd-item" data-keyword="history timeline execom time capsule vault">
          <div class="cmd-item-left"><div class="cmd-item-icon"><i class="fas fa-history"></i></div><span class="cmd-item-title">Into the History &amp; Vault</span></div>
          <span class="cmd-item-badge">Timeline</span>
        </a>
        <a href="team.html" class="cmd-item" data-keyword="team people core execom leads members stories">
          <div class="cmd-item-left"><div class="cmd-item-icon"><i class="fas fa-users"></i></div><span class="cmd-item-title">Meet the Team &amp; Stories</span></div>
          <span class="cmd-item-badge">People</span>
        </a>
        <a href="contact.html" class="cmd-item" data-keyword="contact message join email instagram">
          <div class="cmd-item-left"><div class="cmd-item-icon"><i class="fas fa-paper-plane"></i></div><span class="cmd-item-title">Get in Touch / Join Us</span></div>
          <span class="cmd-item-badge">Connect</span>
        </a>

        <div class="cmd-group-label">Interactive Actions &amp; Easter Eggs</div>
        <div class="cmd-item" id="cmdActionGame" data-keyword="game play arcade bug hunter mini-game">
          <div class="cmd-item-left"><div class="cmd-item-icon" style="color:var(--accent-green);"><i class="fas fa-gamepad"></i></div><span class="cmd-item-title">Play "Bug Hunter" Arcade Game</span></div>
          <span class="cmd-item-badge" style="color:var(--accent-green);">Mini-Game ⚡</span>
        </div>
        <div class="cmd-item" id="cmdActionMatrix" data-keyword="matrix rain code hacker theme terminal">
          <div class="cmd-item-left"><div class="cmd-item-icon" style="color:var(--accent-green);"><i class="fas fa-code"></i></div><span class="cmd-item-title">Toggle Cyber Matrix Code Rain</span></div>
          <span class="cmd-item-badge">Easter Egg</span>
        </div>
        <div class="cmd-item" id="cmdActionQuote" data-keyword="quote inspiration words phrase wisdom">
          <div class="cmd-item-left"><div class="cmd-item-icon" style="color:var(--accent-purple);"><i class="fas fa-quote-left"></i></div><span class="cmd-item-title">Summon Random Community Wisdom</span></div>
          <span class="cmd-item-badge">Inspire</span>
        </div>
      </div>
      <div class="cmd-footer">
        <span>Navigation: <kbd>↑</kbd> <kbd>↓</kbd> to cycle · <kbd>↵</kbd> to select</span>
        <span>Press <kbd>ESC</kbd> to exit</span>
      </div>
    </div>
  </div>

  <!-- Arcade Mini-Game Modal -->
  <div class="game-modal-overlay" id="gameModal">
    <div class="game-modal-box">
      <div class="game-header">
        <div class="game-title"><i class="fas fa-gamepad"></i> TINKER BUG HUNTER</div>
        <button class="cmd-close-btn" id="gameClose">✕</button>
      </div>
      <div class="game-hud">
        <div>SCORE: <span id="hudScore">0</span></div>
        <div>HIGH SCORE: <span id="hudHighScore">0</span></div>
        <div>LIVES: <span id="hudLives">❤❤❤</span></div>
      </div>
      <canvas id="gameCanvas" width="440" height="300"></canvas>
      <div class="game-controls">
        <button class="btn btn-primary btn-sm" id="gameStartBtn">Start Game</button>
      </div>
      <div class="game-instructions">
        Desktop: Use <strong>Arrow Keys</strong> or <strong>A / D</strong> to steer · Mobile: Tap left / right on screen<br/>
        Collect ⚡ Circuit Orbs · Dodge 👾 Bugs!
      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', overlayHtml);

  // ─── 2. COMMAND PALETTE LOGIC ──────────────────────────────
  const cmdOverlay = document.getElementById('cmdOverlay');
  const cmdInput   = document.getElementById('cmdInput');
  const cmdClose   = document.getElementById('cmdClose');
  const cmdList    = document.getElementById('cmdList');
  const cmdFab     = document.getElementById('tinkerLabFab');

  function openCommandPalette() {
    cmdOverlay.classList.add('open');
    cmdInput.value = '';
    filterCommands('');
    setTimeout(() => cmdInput.focus(), 100);
  }

  function closeCommandPalette() {
    cmdOverlay.classList.remove('open');
  }

  // Keyboard shortcut Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdOverlay.classList.contains('open')) closeCommandPalette();
      else openCommandPalette();
    }
    if (e.key === 'Escape') {
      closeCommandPalette();
      closeMiniGame();
    }
  });

  if (cmdFab) cmdFab.addEventListener('click', openCommandPalette);
  if (cmdClose) cmdClose.addEventListener('click', closeCommandPalette);

  cmdOverlay.addEventListener('click', (e) => {
    if (e.target === cmdOverlay) closeCommandPalette();
  });

  // Filter commands
  function filterCommands(query) {
    const q = query.toLowerCase().trim();
    const items = cmdList.querySelectorAll('.cmd-item');
    items.forEach(item => {
      const keyword = (item.dataset.keyword || '').toLowerCase();
      const text = item.textContent.toLowerCase();
      if (!q || keyword.includes(q) || text.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  cmdInput.addEventListener('input', (e) => {
    filterCommands(e.target.value);
  });

  // ─── 3. RANDOM COMMUNITY WISDOM ACTION ─────────────────────
  const quotes = [
    "\"More than a club. It’s a community.\" — TinkerHub CET",
    "\"Learn something. Build something. Share something.\"",
    "\"Turn ideas into reality — even if it breaks along the way.\"",
    "\"Knowledge is better when shared with curious minds.\"",
    "\"Past builds our future. Keep tinkering! ✨\"",
    "\"The best code is the code built together with friends.\""
  ];

  const cmdActionQuote = document.getElementById('cmdActionQuote');
  if (cmdActionQuote) {
    cmdActionQuote.addEventListener('click', () => {
      closeCommandPalette();
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      if (window.showCopyTooltip) {
        window.showCopyTooltip(randomQuote);
      } else {
        alert(randomQuote);
      }
    });
  }

  // ─── 4. MATRIX RAIN EFFECT ─────────────────────────────────
  const matrixCanvas = document.getElementById('matrixCanvas');
  let matrixActive = false;
  let matrixInterval = null;

  function toggleMatrixRain() {
    matrixActive = !matrixActive;
    if (matrixActive) {
      matrixCanvas.classList.add('active');
      startMatrixAnimation();
      if (window.showCopyTooltip) window.showCopyTooltip('🟢 Matrix Code Rain Activated!');
    } else {
      matrixCanvas.classList.remove('active');
      clearInterval(matrixInterval);
      if (window.showCopyTooltip) window.showCopyTooltip('Matrix Rain Disabled');
    }
  }

  function startMatrixAnimation() {
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const chars = '01TINKERHUBCET{}/<>=+*#@!%&';
    const fontSize = 14;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = Array(columns).fill(1);

    clearInterval(matrixInterval);
    matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(4, 13, 26, 0.08)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      ctx.fillStyle = '#A8FF3E';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 45);
  }

  const cmdActionMatrix = document.getElementById('cmdActionMatrix');
  if (cmdActionMatrix) {
    cmdActionMatrix.addEventListener('click', () => {
      closeCommandPalette();
      toggleMatrixRain();
    });
  }

  // ─── 5. KONAMI CODE EASTER EGG ─────────────────────────────
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
  ];
  let konamiIndex = 0;

  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === konamiSequence[konamiIndex].toLowerCase()) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        toggleMatrixRain();
        openMiniGame();
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ─── 6. ARCADE MINI-GAME: TINKER BUG HUNTER ─────────────────
  const gameModal    = document.getElementById('gameModal');
  const gameClose    = document.getElementById('gameClose');
  const gameCanvas   = document.getElementById('gameCanvas');
  const gameStartBtn = document.getElementById('gameStartBtn');
  const hudScore     = document.getElementById('hudScore');
  const hudHighScore = document.getElementById('hudHighScore');
  const hudLives     = document.getElementById('hudLives');

  const cmdActionGame = document.getElementById('cmdActionGame');

  function openMiniGame() {
    closeCommandPalette();
    gameModal.classList.add('open');
    initGame();
  }

  function closeMiniGame() {
    gameModal.classList.remove('open');
    stopGameLoop();
  }

  if (cmdActionGame) cmdActionGame.addEventListener('click', openMiniGame);
  if (gameClose) gameClose.addEventListener('click', closeMiniGame);
  gameModal.addEventListener('click', (e) => {
    if (e.target === gameModal) closeMiniGame();
  });

  let ctx = gameCanvas.getContext('2d');
  let gameLoopId = null;
  let score = 0;
  let highScore = localStorage.getItem('tinker_high_score') || 0;
  let lives = 3;
  let player = { x: 200, y: 260, width: 44, height: 20, speed: 7 };
  let items = [];
  let isPlaying = false;
  let moveLeft = false;
  let moveRight = false;

  hudHighScore.textContent = highScore;

  function initGame() {
    score = 0;
    lives = 3;
    items = [];
    player.x = (gameCanvas.width - player.width) / 2;
    updateHud();
    drawInitialScreen();
  }

  function updateHud() {
    hudScore.textContent = score;
    hudHighScore.textContent = highScore;
    hudLives.textContent = '❤'.repeat(Math.max(0, lives));
  }

  function drawInitialScreen() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.fillStyle = '#A8FF3E';
    ctx.font = '16px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Press START to Play!', gameCanvas.width / 2, 130);
    ctx.font = '12px monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Catch ⚡ Circuits (+10pts) · Avoid 👾 Bugs (-1 Life)', gameCanvas.width / 2, 160);
  }

  function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    initGame();
    gameStartBtn.textContent = 'Restart Game';
    gameLoop();
  }

  gameStartBtn.addEventListener('click', startGame);

  function stopGameLoop() {
    isPlaying = false;
    if (gameLoopId) cancelAnimationFrame(gameLoopId);
  }

  // Player controls
  window.addEventListener('keydown', (e) => {
    if (!isPlaying) return;
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') moveLeft = true;
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') moveRight = true;
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') moveLeft = false;
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') moveRight = false;
  });

  // Touch screen steer
  gameCanvas.addEventListener('touchstart', (e) => {
    const rect = gameCanvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    if (touchX < gameCanvas.width / 2) moveLeft = true;
    else moveRight = true;
  });

  gameCanvas.addEventListener('touchend', () => {
    moveLeft = false;
    moveRight = false;
  });

  function gameLoop() {
    if (!isPlaying) return;

    // Update player
    if (moveLeft && player.x > 0) player.x -= player.speed;
    if (moveRight && player.x + player.width < gameCanvas.width) player.x += player.speed;

    // Spawn items
    if (Math.random() < 0.04) {
      const isBug = Math.random() < 0.45;
      items.push({
        x: Math.random() * (gameCanvas.width - 24),
        y: -20,
        size: 20,
        speed: 2.5 + Math.random() * 2 + (score * 0.02),
        isBug: isBug
      });
    }

    // Render frame
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Draw retro grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < gameCanvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, gameCanvas.height);
      ctx.stroke();
    }

    // Draw player bracket
    ctx.fillStyle = '#A8FF3E';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#A8FF3E';
    ctx.shadowBlur = 10;
    ctx.fillText('<CET/>', player.x + player.width / 2, player.y + 16);
    ctx.shadowBlur = 0;

    // Update & draw items
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.speed;

      // Draw item
      ctx.font = '16px serif';
      ctx.textAlign = 'center';
      if (it.isBug) {
        ctx.fillText('👾', it.x + 10, it.y + 14);
      } else {
        ctx.shadowColor = '#22D3EE';
        ctx.shadowBlur = 8;
        ctx.fillText('⚡', it.x + 10, it.y + 14);
        ctx.shadowBlur = 0;
      }

      // Check collision
      if (
        it.y + 16 >= player.y &&
        it.y <= player.y + player.height &&
        it.x + 16 >= player.x &&
        it.x <= player.x + player.width
      ) {
        if (it.isBug) {
          lives--;
          updateHud();
          if (lives <= 0) {
            gameOver();
            return;
          }
        } else {
          score += 10;
          if (score > highScore) {
            highScore = score;
            localStorage.setItem('tinker_high_score', highScore);
          }
          updateHud();
        }
        items.splice(i, 1);
        continue;
      }

      // Out of bounds
      if (it.y > gameCanvas.height) {
        items.splice(i, 1);
      }
    }

    gameLoopId = requestAnimationFrame(gameLoop);
  }

  function gameOver() {
    isPlaying = false;
    ctx.fillStyle = 'rgba(4, 13, 26, 0.85)';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.fillStyle = '#F43F5E';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', gameCanvas.width / 2, 130);
    ctx.font = '14px monospace';
    ctx.fillStyle = '#A8FF3E';
    ctx.fillText(`Final Score: ${score}`, gameCanvas.width / 2, 165);
    gameStartBtn.textContent = 'Play Again';
  }

});
