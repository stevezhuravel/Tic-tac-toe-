const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame(){
const game = new Game();
const personPlayer = new personPlayer(game);
const machinePlayer = new MachinePlayer(game);
let turn =0;

this.start = function(){
    const config = { childList: true};
    const see = new MutationObserver(() => takeTurn())
    game.positions.forEach((el) => see.observe(el, config));
    takeTurn();

    }
    function takeTurn(){
        if(game.winner()){
            return;
        }
        if(turn % 2 === 0 ){
            personPlayer.takeTurn();

        } else {
            machinePlayer.takeTurn();
        }

        turn++;
    }
}
function Board(){
this.spotPosition = Array.from(document.querySelectorAll('.col'));


this.winner = function(){
    let winner = false;
    const checkingCombination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];
    const spotPosition = this.spotPosition;

   checkingCombination.forEach((winnerCombo) => {
        const pos0InnerText = spotPosition[winnerCombo[0]].innerText;
        const pos1InnerText = spotPosition[winnerCombo[1]].innerText;
        const pos2InnerText = spotPosition[winnerCombo[2]].innerText;
        const isWinningCombo = pos0InnerText !== '' & 
        pos0InnerText === pos1InnerText & pos1InnerText === pos2InnerText;

        if(isWinningCombo){
            winner = true;
            winnerCombo.forEach((index) =>{
            spotPosition[index].className += 'winner';
            })
        }

        })
        return winner;
}

}

function HumanPlayer(game){

    this.takeTurn = function(){
    
        game.spotPosition
        .forEach(el => el.addEventListener('click', handleTurnTaken));
    }
    
    function handleTurnTaken(event){
       event.target.innerText = 'X';
       game.spotPosition
       .forEach(el => el.removeEventListener('click', handleTurnTaken));
    }
}

function ComputerPlayer(game){

    this.takeTurn = function(){
        const howManySpotsLeft =
        game.spotPosition.filter((p) => p.innerText === '');
        const move = Math.floor(Math.random() * howManySpotsLeft.length); 
        howManySpotsLeft[move].innerText = 'O';
        
    }
}
