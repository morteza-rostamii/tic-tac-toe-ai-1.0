//import './style.css'
//import typescriptLogo from './typescript.svg'

class Board {
  constructor(){

  }
}

class Cell {
  constructor() {

  }
}

class Player {
  constructor() {

  }
}

// static canvas stuff
class Renderer {
  private static readonly canvas:HTMLCanvasElement | null = 
    document.querySelector('#game_canvas');
  private static readonly ctx:CanvasRenderingContext2D | null = 
    Renderer.canvas ? Renderer.canvas.getContext('2d') : null;

  // render board
  public static renderBoard(board: Board): void {
    if (!Renderer.ctx || !Renderer?.canvas) return;

    // clear screen
    Renderer.ctx.clearRect(0, 0, Renderer.canvas?.width, Renderer.canvas.height);

    // draw the board

  }

  private static renderCell(cell: Cell): void {

  }

  public static showWinner(): void {

  }

  public static showDraw():void {

  }
}

class Game {
  constructor() {}
}

//===============================================================

const CELL_SIZE = 80;
const BORDER_WIDTH = 5;
const CANVAS_W = 240;
const CANVAS_H = 240;

const canvas = document.querySelector('#game_canvas');
//@ts-ignore
canvas.width = CANVAS_W;
//@ts-ignore
canvas.height = CANVAS_H;

//@ts-ignore
const ctx = canvas?.getContext('2d');

const board:string[][] = [
  ['', '', ''],
  ['', '', 'X'],
  ['', '', ''],
];

const player1 = 'X';
const player2 = 'O';
const empty = 'E';

const mouse = {x:0, y:0};
let rowInx = 0;
let colInx = 0;

let currentPlayer = player1;

const resetBoard = (board: string[][]) => {
  for (let row=0; row < 3; row++) {
    for (let col=0; col < 3; col++) {
      board[row][col] = empty;
    }
  }
}

const setBoardCell = (
  board: string[][], 
  value:string, 
  pos:{row:number, col:number}
) => {
  // can't set a cell with X or O
  if (
    board[pos.row][pos.col] === player1 ||
    board[pos.row][pos.col] === player2
  ) return;

  console.log(pos, board)
  board[pos.row][pos.col] = value;
}

const drawBoard = (board:string[][]) => {
  let cellX = 0;
  let cellY = 0;

  for (let row = 0; row < 3; row++) {
    for (let col=0; col < 3; col++) {
      // cell's value
      const cellValue = board[row][col];
      // 0*cellSize = 0 , 1*cellSize = 10px and so on

      // top-left corner of the cell
      //const cellX = row * CELL_SIZE;
      //const cellY = col * CELL_SIZE;

      ctx.strokeStyle = 'white';
      ctx.lineWidth = BORDER_WIDTH;
      ctx.strokeRect(cellX, cellY, CELL_SIZE + BORDER_WIDTH, CELL_SIZE + BORDER_WIDTH);

      //console.log(x, y, cellValue)
      ctx.fillStyle = (cellValue === 'X') ? 'red' : (cellValue === 'O') ? 'blue' : 'orange';
      // top-left corner of a rect
      ctx.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE);

      // render value inside cell
      ctx.font = 'bold 40px Arial';

      // center of each cell 
      const textX = (cellX) + (CELL_SIZE / 2) - 15;
      const textY = (cellY) + (CELL_SIZE / 2) + 15;
      ctx.fillStyle = 'white';
      ctx.fillText(cellValue, textX, textY);

      // increment for each col
      cellX += CELL_SIZE;
    }

    // reset cellX for the next col
    cellX = 0;
    // move to next row
    cellY += CELL_SIZE;
  }
}

const getCellCoordinates = (event:any) => {
  // click position from top-left of view port
  const clientX = event.clientX;
  const clientY = event.clientY;
  //@ts-ignore
  const canvasX = clientX - canvas.offsetLeft;
  //@ts-ignore
  const canvasY = clientY - canvas.offsetTop;
  
  console.log(canvasX, canvasY);
  if (canvasX >= 0) mouse.x = Math.floor(canvasX);
  if (canvasY >= 0) mouse.y = Math.floor(canvasY);

  // grid_width = 240 => 239 / 80 = 3.61 

  // row: we go to the next row by change in y coordinate
  rowInx = Math.floor(mouse.y / CELL_SIZE);
  // col
  colInx = Math.floor(mouse.x / CELL_SIZE);

  console.log(rowInx, colInx);

  setBoardCell(
    board, 
    currentPlayer,
    {row: rowInx, col: colInx}
  );
  
  // change current player
  if (currentPlayer === player1) currentPlayer = player2;
  else if (currentPlayer === player2) currentPlayer = player1;
  
}

function game() {
  resetBoard(board);
  drawBoard(board);

  // click event
  canvas?.addEventListener('click', getCellCoordinates);
}

game();

// game loop
function gameLoop() {

  drawBoard(board);

  requestAnimationFrame(gameLoop);
}

gameLoop();