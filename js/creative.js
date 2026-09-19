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
        <div class="game-title"><i class="fas fa-gamepad"></i> TINKER RETRO ARCADE</div>
        <button class="cmd-close-btn" id="gameClose">✕</button>
      </div>

      <!-- Game Switcher Tabs -->
      <div class="game-tabs" id="gameTabs">
        <button class="game-tab active" data-game="bughunter">👾 Bug Hunter</button>
        <button class="game-tab" data-game="cybersnake">🐍 Cyber Snake</button>
        <button class="game-tab" data-game="circuitbreaker">🧱 Circuit Breaker</button>
      </div>

      <div class="game-hud">
        <div>SCORE: <span id="hudScore">0</span></div>
        <div>HIGH SCORE: <span id="hudHighScore">0</span></div>
        <div><span id="hudLivesLabel">LIVES:</span> <span id="hudLives">❤❤❤</span></div>
      </div>

      <canvas id="gameCanvas" width="440" height="300"></canvas>

      <!-- Mobile Virtual D-Pad -->
      <div class="dpad-container" id="mobileDpad">
        <button class="dpad-btn dpad-up" id="btnUp" aria-label="Up">▲</button>
        <button class="dpad-btn dpad-left" id="btnLeft" aria-label="Left">◀</button>
        <button class="dpad-btn dpad-down" id="btnDown" aria-label="Down">▼</button>
        <button class="dpad-btn dpad-right" id="btnRight" aria-label="Right">▶</button>
      </div>

      <div class="game-controls">
        <button class="btn btn-primary btn-sm" id="gameStartBtn">Start Game</button>
      </div>

      <div class="game-instructions" id="gameInstructions">
        Desktop: Use <strong>Arrow Keys</strong> or <strong>A / D</strong> · Mobile: Use D-Pad or tap canvas<br/>
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

  // ─── 6. RETRO ARCADE: 3-IN-1 MINI-GAMES ─────────────────────
  const gameModal        = document.getElementById('gameModal');
  const gameClose        = document.getElementById('gameClose');
  const gameCanvas       = document.getElementById('gameCanvas');
  const gameStartBtn     = document.getElementById('gameStartBtn');
  const hudScore         = document.getElementById('hudScore');
  const hudHighScore     = document.getElementById('hudHighScore');
  const hudLives         = document.getElementById('hudLives');
  const hudLivesLabel    = document.getElementById('hudLivesLabel');
  const gameInstructions = document.getElementById('gameInstructions');
  const gameTabs         = document.querySelectorAll('.game-tab');

  const btnUp    = document.getElementById('btnUp');
  const btnDown  = document.getElementById('btnDown');
  const btnLeft  = document.getElementById('btnLeft');
  const btnRight = document.getElementById('btnRight');

  const cmdActionGame = document.getElementById('cmdActionGame');

  let activeGame = 'bughunter'; // 'bughunter' | 'cybersnake' | 'circuitbreaker'
  let isPlaying = false;
  let gameLoopId = null;
  let ctx = gameCanvas.getContext('2d');

  let score = 0;
  let lives = 3;

  // Synthesized Retro Web Audio
  let audioCtx = null;
  function playSound(type) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'pickup') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'bounce') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(500, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      // Audio safe fallback
    }
  }

  function getHighScore(game) {
    if (game === 'bughunter') {
      return parseInt(localStorage.getItem('tinker_bughunter_high') || localStorage.getItem('tinker_high_score') || 0, 10);
    } else if (game === 'cybersnake') {
      return parseInt(localStorage.getItem('tinker_snake_high') || 0, 10);
    } else if (game === 'circuitbreaker') {
      return parseInt(localStorage.getItem('tinker_breaker_high') || 0, 10);
    }
    return 0;
  }

  function saveHighScore(game, val) {
    if (game === 'bughunter') {
      localStorage.setItem('tinker_bughunter_high', val);
      localStorage.setItem('tinker_high_score', val);
    } else if (game === 'cybersnake') {
      localStorage.setItem('tinker_snake_high', val);
    } else if (game === 'circuitbreaker') {
      localStorage.setItem('tinker_breaker_high', val);
    }
  }

  function updateHud() {
    hudScore.textContent = score;
    hudHighScore.textContent = getHighScore(activeGame);
    if (activeGame === 'cybersnake') {
      hudLivesLabel.textContent = 'LENGTH:';
      hudLives.textContent = snake.length;
    } else {
      hudLivesLabel.textContent = 'LIVES:';
      hudLives.textContent = '❤'.repeat(Math.max(0, lives));
    }
  }

  // ─── GAME 1: BUG HUNTER DATA ───────────────────────────────
  let player = { x: 196, y: 260, width: 48, height: 20, speed: 7 };
  let items = [];
  let moveLeft = false;
  let moveRight = false;
  let moveUp = false;
  let moveDown = false;

  // ─── GAME 2: CYBER SNAKE DATA ──────────────────────────────
  const GRID_SIZE = 20;
  const GRID_COLS = Math.floor(gameCanvas.width / GRID_SIZE); // 22
  const GRID_ROWS = Math.floor(gameCanvas.height / GRID_SIZE); // 15
  let snake = [];
  let snakeDir = { x: 1, y: 0 };
  let nextSnakeDir = { x: 1, y: 0 };
  let food = { x: 15, y: 7 };
  let lastSnakeStepTime = 0;
  const SNAKE_SPEED = 115; // ms per step

  function spawnFood() {
    let emptyCells = [];
    for (let c = 0; c < GRID_COLS; c++) {
      for (let r = 0; r < GRID_ROWS; r++) {
        if (!snake.some(seg => seg.x === c && seg.y === r)) {
          emptyCells.push({ x: c, y: r });
        }
      }
    }
    if (emptyCells.length > 0) {
      food = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
  }

  // ─── GAME 3: CIRCUIT BREAKER DATA ──────────────────────────
  let paddle = { x: 180, y: 275, width: 80, height: 10, speed: 8 };
  let ball = { x: 220, y: 250, radius: 5, vx: 3.5, vy: -3.5 };
  let bricks = [];
  const BRICK_ROWS = 4;
  const BRICK_COLS = 8;
  const BRICK_WIDTH = 46;
  const BRICK_HEIGHT = 14;
  const BRICK_PAD = 6;
  const BRICK_OFFSET_LEFT = 14;
  const BRICK_OFFSET_TOP = 36;
  const ROW_CONFIG = [
    { color: '#F43F5E', pts: 40 }, // Red (System Core)
    { color: '#FB923C', pts: 30 }, // Orange (Kernel)
    { color: '#22D3EE', pts: 20 }, // Cyan (Microchip)
    { color: '#A8FF3E', pts: 10 }  // Green (Logic Gate)
  ];

  function initBricks() {
    bricks = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
      for (let c = 0; c < BRICK_COLS; c++) {
        const bx = BRICK_OFFSET_LEFT + c * (BRICK_WIDTH + BRICK_PAD);
        const by = BRICK_OFFSET_TOP + r * (BRICK_HEIGHT + BRICK_PAD);
        bricks.push({
          x: bx,
          y: by,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          color: ROW_CONFIG[r].color,
          pts: ROW_CONFIG[r].pts,
          alive: true
        });
      }
    }
  }

  // ─── GAME INITIALIZATION ────────────────────────────────────
  function setupGame(gameName) {
    stopGameLoop();
    activeGame = gameName;
    score = 0;

    // Update game switcher tab UI
    gameTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-game') === gameName);
    });

    if (gameName === 'bughunter') {
      lives = 3;
      items = [];
      player.x = (gameCanvas.width - player.width) / 2;
      gameInstructions.innerHTML = `
        Desktop: Use <strong>Arrow Keys</strong> or <strong>A / D</strong> · Mobile: Use D-Pad or tap sides<br/>
        Catch ⚡ Circuits (+10pts) · Dodge 👾 Bugs (-1 Life)
      `;
    } else if (gameName === 'cybersnake') {
      lives = 1;
      snake = [
        { x: 8, y: 7 },
        { x: 7, y: 7 },
        { x: 6, y: 7 }
      ];
      snakeDir = { x: 1, y: 0 };
      nextSnakeDir = { x: 1, y: 0 };
      spawnFood();
      gameInstructions.innerHTML = `
        Desktop: Use <strong>Arrow Keys</strong> or <strong>W A S D</strong> · Mobile: Use D-Pad<br/>
        Eat 💾 Code Bytes (+10pts) · Don't crash into firewall perimeter or tail!
      `;
    } else if (gameName === 'circuitbreaker') {
      lives = 3;
      paddle.x = (gameCanvas.width - paddle.width) / 2;
      ball.x = gameCanvas.width / 2;
      ball.y = paddle.y - 12;
      ball.vx = (Math.random() > 0.5 ? 3.5 : -3.5);
      ball.vy = -3.8;
      initBricks();
      gameInstructions.innerHTML = `
        Desktop: Use <strong>Arrow Keys</strong> or <strong>A / D</strong> · Mobile: Tap sides or use D-Pad<br/>
        Bounce CET photon beam to shatter 32 cyber logic gates!
      `;
    }

    updateHud();
    drawInitialScreen();
    gameStartBtn.textContent = 'Start Game';
  }

  function drawInitialScreen() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Subtle matrix-like grid background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < gameCanvas.width; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, gameCanvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < gameCanvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(gameCanvas.width, y);
      ctx.stroke();
    }

    ctx.fillStyle = '#A8FF3E';
    ctx.font = 'bold 18px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';

    let titleText = 'BUG HUNTER';
    let subtitle = 'Catch ⚡ Circuits · Avoid 👾 Bugs';
    if (activeGame === 'cybersnake') {
      titleText = 'CYBER SNAKE';
      subtitle = 'Feed the snake with 💾 Code Bytes';
    } else if (activeGame === 'circuitbreaker') {
      titleText = 'CIRCUIT BREAKER';
      subtitle = 'Shatter logic gates with photon pulse';
    }

    ctx.fillText(`🎮 ${titleText}`, gameCanvas.width / 2, 120);
    ctx.font = '13px monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(subtitle, gameCanvas.width / 2, 150);
    ctx.fillStyle = '#22D3EE';
    ctx.fillText('Press START GAME to Play', gameCanvas.width / 2, 185);
  }

  function openMiniGame() {
    closeCommandPalette();
    gameModal.classList.add('open');
    setupGame(activeGame);
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

  // Tab switching
  gameTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const g = tab.getAttribute('data-game');
      setupGame(g);
    });
  });

  function stopGameLoop() {
    isPlaying = false;
    if (gameLoopId) {
      cancelAnimationFrame(gameLoopId);
      gameLoopId = null;
    }
  }

  function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    score = 0;
    if (activeGame === 'bughunter') {
      lives = 3;
      items = [];
      player.x = (gameCanvas.width - player.width) / 2;
    } else if (activeGame === 'cybersnake') {
      lives = 1;
      snake = [
        { x: 8, y: 7 },
        { x: 7, y: 7 },
        { x: 6, y: 7 }
      ];
      snakeDir = { x: 1, y: 0 };
      nextSnakeDir = { x: 1, y: 0 };
      spawnFood();
      lastSnakeStepTime = performance.now();
    } else if (activeGame === 'circuitbreaker') {
      lives = 3;
      paddle.x = (gameCanvas.width - paddle.width) / 2;
      ball.x = gameCanvas.width / 2;
      ball.y = paddle.y - 12;
      ball.vx = (Math.random() > 0.5 ? 3.5 : -3.5);
      ball.vy = -3.8;
      initBricks();
    }
    updateHud();
    gameStartBtn.textContent = 'Restart Game';
    gameLoopId = requestAnimationFrame(mainGameLoop);
  }

  gameStartBtn.addEventListener('click', startGame);

  // ─── UNIFIED CONTROLS ───────────────────────────────────────
  window.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'ArrowLeft' || k.toLowerCase() === 'a') {
      moveLeft = true;
      if (activeGame === 'cybersnake' && snakeDir.x === 0) nextSnakeDir = { x: -1, y: 0 };
    }
    if (k === 'ArrowRight' || k.toLowerCase() === 'd') {
      moveRight = true;
      if (activeGame === 'cybersnake' && snakeDir.x === 0) nextSnakeDir = { x: 1, y: 0 };
    }
    if (k === 'ArrowUp' || k.toLowerCase() === 'w') {
      moveUp = true;
      if (activeGame === 'cybersnake' && snakeDir.y === 0) nextSnakeDir = { x: 0, y: -1 };
    }
    if (k === 'ArrowDown' || k.toLowerCase() === 's') {
      moveDown = true;
      if (activeGame === 'cybersnake' && snakeDir.y === 0) nextSnakeDir = { x: 0, y: 1 };
    }
  });

  window.addEventListener('keyup', (e) => {
    const k = e.key;
    if (k === 'ArrowLeft' || k.toLowerCase() === 'a') moveLeft = false;
    if (k === 'ArrowRight' || k.toLowerCase() === 'd') moveRight = false;
    if (k === 'ArrowUp' || k.toLowerCase() === 'w') moveUp = false;
    if (k === 'ArrowDown' || k.toLowerCase() === 's') moveDown = false;
  });

  // Mobile Virtual D-Pad Events
  function handleDpadPress(dir) {
    if (dir === 'left') {
      moveLeft = true;
      if (activeGame === 'cybersnake' && snakeDir.x === 0) nextSnakeDir = { x: -1, y: 0 };
    } else if (dir === 'right') {
      moveRight = true;
      if (activeGame === 'cybersnake' && snakeDir.x === 0) nextSnakeDir = { x: 1, y: 0 };
    } else if (dir === 'up') {
      moveUp = true;
      if (activeGame === 'cybersnake' && snakeDir.y === 0) nextSnakeDir = { x: 0, y: -1 };
    } else if (dir === 'down') {
      moveDown = true;
      if (activeGame === 'cybersnake' && snakeDir.y === 0) nextSnakeDir = { x: 0, y: 1 };
    }
  }

  function handleDpadRelease(dir) {
    if (dir === 'left') moveLeft = false;
    if (dir === 'right') moveRight = false;
    if (dir === 'up') moveUp = false;
    if (dir === 'down') moveDown = false;
  }

  [
    { btn: btnLeft, dir: 'left' },
    { btn: btnRight, dir: 'right' },
    { btn: btnUp, dir: 'up' },
    { btn: btnDown, dir: 'down' }
  ].forEach(({ btn, dir }) => {
    if (!btn) return;
    const startHandler = (e) => {
      e.preventDefault();
      handleDpadPress(dir);
    };
    const endHandler = (e) => {
      e.preventDefault();
      handleDpadRelease(dir);
    };
    btn.addEventListener('pointerdown', startHandler);
    btn.addEventListener('pointerup', endHandler);
    btn.addEventListener('pointercancel', endHandler);
    btn.addEventListener('pointerleave', endHandler);
  });

  // Touch screen tap/drag on canvas
  gameCanvas.addEventListener('pointerdown', (e) => {
    const rect = gameCanvas.getBoundingClientRect();
    const touchX = (e.clientX - rect.left) * (gameCanvas.width / rect.width);
    if (activeGame === 'bughunter') {
      if (touchX < player.x) moveLeft = true;
      else moveRight = true;
    } else if (activeGame === 'circuitbreaker') {
      if (touchX < paddle.x + paddle.width / 2) moveLeft = true;
      else moveRight = true;
    }
  });

  gameCanvas.addEventListener('pointermove', (e) => {
    if (!isPlaying) return;
    if (e.buttons > 0) {
      const rect = gameCanvas.getBoundingClientRect();
      const touchX = (e.clientX - rect.left) * (gameCanvas.width / rect.width);
      if (activeGame === 'bughunter') {
        player.x = Math.max(0, Math.min(gameCanvas.width - player.width, touchX - player.width / 2));
      } else if (activeGame === 'circuitbreaker') {
        paddle.x = Math.max(0, Math.min(gameCanvas.width - paddle.width, touchX - paddle.width / 2));
      }
    }
  });

  window.addEventListener('pointerup', () => {
    if (activeGame !== 'cybersnake') {
      moveLeft = false;
      moveRight = false;
    }
  });

  // ─── MASTER GAME LOOP ───────────────────────────────────────
  function mainGameLoop(timestamp) {
    if (!isPlaying) return;

    if (activeGame === 'bughunter') {
      updateAndDrawBugHunter();
    } else if (activeGame === 'cybersnake') {
      updateAndDrawCyberSnake(timestamp);
    } else if (activeGame === 'circuitbreaker') {
      updateAndDrawCircuitBreaker();
    }

    if (isPlaying) {
      gameLoopId = requestAnimationFrame(mainGameLoop);
    }
  }

  // ─── GAME 1 LOOP: BUG HUNTER ────────────────────────────────
  function updateAndDrawBugHunter() {
    // Move player
    if (moveLeft && player.x > 0) player.x -= player.speed;
    if (moveRight && player.x + player.width < gameCanvas.width) player.x += player.speed;

    // Spawn falling items
    if (Math.random() < 0.045) {
      const isBug = Math.random() < 0.45;
      items.push({
        x: Math.random() * (gameCanvas.width - 24),
        y: -20,
        speed: 2.6 + Math.random() * 2 + (score * 0.015),
        isBug: isBug
      });
    }

    // Clear
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Retro grid lines
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

    // Draw & update items
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.speed;

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
          playSound('hit');
          updateHud();
          if (lives <= 0) {
            triggerGameOver();
            return;
          }
        } else {
          score += 10;
          playSound('pickup');
          if (score > getHighScore('bughunter')) {
            saveHighScore('bughunter', score);
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
  }

  // ─── GAME 2 LOOP: CYBER SNAKE ───────────────────────────────
  function updateAndDrawCyberSnake(timestamp) {
    if (!lastSnakeStepTime) lastSnakeStepTime = timestamp;

    if (timestamp - lastSnakeStepTime > SNAKE_SPEED) {
      lastSnakeStepTime = timestamp;
      snakeDir = nextSnakeDir;

      const head = { x: snake[0].x + snakeDir.x, y: snake[0].y + snakeDir.y };

      // Wall collision check
      if (head.x < 0 || head.x >= GRID_COLS || head.y < 0 || head.y >= GRID_ROWS) {
        playSound('hit');
        triggerGameOver();
        return;
      }

      // Self collision check
      if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        playSound('hit');
        triggerGameOver();
        return;
      }

      snake.unshift(head);

      // Check food
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        playSound('pickup');
        if (score > getHighScore('cybersnake')) {
          saveHighScore('cybersnake', score);
        }
        spawnFood();
        updateHud();
      } else {
        snake.pop();
      }
    }

    // Render Cyber Snake frame
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Neon grid pattern
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
    ctx.lineWidth = 1;
    for (let c = 0; c <= GRID_COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * GRID_SIZE, 0);
      ctx.lineTo(c * GRID_SIZE, gameCanvas.height);
      ctx.stroke();
    }
    for (let r = 0; r <= GRID_ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * GRID_SIZE);
      ctx.lineTo(gameCanvas.width, r * GRID_SIZE);
      ctx.stroke();
    }

    // Draw glowing food
    const fx = food.x * GRID_SIZE;
    const fy = food.y * GRID_SIZE;
    ctx.fillStyle = '#22D3EE';
    ctx.shadowColor = '#22D3EE';
    ctx.shadowBlur = 12;
    ctx.fillRect(fx + 3, fy + 3, GRID_SIZE - 6, GRID_SIZE - 6);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#020710';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('01', fx + GRID_SIZE / 2, fy + GRID_SIZE / 2);

    // Draw Snake
    snake.forEach((seg, index) => {
      const sx = seg.x * GRID_SIZE;
      const sy = seg.y * GRID_SIZE;
      if (index === 0) {
        // Head
        ctx.fillStyle = '#A8FF3E';
        ctx.shadowColor = '#A8FF3E';
        ctx.shadowBlur = 14;
        ctx.fillRect(sx + 1, sy + 1, GRID_SIZE - 2, GRID_SIZE - 2);
        ctx.shadowBlur = 0;
        // Head eye
        ctx.fillStyle = '#020710';
        ctx.fillRect(sx + 5, sy + 5, 4, 4);
      } else {
        // Body segment gradient fade
        const alpha = Math.max(0.35, 1 - (index / snake.length) * 0.65);
        ctx.fillStyle = `rgba(168, 255, 62, ${alpha})`;
        ctx.fillRect(sx + 2, sy + 2, GRID_SIZE - 4, GRID_SIZE - 4);
      }
    });
  }

  // ─── GAME 3 LOOP: CIRCUIT BREAKER ───────────────────────────
  function updateAndDrawCircuitBreaker() {
    // Move paddle
    if (moveLeft && paddle.x > 0) paddle.x -= paddle.speed;
    if (moveRight && paddle.x + paddle.width < gameCanvas.width) paddle.x += paddle.speed;

    // Move ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Ball wall bounce
    if (ball.x - ball.radius <= 0) {
      ball.x = ball.radius;
      ball.vx = -ball.vx;
      playSound('bounce');
    } else if (ball.x + ball.radius >= gameCanvas.width) {
      ball.x = gameCanvas.width - ball.radius;
      ball.vx = -ball.vx;
      playSound('bounce');
    }

    if (ball.y - ball.radius <= 0) {
      ball.y = ball.radius;
      ball.vy = -ball.vy;
      playSound('bounce');
    }

    // Ball paddle bounce
    if (
      ball.y + ball.radius >= paddle.y &&
      ball.y - ball.radius <= paddle.y + paddle.height &&
      ball.x >= paddle.x - 4 &&
      ball.x <= paddle.x + paddle.width + 4 &&
      ball.vy > 0
    ) {
      ball.vy = -Math.abs(ball.vy);
      // Angular deflection based on where ball struck paddle
      const hitOffset = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
      ball.vx = hitOffset * 5.2;
      playSound('bounce');
    }

    // Ball brick collisions
    let activeBricksCount = 0;
    for (let i = 0; i < bricks.length; i++) {
      const b = bricks[i];
      if (!b.alive) continue;
      activeBricksCount++;

      if (
        ball.x + ball.radius >= b.x &&
        ball.x - ball.radius <= b.x + b.width &&
        ball.y + ball.radius >= b.y &&
        ball.y - ball.radius <= b.y + b.height
      ) {
        b.alive = false;
        ball.vy = -ball.vy;
        score += b.pts;
        playSound('pickup');

        if (score > getHighScore('circuitbreaker')) {
          saveHighScore('circuitbreaker', score);
        }
        updateHud();
        break;
      }
    }

    // Respawn board if all bricks cleared
    if (activeBricksCount === 0) {
      score += 100;
      playSound('pickup');
      initBricks();
      ball.x = gameCanvas.width / 2;
      ball.y = paddle.y - 15;
      ball.vy = -Math.abs(ball.vy) * 1.1;
      updateHud();
    }

    // Ball fell below screen
    if (ball.y - ball.radius > gameCanvas.height) {
      lives--;
      playSound('hit');
      updateHud();
      if (lives <= 0) {
        triggerGameOver();
        return;
      } else {
        // Reset ball on paddle
        ball.x = paddle.x + paddle.width / 2;
        ball.y = paddle.y - 12;
        ball.vx = (Math.random() > 0.5 ? 3.5 : -3.5);
        ball.vy = -3.8;
      }
    }

    // Render frame
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Subtle background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let y = 0; y < gameCanvas.height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(gameCanvas.width, y);
      ctx.stroke();
    }

    // Draw bricks
    bricks.forEach(b => {
      if (!b.alive) return;
      ctx.fillStyle = b.color;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 6;
      ctx.fillRect(b.x, b.y, b.width, b.height);
      ctx.shadowBlur = 0;
      // Chip trace pattern inside brick
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(b.x + 2, b.y + 2, b.width - 4, 2);
    });

    // Draw paddle
    ctx.fillStyle = '#A8FF3E';
    ctx.shadowColor = '#A8FF3E';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 4) : ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw photonic ball
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#22D3EE';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // ─── GAME OVER ──────────────────────────────────────────────
  function triggerGameOver() {
    isPlaying = false;
    stopGameLoop();
    playSound('gameover');

    ctx.fillStyle = 'rgba(4, 13, 26, 0.88)';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.fillStyle = '#F43F5E';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SYSTEM OVERRIDE / GAME OVER', gameCanvas.width / 2, 125);

    ctx.font = '14px monospace';
    ctx.fillStyle = '#A8FF3E';
    ctx.fillText(`Final Score: ${score}`, gameCanvas.width / 2, 160);

    const high = getHighScore(activeGame);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px monospace';
    ctx.fillText(`Session High Score: ${high}`, gameCanvas.width / 2, 185);

    gameStartBtn.textContent = 'Play Again';
  }

});
