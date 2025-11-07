/* ------------- Winter 2024 EECS 493 Assignment 3 Starter Code ------------ */

/* ------------------------ GLOBAL HELPER VARAIBLES ------------------------ */
// Difficulty Helpers
let astProjectileSpeed = 3;            // easy: 1, norm: 3, hard: 5

// Game Object Helpers
let currentAsteroid = 1;
const AST_OBJECT_REFRESH_RATE = 15;
const maxPersonPosX = 1218;
const maxPersonPosY = 658;
const PERSON_SPEED = 5;                // #pixels each time player moves by
const portalOccurrence = 15000;        // portal spawns every 15 seconds
const portalGone = 5000;               // portal disappears in 5 seconds
const shieldOccurrence = 10000;        // shield spawns every 10 seconds
const shieldGone = 5000;               // shield disappears in 5 seconds

// Movement Helpers
let LEFT = false;
let RIGHT = false;
let UP = false;
let DOWN = false;

// TODO: ADD YOUR GLOBAL HELPER VARIABLES (IF NEEDED)
const danger_levels = {"Easy": 10, "Normal": 20, "Hard": 30};
const spawn_rates = {"Easy": 1000, "Normal": 800, "Hard": 600};
const DEFAULT_X = 540;
const DEFAULT_Y = 350;

let collect_sound;
let die_sound;
let first_time = true;
let player_speed = PERSON_SPEED;

/* --------------------------------- MAIN ---------------------------------- */
$(document).ready(function () {
  // jQuery selectors
  game_window = $('.game-window');
  game_screen = $("#actual-game");
  asteroid_section = $('.asteroidSection');

  // hide all other pages initially except landing page
  game_screen.hide();
  $('.tutorial-screen').hide();
  $('.settings-panel').hide();
  $('.gameover-window').hide();
  $('#portal').hide();
  $('#shield').hide();


  /* -------------------- ASSIGNMENT 2 SELECTORS BEGIN -------------------- */
  main_screen = $('.main-screen');
  settings_panel = $('.settings-panel');
  tutorial_screen = $('.tutorial-screen');
  play_btn = $('#playButton').click(tutorial_page);
  settings_btn = $('#settingsButton').click(open_settings);

  /* --------------------- ASSIGNMENT 2 SELECTORS END --------------------- */

  // TODO: DEFINE YOUR JQUERY SELECTORS (FOR ASSIGNMENT 3) HERE
  gameover_window = $('.gameover-window');
  start_btn = $('#startButton').on('click', show_game);
  restart_btn = $('#restartButton').click(restart_game);
  danger = $('#danger');
  score_selector = $('#score');
  level = $('#level');
  toggle_mode = $('.difficulty');
  get_ready = $('.get-ready');
  portal = $('#portal');
  shield = $('#shield');
  player = new Player();
  player.id.attr('src', 'src/player/player.gif');
  collect_sound = document.getElementById('collect-sound');
  die_sound = document.getElementById('die-sound');

  // Example: Spawn an asteroid that travels from one border to another
});


/* ---------------------------- EVENT HANDLERS ----------------------------- */
// Keydown event handler
document.onkeydown = function (e) {
  if (e.key == 'ArrowLeft') LEFT = true;
  if (e.key == 'ArrowRight') RIGHT = true;
  if (e.key == 'ArrowUp') UP = true;
  if (e.key == 'ArrowDown') DOWN = true;
}

// Keyup event handler
document.onkeyup = function (e) {
  if (e.key == 'ArrowLeft') LEFT = false;
  if (e.key == 'ArrowRight') RIGHT = false;
  if (e.key == 'ArrowUp') UP = false;
  if (e.key == 'ArrowDown') DOWN = false;
}

/* ------------------ ASSIGNMENT 2 EVENT HANDLERS BEGIN ------------------ */
// Tutorial screen
function tutorial_page() {
  main_screen.hide();
  if (first_time) tutorial_screen.show();

  // Sets difficulty, asteroid speed, and spawn rate
  difficulty = toggle_mode.children().filter((index, e) => $(e).css('border-color') == "rgb(255, 255, 0)");
  astProjectileSpeed = difficulty.val() * 1.0;
  ast_spawn_rate = spawn_rates[difficulty.text()];
  danger.text(danger_levels[difficulty.text()]);

  collect_sound.volume = $('.slider').val() / 100;
  die_sound.volume = $('.slider').val() / 100;
  if (!first_time) show_game();
}

// Settings panel
function open_settings() {
  settings_panel.show();
  slider = $('.slider');
  volume = $('#rangeVolume');
  easy = $('#easy-toggle');
  normal = $('#normal-toggle');
  hard = $('#hard-toggle');
  close_btn = $('#closeButton');

  // Event Handlers
  slider.on('input', () => {
    volume.text(slider.val());
  });

  easy.on('click', () => {
    normal.css('border-color', 'rgb(118,118,118)');
    hard.css('border-color', 'rgb(118,118,118)');
    easy.css('border-color', 'rgb(255, 255, 0)');
  });

  normal.on('click', () => {
    easy.css('border-color', 'rgb(118,118,118)');
    hard.css('border-color', 'rgb(118,118,118)');
    normal.css('border-color', 'rgb(255, 255, 0)');
  });

  hard.on('click', () => {
    easy.css('border-color', 'rgb(118,118,118)');
    normal.css('border-color', 'rgb(118,118,118)');
    hard.css('border-color', 'rgb(255, 255, 0)');
  });

  close_btn.on('click', () => {
    settings_panel.hide();
  });
}

/* ------------------- ASSIGNMENT 2 EVENT HANDLERS END ------------------- */

// TODO: ADD MORE FUNCTIONS OR EVENT HANDLERS (FOR ASSIGNMENT 3) HERE

// Gameplay screen
function show_game() {
  player.id.hide();
  level.text(1);
  score_selector.text(0);
  if (first_time) {
    tutorial_screen.hide();
    first_time = false;
  }
  game_screen.show();
  get_ready.show();

  // Hide get-ready popup and start game
  setTimeout(() => {
    get_ready.hide();
    player.id.show();

  // vars 
  let score = 0;
  let score_interval;
  let player_movement;
  let asteroid_interval;
  let portal_interval;
  let shield_interval;

  player_movement = setInterval(() => {
    // Check if dead
    if (player.died) {
      clearInterval(player_movement);
      clearInterval(score_interval);
      clearInterval(asteroid_interval);
      clearInterval(portal_interval);
      clearInterval(shield_interval);
      $('#totalScore').text(score);
    }
    // Update rocket position
    player.updatePosition();
    // Check for collisions
    if (isColliding(player.id, shield)) shield_grab();
    if (isColliding(player.id, portal)) portal_in();
  }, AST_OBJECT_REFRESH_RATE);
  console.log("player interval: ", player_movement);

  // Score interval
  score_interval = setInterval(() => {
    score += 40;
    score_selector.text(score);
  }, 500);

  // Asteroid interval
  asteroid_interval = setInterval(spawn, ast_spawn_rate);

  // Portal interval
  portal_interval = setInterval(spawn_portal, portalOccurrence);

  // Shield interval
  shield_interval = setInterval(spawn_shield, shieldOccurrence);
  }, 3000);
}

// Player goes through a portal
function portal_in() {
  portal.hide();
  danger.text(danger.text() * 1.0 + 2)
  level.text(level.text() * 1.0 + 1)
  astProjectileSpeed *= 1.5;
  player_speed += 0.5;
  collect_sound.play();
}

// Player grabs shield
function shield_grab() {
  shield.hide();
  player.shield = true;
  collect_sound.play();
}

// Game over 
function player_dies() {
  currentAsteroid = 1;
  player.x = DEFAULT_X;
  player.y = DEFAULT_Y;
  player.died = false;
  game_screen.hide();
  main_screen.show();
  play_btn.hide();
  settings_btn.hide()
  gameover_window.show();
}

// Start over
function restart_game() {
  gameover_window.hide();
  play_btn.show();
  settings_btn.show();
}

function spawn_portal() {
  // Place portal in a random location
  let x = getRandomNumber(6, maxPersonPosX);
  let y = getRandomNumber(6, maxPersonPosY);

  portal.css("left", x);
  portal.css("bottom", y);

  portal.show();
  setTimeout(() => portal.hide(), portalGone);
}

// Span a shield
function spawn_shield() {
  // Place shield in a random location
  let x = getRandomNumber(6, maxPersonPosX);
  let y = getRandomNumber(6, maxPersonPosY);

  shield.show();

  shield.css("left", x);
  shield.css("bottom", y);
  setTimeout(() => shield.hide(), shieldGone);
}

class Player {
  constructor() {
    this.x = DEFAULT_X;
    this.y = DEFAULT_Y;
    this.shield = false;
    this.died = false;
    this.id = $('#player');
  }

  updatePosition() {
    if (LEFT && this.x > 6) {
      this.x -= player_speed;
      this.id.attr('src', () => this.shield ? "src/player/player_shielded_left.gif" : "src/player/player_left.gif");
    }
    if (RIGHT && this.x < maxPersonPosX) {
      this.x += player_speed;
      this.id.attr('src', () => this.shield ? "src/player/player_shielded_right.gif" : "src/player/player_right.gif");
    }
    if (DOWN && this.y > 6) {
      this.y -= player_speed;
      this.id.attr('src', () => this.shield ? "src/player/player_shielded_down.gif" : "src/player/player_down.gif");
    }
    if (UP && this.y < maxPersonPosY) {
      this.y += player_speed;
      this.id.attr('src', () => this.shield ? "src/player/player_shielded_up.gif" : "src/player/player_up.gif");
    }
    if (this.died) this.id.attr('src', "src/player/player_touched.gif");
    else if (!LEFT && !RIGHT && !UP && !DOWN) this.id.attr('src', () => this.shield ? "src/player/player_shielded.gif" : "src/player/player.gif");

    this.id.css("bottom", this.y);
    this.id.css("left", this.x);
  }
}



/* ---------------------------- GAME FUNCTIONS ----------------------------- */
// Starter Code for randomly generating and moving an asteroid on screen
class Asteroid {
  // constructs an Asteroid object
  constructor() {
    console.log("constructing an Asteroid")
    /*------------------------Public Member Variables------------------------*/
    // create a new Asteroid div and append it to DOM so it can be modified later
    let objectString = "<div id = 'a-" + currentAsteroid + "' class = 'curAsteroid' > <img src = 'src/asteroid.png'/></div>";
    asteroid_section.append(objectString);
    // select id of this Asteroid
    this.id = $('#a-' + currentAsteroid);
    currentAsteroid++; // ensure each Asteroid has its own id
    // current x, y position of this Asteroid
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Asteroid
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Asteroid has reached the boarder
    this.hide_axis = 'x';
    this.hide_after = 0;
    this.sign_of_switch = 'neg';
    // spawn an Asteroid at a random location on a random side of the board
    this.#spawnAsteroid();
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Asteroid has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    if (this.hide_axis == 'x') {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_x > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_x < this.hide_after) {
          return true;
        }
      }
    }
    else {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_y > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_y < this.hide_after) {
          return true;
        }
      }
    }
    return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Asteroid 1 unit in its designated direction
  updatePosition() {
    // ensures all asteroids travel at current's speed
    this.cur_y += this.y_dest * astProjectileSpeed;
    this.cur_x += this.x_dest * astProjectileSpeed;
    // update asteroid's css position
    this.id.css('top', this.cur_y);
    this.id.css('right', this.cur_x);
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Asteroid
  //          all asteroids travel at the same speed
  #spawnAsteroid() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS
    let x = getRandomNumber(0, 1280);
    let y = getRandomNumber(0, 720);
    let floor = 784;
    let ceiling = -64;
    let left = 1344;
    let right = -64;
    let major_axis = Math.floor(getRandomNumber(0, 2));
    let minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = 784;
      this.sign_of_switch = 'pos';
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = 1344;
      this.sign_of_switch = 'pos';
    }
    // show this Asteroid's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Asteroids travel at the same speed
    let speed = Math.sqrt((this.x_dest) * (this.x_dest) + (this.y_dest) * (this.y_dest));
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}

// Spawns an asteroid travelling from one border to another
function spawn() {
  let asteroid = new Asteroid();
  setTimeout(spawn_helper(asteroid), 0);
}

function spawn_helper(asteroid) {
  let astermovement = setInterval(function () {
    // update Asteroid position on screen
    asteroid.updatePosition();
    // determine whether Asteroid has reached its end position
    if (asteroid.hasReachedEnd()) { // i.e. outside the game boarder
      asteroid.id.remove();
      clearInterval(astermovement);
    }

    // Check for collisions
    if (isColliding(asteroid.id, player.id)) {
      asteroid.id.remove();
      clearInterval(astermovement);

      if (!player.shield) {
        player.died  = true;
        die_sound.play();
        setTimeout(player_dies, 2000);
      }
      else {
        player.shield = false;
      }
    }

    if (player.died) {
      clearInterval(astermovement);
      setTimeout(() => asteroid.id.remove(), 2000);
    }

  }, AST_OBJECT_REFRESH_RATE);
}

/* --------------------- Additional Utility Functions  --------------------- */
// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange) {
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange) {
  const o1D = {
    'left': o1.offset().left + o1_xChange,
    'right': o1.offset().left + o1.width() + o1_xChange,
    'top': o1.offset().top + o1_yChange,
    'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = {
    'left': o2.offset().left,
    'right': o2.offset().left + o2.width(),
    'top': o2.offset().top,
    'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
    // collision detected!
    return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}
