var fs = require('fs');


class Todo {
  constructor (file) {
    this._file = file;
    this._list = [];
  }

  loadJsonFile() {
    let data = fs.readFileSync(this._file)
    .toString()
    .split("\n");

    // console.log(data);
    // console.log(JSON.parse(data));
    this._list = JSON.parse(data);
  }

  list () {
    if(this._list.length > 0) {
      for (let i = 0 ; i < this._list.length ; i++) {
        let complete = (this._list[i].complete) ? "[X]" : "[ ]";
        console.log(`${i+1}. ${complete} ${this._list[i].task}`);
      }
    } else {
      console.log(`*** List is empty. ***`);
    }
  }

  add (task) {
    this._list.push(task);
    console.log(`Added task '${task.task}' to the list.`)
    this.save();
  }

  taskInfo(id) {
    // id == the order of the task in the list
    if (id > this._list.length)
      console.log("Sorry, you have entered invalid task ID.")
    else {
      let complete = (this._list[id-1].complete) ? "[X]" : "[ ]";
      console.log(`${id}. ${complete} ${this._list[id-1].task}`);
    }
  }

  delete(id) {
    if (id > this._list.length)
      console.log("Sorry, you have entered invalid task ID.")
    else {
      console.log(`Deleting task:${id}. ${this._list[id-1].task}.`);
      this._list.splice(id-1,1);
      this.save();
    }
  }

  complete(id) {
    if (id > this._list.length)
      console.log("Sorry, you have entered invalid task ID.")
    else {
      // this._list.forEach( (val, index, array) => {
      //   if(index == id-1) {
      //     val.complete = true;
      //     console.log(`Mark task:${id}. ${val.task} to complete.`);
      //     this.save();
      //   }
      // });
      if (this._list[id-1].complete)
        console.log(`Task:${id}. ${this._list[id-1].task} is already completed.`);
      else {
        this._list[id-1].complete = true;
        console.log(`Mark task:${id}. ${this._list[id-1].task} to complete.`);
        this.save();
      }
    }
  }

  uncomplete(id) {
    if (id > this._list.length)
      console.log("Sorry, you have entered invalid task ID.")
    else {
      // this._list.forEach( (val, index, array) => {
      //   if(index == id-1) {
      //     val.complete = false;
      //     console.log(`Mark task:${id}. ${val.task} to uncomplete.`);
      //     this.save();
      //   }
      // });
      if (!this._list[id-1].complete)
        console.log(`Task:${id}. ${this._list[id-1].task} is already uncomplete .`);
      else {
        this._list[id-1].complete = false;
        console.log(`Mark task:${id}. ${this._list[id-1].task} to uncompleted.`);
        this.save();
      }
    }
  }

  save() {
    let testfile = this._file;
/*
    fs.writeFileSync(testfile, "[");
    this._list.forEach( (val, index, array) => {
      // console.log(val);
      // console.log(JSON.stringify(val));
      fs.writeFileSync(testfile, JSON.stringify(val), {flag: "a"});

      if(index != array.length-1)
        fs.writeFileSync(testfile, "," , {flag: "a"});
    });
    fs.writeFileSync(testfile, "]", {flag: "a"});
*/
    fs.writeFile(testfile, JSON.stringify(this._list), (err, fd) => {
      if (err)
        return console.error(err);
      console.log(`List has been saved to ${this._file}`);
    });
  }

}

class Task {
  constructor (args) {
    this.task = args['task']

    this.complete = false;
    if(args && args.hasOwnProperty('complete'))
      this.complete = args['complete'];
  }
}

let todo = new Todo('data.json');
todo.loadJsonFile();


// get params
let params = [];
process.argv.forEach( (val, index, array) => {
  if(index > 1) {
    params.push(val);
  }
});

console.log(`params = ${params}`)

if(params.length > 0) {
  switch(params[0]) {
    case 'help':
      let help_msg =
        "node todo.js help\nnode todo.js list\nnode todo.js add <task_content>\nnode todo.js task <task_id>\nnode todo.js delete <task_id>\nnode todo.js complete <task_id>\nnode todo.js uncomplete <task_id>";
      console.log(help_msg);
      break;
    case 'list':
      console.log("Todo List:")
      todo.list();
      break;
    case 'add':
      // let task_str = "";
      // params.forEach((val, index, arr) => {
      //   if(index > 0)
      //     task_str += val + " ";
      // });

      let task_str = params.slice(1,params.length);
      // console.log(`task_str = '${task_str}'`);
      task_str = task_str.join(' ');
      // console.log(`task_str = '${task_str}'`);

      todo.add(new Task({task: task_str}));

      break;
    case 'task':
      todo.taskInfo(params[1]);
      break;

    case 'delete':
      todo.delete(params[1]);
      break;
    case 'complete':
      todo.complete(params[1]);
      break;
    case 'uncomplete':
      todo.uncomplete(params[1]);
      break;
    default:
      console.log(`Sorry, wrong command.`);
  }

}



//
