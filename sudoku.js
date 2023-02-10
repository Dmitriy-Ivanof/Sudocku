// /**
//  * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
//  * Возвращает игровое поле после попытки его решить.
//  * Договорись со своей командой, в каком формате возвращать этот результат.
//  */
// function solve(boardString) {
// }

// /**
//  * Принимает игровое поле в том формате, в котором его вернули из функции solve.
//  * Возвращает булевое значение — решено это игровое поле или нет.
//  */
// function isSolved(board) {

// }

// /**
//  * Принимает игровое поле в том формате, в котором его вернули из функции solve.
//  * Возвращает строку с игровым полем для последующего вывода в консоль.
//  * Подумай, как симпатичнее сформировать эту строку.
//  */
// function prettyBoard(board) {

// }

// // Экспортировать функции для использования в другом файле (например, readAndSolve.js).
// module.exports = {
//   solve,
//   isSolved,
//   prettyBoard,
// };

// Функция для проверки по строке

const emptySubArr = new Array(9).fill('x');
const emptyArr = new Array(9).fill([emptySubArr]);

const sudoku = [
  [0, 0, 3, 0, 0, 8, 2, 0, 4],
  [0, 2, 0, 0, 6, 4, 0, 1, 0],
  [9, 0, 0, 0, 0, 0, 0, 0, 8],
  [0, 8, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 6, 9, 8, 0],
  [0, 0, 0, 0, 0, 0, 5, 0, 0],
  [0, 0, 4, 9, 0, 7, 0, 3, 0],
  [8, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 7, 0, 0, 5, 0, 4, 0, 0],
];

const matchArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Функция принимает массив sudoku c судоку (неожиданно)
function horizontMatching(sudoku) {
  const sudokuCandidates = [];
  for (let i = 0; i < sudoku.length; i++) {
    const rowCandidates = JSON.parse(JSON.stringify(matchArr));
    const rowNum = [];
    for (let j = 0; j < sudoku[i].length; j++) {
      if (rowCandidates.includes(sudoku[i][j])) {
        const candidateIndex = rowCandidates.indexOf(sudoku[i][j]);
        rowCandidates.splice(candidateIndex, 1);
      }
      rowNum.push(rowCandidates);
    }
    sudokuCandidates.push(rowNum);
  }
  sudokuCandidates.map((elem, i) =>
    elem.filter((el, j) => {
      if (sudoku[i][j] > 0) delete el[i][j];
    })
  );

  // return sudokuCandidates;
}

console.log(horizontMatching(sudoku));
