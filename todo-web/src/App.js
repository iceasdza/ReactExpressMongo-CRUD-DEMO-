import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    todos:[],
    activity:'',
    fileLength:0,
    uploadPath:""
  }

  async getData(){
    const data = await axios.get('http://localhost:3030/api/todo')
    console.log(data)
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
  CountFile(e){
    const length = e.target.files.length;
    this.setState({fileLength:length})
    if(length===1){
      this.setState({uploadPath:"http://localhost:3030/uploadSingleFile"})
      console.log(this.state.uploadPath)
    }else{
      this.setState({uploadPath:"http://localhost:3030/uploadMultipleFile"})
      console.log(this.state.uploadPath)
    }

  }

async onUploadFile(e){
   e.preventDefault()
    if(this.state.fileLength!==1){
     await   axios.post('http://localhost:3030/uploadMultipleFile')
    }else{
     await  axios.post('http://localhost:3030/uploadSingleFile')
    }
  }

  showFileCount=()=>{
    return this.state.fileLength
  }
  showPath=()=>{

    return this.state.uploadPath.toString();
  }

  render() {

    return (
      <div>
      <form onSubmit={this.onSubmitHandle.bind(this)}>
      <input type="text" value={this.state.activity} onChange={this.onChangeHadle.bind(this)}/>
      <button>ADD</button>
      </form>
      <form method='post' encType="multipart/form-data" action={this.showPath()}>
        <input type="file" name="sampleFile" multiple onChange={this.CountFile.bind(this)}/>
        <input type="submit"/>
    </form>  
      {this.showData()}
      File quantity : {this.showFileCount()}<br/>
      File upload Path : {this.showPath()}
      </div>
    );
  }
}

export default App;
