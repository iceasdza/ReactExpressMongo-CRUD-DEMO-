import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    todos:[],
    activity:''
  }

  async getData(){
    const data = await axios.get('http://localhost:3030/api/todo')
    this.setState({todos:data.data})
    console.log(this.state.todos)
  }

  async componentDidMount(){
    this.getData()
  }

  showData = () => {   
   return this.state.todos.map((data)=> { 
     return <li>{data.activity} <button onClick={this.deleteTodo.bind(this)} value={data._id}>DELETE</button></li>
    })
  }

  async deleteTodo(e){
    const id = e.target.value

    await axios.delete('http://localhost:3030/api/todo/delete/'+id,{
    
    })
    console.log(id)
    this.getData()
    this.showData()
  } 

  onChangeHadle = (event) => {
        this.setState({activity : event.target.value})
        console.log("activity = " +this.state.activity)
  }

  async onSubmitHandle(event){
    event.preventDefault()

    await axios.post('http://localhost:3030/api/todo',{
      activity : this.state.activity
    })

    this.setState({
      activity:''
    })
    this.getData()

  }


  render() {

    return (
      <div>
      <form onSubmit={this.onSubmitHandle.bind(this)}>
      <input type="text" value={this.state.activity} onChange={this.onChangeHadle.bind(this)}/>
      <button>Buttons</button>
      </form>
      {this.showData()}
      </div>
    );
  }
}

export default App;
