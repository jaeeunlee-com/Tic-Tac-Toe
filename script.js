const Gameboard =(()=>{
  const board=['','','','','','','','',''];
  const getBoard=()=>board;
  const setMark=(index,mark)=>{
    if(board[index]===''){
      board[index]=mark;
    }
    const resetBoard=()=>{
      for(let i=0;i<board.length;i++){
        board[i]='';
      }

      return {getBoard,setMark,resetBoard};
    })();
