const fs = require('fs')

class ToDo{
  constructor(data){
    this.data = data
  }
  help(){
    console.log("1. list           : Melihat Daftar TODO")
    console.log("2. add            : Menambahkan tugas TODO");
    console.log("3. task   <id>    : Melihat detail TODO");
    console.log("4. delete <id>    : Menghapus tugas pada TODO");
    console.log("5. complete <id>  : Menandai bahwa tugas telah selesai");
    console.log("6. uncomplete <id>: Menandai bahwa tugas belum selesai");
  }
  list(){
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].complete == true){
      console.log(`${i+1}. [X]${this.data[i].task}`);
      }else{
      console.log(`${i+1}. [ ]${this.data[i].task}`);
      }
    }
  }
  add(sentence){
    let objTask = {
      "task" : sentence,
      "complete" : false
    }
    this.data.push(objTask)
    fs.writeFileSync('data.json',JSON.stringify(this.data),'utf-8')
  }
  task(num){
    console.log(`${num}. Task : ${this.data[num-1].task}, Completed : ${this.data[num-1].complete}`);
  }
  deleteTask(num){
    this.data.splice(num-1,1)
    fs.writeFileSync('data.json',JSON.stringify(this.data),'utf-8')
  }
  completeTask(num){
    if(this.data[num-1].complete == false){
      this.data[num-1].complete = true;
    }
    fs.writeFileSync('data.json',JSON.stringify(this.data),'utf-8')
  }
  uncompleteTask(num){
    if(this.data[num-1].complete == true){
      this.data[num-1].complete = false;
    }
    fs.writeFileSync('data.json',JSON.stringify(this.data),'utf-8')
  }
}

var data = JSON.parse(fs.readFileSync('data.json'))
var toDos = new ToDo(data)
switch(process.argv[2]){
  case "help":
    toDos.help()
  break;
  case "list":
    toDos.list()
  break;
  case "add":
    toDos.add(String(process.argv.slice(3)).replace(/,/g, ' '))
  break;
  case "task":
    toDos.task(process.argv[3])
  break;
  case "delete":
    toDos.deleteTask(process.argv[3])
  break;
  case "complete":
    toDos.completeTask(process.argv[3])
  break;
  case "uncomplete":
    toDos.uncompleteTask(process.argv[3])
  break;
}
