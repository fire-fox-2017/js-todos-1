const fs = require('fs')
class ToDo {
  constructor(){
    this.list = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  }
  addTask(task){
    if(this.list.length===0){
      this.list.push(new Task(1, task))
      this.overWrite()
    } else { 
      this.list.push(new Task(this.list[this.list.length-1].id+1 , task))
      this.overWrite()
    }
    console.log(`Added ${task} to your TODO list...`)
  }
  overWrite(){
    fs.writeFileSync('data.json', JSON.stringify(this.list), 'utf8')
  }
  listTasks(){
    for(let i=0; i<this.list.length; i++){
      if(this.list[i].status === true){
        console.log(`${this.list[i].id}. [X] ${this.list[i].task}`)
      }
      if(this.list[i].status === false){
        console.log(`${this.list[i].id}. [ ] ${this.list[i].task}`)
      }
    }
  }
  viewTask(id){
    for(let i=0; i<this.list.length; i++){
      if(this.list[i].id === Number(id)){
        if(this.list[i].status === true){
          console.log(`${this.list[i].id}. [X] ${this.list[i].task}`)
        }
        if(this.list[i].status === false){
          console.log(`${this.list[i].id}. [ ] ${this.list[i].task}`)
        }
      }
    }
  }
  deleteTask(id){
    for(let i=0; i<this.list.length; i++){
      if(this.list[i].id === Number(id)){
        console.log(`Deleted ${this.list[i]} from your TODO list...`)
        this.list.splice(i,1);
        this.overWrite()
      }
    }
  }
  completeTask(id){
    for(let i=0; i<this.list.length; i++){
      if(this.list[i].id === Number(id)){
        this.list[i].status = true
        this.overWrite()
      }
    }
  }
  incompleteTask(id){
    for(let i=0; i<this.list.length; i++){
      if(this.list[i].id === Number(id)){
        this.list[i].status = false
        this.overWrite()
      }
    }
  }
  help(){
    console.log('node todo.js (will call help)')
    console.log('node todo.js help')
    console.log('node todo.js list')
    console.log('node todo.js add <task_content>')
    console.log('node todo.js task <task_id>')
    console.log('node todo.js delete <task_id>')
    console.log('node todo.js complete <task_id>')
    console.log('node todo.js incomplete <task_id>')
  }
}
class Task {
  constructor(id, task, status){
    this.id=id
    this.task=task
    this.status=status || false
  }
}
var x = new ToDo()
if(process.argv[2] === undefined || process.argv[2] === 'help'){
  x.help()
} else if(process.argv[2] === 'list'){
  x.listTasks()
} else if(process.argv[2] === 'add'){
  x.addTask(process.argv.slice(3).join(" "))
} else if(process.argv[2] === 'task'){
  x.viewTask(process.argv[3])
} else if(process.argv[2] === 'delete'){
  x.deleteTask(process.argv[3])
} else if(process.argv[2] === 'complete'){
  x.completeTask(process.argv[3])
} else if(process.argv[2] === 'incomplete'){
  x.incompleteTask(process.argv[3])
}