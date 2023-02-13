const fs = require("fs");
const chalk = require("chalk");
const boxConsole = require("box-console");

// const text = fs.readFileSync(`${__dirname}/puzzles.txt`, `utf-8`);
// const arr = text.split("\n");
// const newArr = [];
// for (let i = 0; i < arr[0].length; i += 9) {
//   newArr.push(
//     arr[0]
//       .slice(i, i + 9)
//       .split("")
//       .join(chalk.blue(" | ")),
//     chalk.blue(Array(9).fill("---|").join("").slice(0, -1))
//   );
// }

// // function foo(newArr) {
// //   for (let i = 0; i < newArr.length - 1; i++) {
// //     if (
// //       newArr[i][5] ||
// //       newArr[i][11]
// //     ) {
// //       return true;
// //     }
// //   }
// // }
// // return newArr;

// // foo(newArr);

// boxConsole(newArr);

// ━━━┃

/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */

function solve(boardString) {
  const newArr = [];
  for (let i = 0; i < boardString.length; i += 9) {
    newArr.push([...boardString.slice(i, i + 9)]);
  }

  const arrNext = newArr.slice(0, 9);
  const arrNumberLast = arrNext.map((el) =>
    el.map((it) => (!isNaN(it) ? Number(it) : "-"))
  );

  const arrNumber = JSON.parse(JSON.stringify(arrNumberLast));

  function searchNumber(arrNumber) {
    let count = 0;
    for (let i = 0; i < arrNumber.length; i++) {
      for (let j = 0; j < arrNumber[i].length; j++) {
        let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        function filterCol(num) {
          let column = [];
          for (let a = 0; a < arrNumber[i].length; a++) {
            column.push(arrNumber[a][j]);
          }

          let colFilter = column.filter((el) => typeof el === "number");

          for (let y = 0; y < colFilter.length; y++) {
            if (num.indexOf(colFilter[y]) >= 0) {
              num.splice(num.indexOf(colFilter[y]), 1);
            }
          }
          return num;
        }
        let numFilterCol = filterCol(num);
        function filterRow(numFilterCol) {
          let row = [];
          for (let a = 0; a < arrNumber[i].length; a++) {
            row.push(arrNumber[i][a]);
          }

          let rowFilter = row.filter((el) => typeof el === "number");

          for (let y = 0; y < rowFilter.length; y++) {
            if (numFilterCol.indexOf(rowFilter[y]) >= 0) {
              numFilterCol.splice(numFilterCol.indexOf(rowFilter[y]), 1);
            }
          }

          return numFilterCol;
        }
        let numFilterRow = filterRow(numFilterCol);

        function filterSquare(numFilterRow) {
          let square = new Map();
          for (let a = 0; a < 3; a++) {
            for (let b = 0; b < 9; b += 3) {
              let arrSquare = [];
              for (let d = 0; d < 3; d++) {
                arrSquare.push(arrNumber[a * 3 + d].slice(b, b + 3));
              }
              square.set(`${a}${b}`, arrSquare.flat());
            }
          }
          const arrSquareFind = square
            .get(`${Math.floor(i / 3)}${j - (j % 3)}`)
            .filter((el) => typeof el === "number");

          for (let y = 0; y < arrSquareFind.length; y++) {
            if (numFilterRow.indexOf(arrSquareFind[y]) >= 0) {
              numFilterRow.splice(numFilterRow.indexOf(arrSquareFind[y]), 1);
            }
          }

          return numFilterRow;
        }
        const numFind = filterSquare(numFilterRow);
        if (numFind.length === 1 && typeof arrNumber[i][j] !== "number") {
          arrNumber[i].splice(j, 1, Number(numFind.join("")));
          count += 1;
        }
      }
    }
    if (arrNumber.flat().every((it) => typeof it === "number")) {
      return arrNumber;
    }
    if (count === 0) {
      return arrNumber;
    } else {
      return searchNumber(arrNumber);
    }
  }

  return searchNumber(arrNumber);
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */

function isSolved(board) {
  if (board.flat().every((it) => typeof it === "number")) {
    return true;
  } else {
    return false;
  }
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */

function prettyBoard(board) {
  let newBoard = [];
  for (let i = 0; i < board.length; i += 1) {
    str = "";

    for (let j = 0; j < 9; j += 3) {
      if (j > 5) {
        str += `${board[i][j]} ${board[i][j + 1]} ${board[i][j + 2]}`;
      } else {
        str += `${board[i][j]} ${board[i][j + 1]} ${
          board[i][j + 2]
        } ${chalk.blue(" | ")} `;
      }
    }
    newBoard.push(str);
  }

  for (let i = 3; i < newBoard.length; i += 4) {
    newBoard.splice(
      i,
      0,
      chalk.blue(Array(9).fill("---").join("").slice(0, -1))
    );
  }
  boxConsole(newBoard);
}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
