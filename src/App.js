import {useState} from 'react'

export default function Game(){
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove,setCurrentMove] = useState(0)
	const isXIsNext = currentMove %2 === 0
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares){
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
		setHistory(nextHistory)
		setCurrentMove(nextHistory.length-1)
	}

	function jumpTo(nextMove){
		setCurrentMove(nextMove)
	}

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = 'Go to move #' + move;
		} else {
			description = 'Restart';
		}
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		)
	})

	return (
		<>
			<div className="info">
				<p><span style={{"color":"red"}}>Important!</span> This app is working on the mobiles which have at least 392px wide.</p>
				<p>If your screen size is less than 392px - there will be some issues...</p>
				<p>By the way i don't care, i have an iphone 14, which have 392px width</p>
				<p>If you have smaller screen size - go and buy yourself an iphone 14 O_O.</p>
			</div>
			<div className="myDiv">
				<div className="game-wrapper">
					<Board 
						isXIsNext={isXIsNext}
						squares={currentSquares}
						onPlay={handlePlay}
					/>
					<div className="game-info">
						<ul>{moves}</ul>
					</div>
				</div>
			</div>
			
		</>
	)
}

export function Board({isXIsNext, squares, onPlay}) {
	const winner = calculateWinner(squares);

	let status;

	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (isXIsNext ? "X" : "O");
	}

	function handleClick(i){
		if(squares[i] || calculateWinner(squares)){
			return
		}
		const nextSquares = squares.slice()
		nextSquares[i] = ( isXIsNext ? "X" : "O" )
		onPlay(nextSquares)
	}

	return (
		<div className="leftSide">
			<div className="status">{status}</div>
			<div className="game-board">
				<div className="board-row">
					<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
					<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
					<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
				</div>
				<div className="board-row">
					<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
					<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
					<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
				</div>
				<div className="board-row">
					<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
					<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
					<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
				</div>
			</div>
		</div>
	)
}

export function Square({value, onSquareClick}) {
	return (
		<div className="square">
			<button 
				onClick={onSquareClick}>
				{value}
			</button>
		</div>
	)
}

function calculateWinner(squares) {
	const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}