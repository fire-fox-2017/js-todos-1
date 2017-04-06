const fs = require('fs');
let input = process.argv;
input.shift();
input.shift();

class toDo {

    constructor() {
        this._list_task = [];
        this._data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    }
    helpTask() {
        console.log(`--------- Aplikasi TO DO LIST ---------`)
        console.log(`help : untuk melihat daftar command \nlist : untuk melihat daftar task\nadd <task_content> : untuk menambah data \ntask <task_id> : untuk mencari data\ndelete <task_id> : untuk menghapus data \ncomplete <task_id> : untuk check mark data  \nuncomplete <task_id> : untuk un check mark data`);
    }

    listTask() {
        if (this._data.length > 0) {
            for (var i = 0; i < this._data.length; i++) {
              if(this._data[i].marked == false){
                console.log(`${i+1}. [] ${this._data[i].id} : ${this._data[i].task}`);
              } else {
                console.log(`${i+1}. [x] ${this._data[i].id} : ${this._data[i].task}`);
              }
            }
        } else {
            console.log(`Daftar Task Kosong`);
        }
    }

    addTask(task) {
        let jumlah = 0;
        let id = 'ID';
        let tmpID = this._data[this._data.length-1].id;
        let nomorID = tmpID.slice(2);
        let idfinal = id + (+nomorID +1);

        let dataBaru = {id : idfinal, marked:false ,task : task};
        this._data.push(dataBaru);

        this.saveJson(this._data);
        console.log('Data berhasil ditambah');


    }

    searchTask(idTask) {
        let jumlah = 0;
        if (this._data.length > 0) {
            for (var i = 0; i < this._data.length; i++) {
                if (this._data[i].id == idTask) {
                  if(this._data[i].marked == false){
                    console.log(`${i+1}. [] ${this._data[i].id} : ${this._data[i].task}`);
                  } else {
                    console.log(`${i+1}. [x] ${this._data[i].id} : ${this._data[i].task}`);
                  }
                    jumlah++;
                }
            }
            if (jumlah == 0) {
                console.log('Data tidak ditemukan');
            }
        } else {
            console.log(`Data Task Kosong`);
        }
    }

    deleteTask(idTask) {
        let jumlah = 0;
        if (this._data.length > 0) {
            for (var i = 0; i < this._data.length; i++) {
                if (this._data[i].id == idTask) {
                    this._data.splice(i, 1);
                    jumlah++;
                }
            }
            if (jumlah == 0) {
                console.log('Data tidak ditemukan');
            } else {
              console.log('Data berhasil dihapus');
            }
        } else {
            console.log(`Data Task Kosong`);
        }

        this.saveJson(this._data);
    }

    completeTask(idTask) {
      let jumlah = 0;
      if (this._data.length > 0) {
          for (var i = 0; i < this._data.length; i++) {
              if (this._data[i].id == idTask) {
                  this._data[i].marked = true;
                  jumlah++;
              }
          }
          if (jumlah != 0) {
              console.log('Data berhasil di check mark');
          } else {
            console.log('Data tidak ditemukan');
          }
      } else {
          console.log(`Data Task Kosong`);
      }

      this.saveJson(this._data);

    }

    uncompleteTask(idTask) {
      let jumlah = 0;
      if (this._data.length > 0) {
          for (var i = 0; i < this._data.length; i++) {
              if (this._data[i].id == idTask) {
                  this._data[i].marked = false;
                  jumlah++;
              }
          }
          if (jumlah != 0) {
              console.log('Data berhasil di uncheck mark');
          } else {
            console.log('Data tidak ditemukan');
          }
      } else {
          console.log(`Data Task Kosong`);
      }
      this.saveJson(this._data);
    }

    saveJson(data) {
        fs.writeFile('data.json', JSON.stringify(data), function(err) {
            if (err) return console.log(err);
        });
    }
}

let appToDo = new toDo();

if (input[0] === undefined || input[0] === 'help') {
    appToDo.helpTask();
} else if (input[0] === 'list') {
    appToDo.listTask();
} else if (input[0] === 'add') {
    input.shift();
    appToDo.addTask(input.join(' '));
} else if (input[0] === 'task') {
    input.shift();
    appToDo.searchTask(input.join(' '));
} else if (input[0] === 'delete') {
    input.shift();
    appToDo.deleteTask(input);
} else if (input[0] === 'complete') {
    input.shift();
    appToDo.completeTask(input);
} else if (input[0] === 'uncomplete') {
    input.shift();
    appToDo.uncompleteTask(input);
} else {
    console.log('Perintah Tidak Ditemukan');
}
