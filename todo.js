'use strict'
const fs = require('fs');

class Task{
  constructor(taskAtribut){
    this.id = taskAtribut.id
    this.task = taskAtribut.task
    this.complete = taskAtribut.complete
    this.create_at = taskAtribut.create_at
  }
}

class Todo {
  constructor() {
    this.file = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
  }
  help(){
    return `============JS Todo List============\n$ node todo.js help\n$ node todo.js list\n$ node todo.js add <task_content>\n$ node todo.js task <task_id>\n$ node todo.js delete <task_id>\n$ node todo.js complete <task_id>\n$ node todo.js uncomplete <task_id>\n`;
  }
  list(){
    this.file.forEach((element)=>{
      console.log(`${element.id} ${element.complete ? '[x]':'[ ]'} ${element.task}`)
    })
  }
  add_task(input){
    let save = {
      id:this.file[this.file.length-1].id + 1,
      task:input,
      complete:false,
      create_at:new Date().toISOString()
    }
    this.file.push(save)
    fs.writeFileSync('data.json', JSON.stringify(this.file))
    console.log(`Added ${input} in your list`);
  }
  task(input){
    this.file.filter((element)=>{
      if(element.id == input){
        console.log(element);
      }
    })
  }
  delete(input){
    for(let i=0; i<this.file.length; i++){
      if(this.file[i].id == input){
        this.file.splice(i,1)
        fs.writeFileSync('data.json', JSON.stringify(this.file))
        console.log(`id : ${input} has been delete`);
      }
    }
  }
  complete(input){
    for(let i=0; i<this.file.length; i++){
      if(this.file[i].id == input){
        this.file[i].complete = true
        fs.writeFileSync('data.json', JSON.stringify(this.file))
        console.log(`id : ${input} has been complete`)
      }
    }
  }
  uncomplete(input){
    for(let i=0; i<this.file.length; i++){
      if(this.file[i].id == input){
        this.file[i].complete = false
        fs.writeFileSync('data.json', JSON.stringify(this.file))
        console.log(`id : ${input} change to be uncomplete`)
      }
    }
  }

}

let doing = new Todo()
let exec = process.argv[2]
let input = process.argv.slice(3).join(' ')
// console.log(exec);
if(exec == undefined || exec == 'help'){
  console.log(doing.help());
} else if(exec == 'list'){
  doing.list()
} else if(exec == 'add'){
  doing.add_task(input)
} else if(exec == 'task'){
  doing.task(input)
} else if(exec == 'delete'){
  doing.delete(input)
} else if(exec == 'complete'){
  doing.complete(input)
} else if(exec == 'uncomplete'){
  doing.uncomplete(input)
}