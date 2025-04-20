import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  winner: string | null = null;
  isDraw: boolean = false;

  makeMove(index: number): void {
    if (!this.board[index] && !this.winner && !this.isDraw) {
      // Create a new array to avoid mutating the original directly
      const newBoard = [...this.board];
      newBoard[index] = this.currentPlayer;
      this.board = newBoard;

      this.checkWinner();
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  checkWinner(): void {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        return;
      }
    }

    if (this.board.every(cell => cell)) {
      this.isDraw = true;
    }
  }

  resetGame(): void {
    this.board = Array(9).fill(''); // Ensure a new array reference
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
  }
}