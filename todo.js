"use strict"

const fs = require('fs')
let data = JSON.parse(fs.readFileSync('data.json', 'UTF-8'))
let input = process.argv

// console.log(data);

class Todo{
  constructor(comment) {
    this.comment = comment
  }
  help(){
    let node = "$ node todo.js"
    let menu = `\n HELP MENU \n ============================\n ${node} add <task content> \n ${node} list \n ${node} help \n ${node} delete <task_id> \n ${node} complete <task_id> \n ${node} uncomplete <task_id \n ${node} task <task_id>`
    console.log(menu);
  }
  list() {
    for (let i = 0; i < data.length; i++){
      if(data[i].status == "complete") {
        console.log(`${data[i].id}. [X] ${data[i].task}`);
      } else {
        console.log(`${data[i].id}. [ ] ${data[i].task}`);
      }
    }
  }

  add() {
    let arr = []
    for (let i = 3; i < input.length; i++){
      arr.push(input[i])
    }
    let string = arr.join(" ")

    data.push({"id": data.length+1, "task": string, "status": "uncomplete"})
    fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
    // console.log(----------------JSON.stringify(data));
  }

  complete() {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == input[3]) {
        data[i].status = "complete"
        fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
      }
    }
  }
  uncomplete() {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == input[3]) {
        data[i].status = "uncomplete"
        fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
      }
    }
  }

  delete() {
    data.splice(input[3]-1, 1)
    for (let i = input[3]-1; i < data.length;i++) {
      console.log(data);
      data[i].id--
    }
    fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
  }

  task(){
    for (let i =0; i<data.length; i++) {
      if (data[i].id == input[3]) {
        console.log(data[i]);
        fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
      }
    }
  }
}

let todos = new Todo()

switch(input[2]){
  case 'help': todos.help(); break;
  case 'list': todos.list(); break;
  case 'add': todos.add(); break;
  case 'complete': todos.complete(); break;
  case 'uncomplete': todos.uncomplete(); break;
  case 'delete': todos.delete(); break;
  case 'task': todos.task(); break;
  default: todos.help();
}
