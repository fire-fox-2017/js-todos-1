const fs = require('fs');

class Todo {
  constructor() {
    this.argv = process.argv;
  }

  start() {
      switch(this.argv[2]) {
        case 'help':
        default:
          this.help();
          break;
        case 'add':
          this.addingTask(this.getUserInput())
          break;
        case 'list':
          this.listAllTask();
          break;
        case 'task':
          this.showDetailedTaskInfo(this.getUserInput());
          break;
        case 'delete':
          this.deleteTask(this.getUserInput());
          break;
        case 'complete':
          this.completeTask(this.getUserInput());
          break;
        case 'uncomplete':
          this.completeTask(this.getUserInput());
          break;
      }
  }

    getUserInput() {
          let result = [];
          for (let i = 3; i < this.argv.length; i++) {
             result.push(this.argv[i]);
          }
          return result.join(' ');
      }
    

    showDetailedTaskInfo(id) {
      fs.readFile('data.json', 'utf-8', (err, data) => {
        let idInNum = Number(id);
        let tasks = JSON.parse(data);
          for(let i = 0; i < tasks.length; i++) {
            if(idInNum === tasks[i].id) {
              console.log(tasks[i]);
            }
          }
      });
    }

    listAllTask() {
      fs.readFile('data.json', 'utf-8', (err, data) => {
        let tasks = JSON.parse(data);
        for(let i = 0; i < tasks.length; i++) {
            console.log(`${tasks[i].id} [${(tasks[i].isCompleted ? 'X' : ' ')}] : ${tasks[i].content}`);
        }
      });
    }

    addingTask(task) {
      fs.readFile('data.json', 'utf-8', (err, data) => {
        let tasks = JSON.parse(data);
        let lastId = tasks.length === 0 ? null : tasks[tasks.length-1].id; // get the id num
        let newId = lastId === null ? 1 : lastId + 1;
        let newTask = new Task(newId, task);
        tasks.push(newTask);
        let newTaskInStr = JSON.stringify(tasks);
        fs.writeFile('data.json', newTaskInStr, 'utf-8', (err) => {
          console.log(`${task} added!`);
        });
      });
    }

    deleteTask(id) {
      fs.readFile('data.json', 'utf-8', (err, data) => {
        let tasks = JSON.parse(data);
        let idInNum = Number(id);
        let deletedTask;
          for(let i = 0; i < tasks.length; i++) {
            if(idInNum === tasks[i].id) {
              deletedTask = tasks[i].content;
              tasks.splice(i, 1);
            }
          }
          
        fs.writeFile('data.json', JSON.stringify(tasks),'utf8', (err) => {
          console.log(`Delete "${deletedTask}" from your TODO list`);
        })
      });
    }

    completeTask(id) {
      fs.readFile('data.json', 'utf-8', (err, data) => {
        let tasks = JSON.parse(data);
        let idInNum = Number(id) - 1;
        let msg;
        let task;
        if(idInNum >= tasks.length || undefined || null)
            console.log('ID tak tersedia');
        else {
          if(tasks[idInNum].isCompleted === true) {
            tasks[idInNum].isCompleted = false;
            msg = 'uncompleted';
            task = tasks[idInNum].content;
          } else if(tasks[idInNum].isCompleted === false) {
            tasks[idInNum].isCompleted = true;
            msg = 'done';
            task = tasks[idInNum].content;
          }
        }
        
        fs.writeFile('data.json', JSON.stringify(tasks), 'utf-8', (err, data) => {
          console.log(`You have marked "${task}" as ${msg} from your TODO list`);
        });
      });
    }

  help() {
    console.log(`Command List:\nnode todo.js help\nnode todo.js list\nnode todo.js add <task_content>\nnode todo.js task <task_id>\nnode todo.js delete <task_id>\nnode todo.js complete <task_id>\nnode todo.js uncomplete <task_id>`);
  }
}

class Task {
  constructor(id, content, isCompleted = false) {
    this.id = id;
    this.content = content;
    this.isCompleted = isCompleted;
  }

}

let todo = new Todo();



todo.start();
