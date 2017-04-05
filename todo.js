const fs = require ("fs")

class TODO {
    constructor(file){
      this.data = this.read(file);
      }

help(){
  console.log("-------List of Commands in this TO DO LIST-------");
  console.log("- node todo list")
  console.log("- node todo add + <task_content>")
  console.log ("- node todo task <task_id>")
  console.log("- node todo delete <task_id>")
  console.log ("- node todo complete <task_id>")
  console.log ("- node todo uncomplete <task_id>")
}

add(ThingsToDo){
    let newtask = new TASK(ThingsToDo);
    newtask.id = this.data.length;
    this.data.push(newtask);
    this.write();
    console.log(`Added ${this.data[this.data.length-1].ThingsToDo} (ID: ${this.data[this.data.length-1].id+1} )`)
  }


read(file){
    let objArray = JSON.parse(fs.readFileSync(file).toString());
    for (let i = 0; i < objArray.length; i++){
      let newtask = new TASK (objArray[i].ThingsToDo);
      newtask.id = i
      newtask.completed = objArray.completed;
    }
    return objArray;
  }

write(){
  let objArray = [];
  for (let i = 0; i < this.data.length;i++){
    let obj = {};
    obj["ThingsToDo"] = this.data[i].ThingsToDo;
    obj["completed"] = this.data[i].completed;
    objArray.push(obj);
    }
  fs.writeFileSync("data.json", JSON.stringify(objArray));
  }

list(){
  console.log("-------TO DO LIST-------");
  for (let i = 0; i < this.data.length; i++){
      let check = ""
      if (this.data[i].completed){
      check = "[x]";
      }
      else {
        check = "[ ]";
      }
    console.log(`${[i+1]} ${check} ${this.data[i].ThingsToDo}`)
    }
  }

task(id){
    if (!(this.data[id-1])){
      console.log("Invalid ID")
    }
    else{
      console.log(JSON.stringify(this.data[id-1]));
    }
}

deleted(id){
  if (!(this.data[id-1])){
      console.log("Invalid ID")
  }
  else {
    console.log(JSON.stringify(this.data[id-1].ThingsToDo) + " deleted!!");
    this.data.splice(id-1,1);
    this.write();
  }
}

completed(id){
    if (!(this.data[id-1])){
      console.log("Invalid ID")
    }

    else if (this.data[id-1].completed === true){
      console.log("This things to do already completed!!")
    }
    else {
      console.log(JSON.stringify(this.data[id-1].ThingsToDo) + " Completed!!");
      this.data[id-1].completed = true;
      this.write()

    }
}

uncompleted(id){
  if (!(this.data[id-1])){
    console.log("Invalid ID")
  }

  else if (this.data[id-1].completed === false){
    console.log("This things still uncompleted!!")
  }
  else {
    console.log(JSON.stringify(this.data[id-1].ThingsToDo) + " Uncompleted!!");
    this.data[id-1].completed = false;
    this.write()
    }
  }
}

class TASK {
    constructor(ThingsToDo){
      this.id = 0;
      this.ThingsToDo = ThingsToDo;
      this.completed = false;
  }
}

let newtodo = new TODO("data.json")
let argv = process.argv
let taskID;
if (argv[2] === "help"){
  newtodo.help();
}
if (argv[2] === "add"){
  if(argv[3] === null){
    console.log("please input things to do")
  }

else{
  let taskContent = argv.slice(3,argv.length).join(" ");
  newtodo.add(taskContent);
  }
}
if (argv[2] === "list"){
  newtodo.list();
}

if (argv[2] === "task"){
    if (argv[3] === null){
      console.log ("Please insert task ID")
    }
    else {
    taskID = argv[3]
     newtodo.task(taskID);
    }
}

if (argv[2] === "delete"){
  if (argv[3] === null) {
    console.log("Please insert task ID to delete")
  }
  else {
     taskID = argv[3]
    newtodo.deleted(taskID)
  }
}

if (argv[2] === "complete"){
  if (argv[3] === null) {
    console.log("Please insert task ID to delete")
  }
  else {
     taskID = argv[3]
    newtodo.completed(taskID);
  }
}

if (argv[2] === "uncomplete"){
  if (argv[3] === null) {
    console.log("Please insert task ID to delete")
  }
  else {
     taskID = argv[3]
    newtodo.uncompleted(taskID);
  }
}
