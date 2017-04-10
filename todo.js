const fs = require('fs');

class Task {
  constructor (name) {
    this.id = 0;
    this.name = name;
    this.completed = false;
  }
}

class TodoList {
  constructor (file) {
    this.data = this.read(file);
  }

  help () {
    console.log(`>>> TO DO LIST HELP <<<`);
    console.log(`$ node todo.js # will call help`);
    console.log(`$ node todo.js help`);
    console.log(`$ node todo.js list`);
    console.log(`$ node todo.js add <task_content>`);
    console.log(`$ node todo.js delete <task_id>`);
    console.log(`$ node todo.js complete <task_id>`);
    console.log(`$ node todo.js uncomplete <task_id>`);
  }

  list () {
    console.log(`>>> TO DO LIST TASK <<<`)
    for (let i = 0; i < this.data.length; i++) {
      let checked = ``
      if (this.data[i].completed) {
        checked = `[x]`;
      } else {
        checked = `[ ]`;
      }
      console.log(`${this.data[i].id}. ${checked} ${this.data[i].name}`);
    }
  }

  add (name) {
    let task = new Task(name);
    task.id = this.data.length + 1;
    this.data.push(task);
    this.write();
    console.log(`Added "${this.data[this.data.length - 1].name}" (ID : ${this.data[this.data.length - 1].id})`);
  }

  task (id) {
    if (!(this.data[id - 1])) {
      console.log(`Invalid task id`);
    } else {
      console.log(`Task ID : ${id}`);
      console.log(`Task Name : ${this.data[id - 1].name}`);
      console.log(`Completed : ${this.data[id - 1].completed}`);
    }

  }

  delete (id) {
    if (!(this.data[id - 1])) {
      console.log(`Invalid task id`);
    } else {
      let name = this.data.splice(id - 1, 1);
      this.write();
      console.log(`Deleted "${this.data[this.data.length - 1].name}" (ID : ${id})`);
    }
  }

  complete (id) {
    if (!(this.data[id - 1])) {
      console.log(`Invalid task id`);
    } else if (this.data[id - 1].completed == true) {
      console.log(`The task is already completed`);
    } else {
      this.data[id - 1].completed = true;
      this.write();
      console.log(`Task ${id} has been marked completed`)
    }
  }

  uncomplete (id) {
    if (!(this.data[id - 1])) {
      console.log(`Invalid task id`);
    } else if (this.data[id - 1].completed == false) {
      console.log(`The task is already completed`);
    } else {
      this.data[id - 1].completed = false;
      this.write();
      console.log(`Task ${id} has been marked uncompleted`);
    }
  }

  read(file) {
    let objArray = JSON.parse(fs.readFileSync(file).toString());
    let tasks = [];
    for (let i = 0; i < objArray.length; i++) {
      let task = new Task(objArray[i].name);
      task.id = i + 1;
      task.completed =  objArray[i].completed;
      tasks.push(task);
    }
    return tasks;
  }

  write() {
    let objArray = [];
    for (let i = 0; i < this.data.length; i++) {
      let obj = {};
      obj["name"] = this.data[i].name;
      obj["completed"] = this.data[i].completed;
      objArray.push(obj);
    }
    fs.writeFileSync("data.json", JSON.stringify(objArray));
  }

  convertObject (classObject) {
    let obj = {};
    obj["name"] = classObject.name;
    obj["completed"] = classObject.completed;
    return obj;
  }

  convertJSON (jsonObject) {
    let obj = new Task(jsonObject["name"]);
    this.id = this.data.length + 1;
    return obj;
  }
}

let todo = new TodoList("data.json");
let argv = process.argv;
if (argv[2] == `help`) {
  todo.help();
} else if (argv[2] == `list`) {
  todo.list();
} else if (argv[2] == `add`) {
  if (!(argv[3])) {
    console.log(`Please describe task name`);
  } else {
    let taskContent = argv.slice(3, argv.length).join(" ");
    todo.add(taskContent);
  }
} else if (argv[2] == `task`) {
  if (!(argv[3])) {
    console.log(`Please add task id`);
  } else {
    todo.task(argv[3]);
  }
} else if (argv[2] == `delete`) {
  if (!(argv[3])) {
    console.log(`Please add task id`);
  } else {
    todo.delete(argv[3]);
  }
} else if (argv[2] == `complete`) {
  if (!(argv[3])) {
    console.log(`Please add task id`);
  } else {
    todo.complete(argv[3]);
  }
  todo.complete(argv[3]);
} else if (argv[2] == `uncomplete`) {
  if (!(argv[3])) {
    console.log(`Please add task id`);
  } else {
    todo.uncomplete(argv[3]);
  }
} else {
  todo.help();
}
