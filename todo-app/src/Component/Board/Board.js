import React,{useState,useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Segment } from 'semantic-ui-react'
import './Board.css'
import Todo from '../Todos/Todo'
import Navbar from '../Navbar/Navbar'
import {TiDeleteOutline} from 'react-icons/ti'
import {IoIosAddCircleOutline} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

import axiosInstance from '../../Utils/axiosInstance'
const Board = () => {
  const [board,setBoard] = useState([])
  const [count,setCount] = useState(0)
  const navigator  = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [name,setBoardName] = useState('')
  const handleBoard = () => {
    console.log("hangel")
    const newBoard = {
      id : `Board ${count+1}`
    }
    axiosInstance.post('/board',{
      name : `Board ${count+1}`
    })
    .then((res) => {
      console.log("board is created")
      setBoard(prevBoard => [...prevBoard,res])
      setCount(preCount => preCount+1)
    })
   
  }
  const deleteBoard = (id) => {
    axiosInstance.delete(`/${id}`)
    .then((res) => {
      setBoard(res.data)
    })
  }
  const handleBoardClick = (name,id) => {
    setSelectedBoard(id);
    setBoardName(name)
  };

  useEffect(() => {
    axiosInstance.get('/getBoard')
    .then((res) =>{
      console.log(res.data)
      setBoard(res.data)
      const data = res.data
     const lastArr =  data[data.length - 1]
      console.log(lastArr.name.split(' ')[1])
    setCount(parseInt(lastArr.name.split(' ')[1]))

    })
    .catch((err) => console.log(err))
  },[board])

  return (
    <div class = 'containers'>
    <Navbar/>
    <div className = 'lineBorder'></div>
    <Grid columns='equal' divided  padded>
  <Grid.Row  textAlign='center'>
    {board.map((BoardITem,i) => (
         <Grid.Column>
         <Segment className={`todo-row`}
                onClick={() => handleBoardClick(BoardITem.name,BoardITem._id)}  key = {BoardITem.name} >
             {BoardITem.name} <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => deleteBoard(BoardITem._id)} // Wrap deleteBoard call in arrow function
                >
                  <TiDeleteOutline size={20} />
                </div>
         </Segment>
       </Grid.Column>
    ))}
  

    <Grid.Column>
      <Segment  className = 'Board-add' onClick = {handleBoard}>
        Add Board <div style = {{marginLeft : "20px",cursor:'pointer'}}><IoIosAddCircleOutline size = {20}/></div> 
      </Segment>
    </Grid.Column>
  </Grid.Row>
</Grid>
<div className = 'lineBorder'></div>
<div className="Todos">
        {selectedBoard && <Todo boardId={selectedBoard} name = {name}/>} {/* Render Todo component only if a board is selected */}
      </div>
</div>
  )
}

export default Board
