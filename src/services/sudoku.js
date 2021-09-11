import { environment } from "../environment"

export const SudokuService = {
    solve: (squares) => {
        return fetch(
            environment.apiUrl,
            {
                method: 'POST',
                body: JSON.stringify({sudoku: squares})
            }
        ).then((res) => res.json());
    }
}
