import React from 'react';
import { SudokuService } from '../../services/sudoku';
import { Square } from '../square/Square';

export class Board extends React.Component {
      
    constructor (props) {
        super(props);
        const value = Array(9).fill(0).map(() => Array(9).fill(0));
        this.state = {
            squares: value
        };
    }

    solve () {
        SudokuService.solve(this.state.squares).then((res) => {
            this.setState({ squares: res.result });
        }).catch( () => {
            const value = Array(9).fill(0).map(() => Array(9).fill(0));
            this.setState({ squares: value });
        });
    }
    
    onChange (val, rowIndex, index) {
        const squares = this.state.squares.slice();
        val = parseInt(val, 10) || 0;
        squares[rowIndex][index] = val % 10;

        this.setState({ squares: squares });
    }

    renderRow (row, rowIndex) {
        return <div>
            <span className="set">{row.slice(0,3).map((value, index) => this.renderSquare(value, rowIndex, index))}</span>
            <span className="set">{row.slice(3,6).map((value, index) => this.renderSquare(value, rowIndex, index + 3))}</span>
            <span className="set">{row.slice(6,9).map((value, index) => this.renderSquare(value, rowIndex, index + 6))}</span>
        </div>;
    }

    renderSquare (value, rowIndex, index) {
        return (
            <Square value={value} readOnly={this.readOnly} onChange={(val) => this.onChange(val, rowIndex, index)}/>
        );
    }

    render () {
        return <div>
            <div className="rowset">{this.state.squares.slice(0,3).map((row, rowIndex) => this.renderRow(row,rowIndex))}</div>
            <div className="rowset">{this.state.squares.slice(3,6).map((row,rowIndex) => this.renderRow(row, rowIndex + 3))}</div>
            <div className="rowset">{this.state.squares.slice(6,9).map((row,rowIndex) => this.renderRow(row,rowIndex + 6))}</div>
            <button onClick={() => this.solve()}>Solve</button>
        </div>;
    }
}