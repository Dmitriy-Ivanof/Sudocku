const fs = require('fs');
const chalk = require('chalk');
const boxConsole = require('box-console');

const text = fs.readFileSync(`${__dirname}/puzzles.txt`, `utf-8`);
const arr = text.split('\n');
const newArr = [];
for (let i = 0; i < arr[0].length; i += 9) {
  newArr.push(
    arr[0]
      .slice(i, i + 9)
      .split('')
      .join(chalk.blue(' | ')),
    chalk.blue(Array(9).fill('---|').join('').slice(0, -1))
  );
}

// function foo(newArr) {
//   for (let i = 0; i < newArr.length - 1; i++) {
//     if (
//       newArr[i][5] ||
//       newArr[i][11]
//     ) {
//       return true;
//     }
//   }
// }
// return newArr;

// foo(newArr);

const sudokuOfYourDream = boxConsole(newArr.slice(0, -1));
console.log(sudokuOfYourDream);

// ━━━┃

/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve(boardString) {}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */

// function prettyBoard(board) {
//   let result = [];
//   for (let i = 0; i < board.length; i += 1) {

// }
// console.log(prettyBoard(str));

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  // prettyBoard,
};
