let fs = require('fs');
let data = JSON.parse(fs.readFileSync('data.json'));

class TODO {
    constructor(data) {
        this._data = data;
    }

    help() {
        console.log(`list           : Melihat daftar item TODO`);
        console.log(`add            : Menambahkan item`);
        console.log(`delete         : Menghapus item`);
        console.log(`task <id>      : Melihat detail item`);
        console.log(`complete <id>  : Menandai bahwa item telah selesai`);
        console.log(`uncomplete <id>: Menandai bahwa item belum selesai`);
    }

    list() {
        let temp = '';
        for (let i = 0; i < this._data.length; i++) {
            if (!this._data[i].completionStatus) {
                temp += `${i+1}. [ ] ${this._data[i].content} \n`
            } else {
                temp += `${i+1}. [x] ${this._data[i].content} \n`
            }
        }
        console.log(temp)
    }

    add(input) {
        let obj = {
            content: input,
            completionStatus: false
        }
        this._data.push(obj)
        console.log(`Penambahan item sukses!`);
    }

    delete(id) {
        let data = this._data.splice(id - 1, 1);
        console.log(`Penghapusan item sukses!`);
    }

    detail(id) {
        let task = this._data[id - 1].content;
        let status = this._data[id - 1].completionStatus;
        if(status){
          status = 'Complete';
        } else {
          status = 'Incomplete';
        }
        console.log(`Task ${id}: ${task} \nStatus: ${status}`);
    }

    complete(id) {
        if (this._data[id - 1].completionStatus == false) {
            this._data[id - 1].completionStatus = true
            console.log(`Sukses (${id}. [x] ${this._data[id-1].content})`);
        } else {
            console.log(`Item memang sudah complete (${id}. [x] ${this._data[id-1].content})`);
        }
    }

    uncomplete(id) {
        if (this._data[id - 1].completionStatus == false) {
            console.log(`Item memang masih belum complete (${id}. [ ] ${this._data[id-1].content})`);
        } else {
            this._data[id - 1].completionStatus = false
            console.log(`Sukses (${id}. [ ] ${this._data[id-1].content})`);
        }
    }

    saveToFile() {
        fs.writeFile('data.json', JSON.stringify(this._data,null,'\t'), (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}

let todo = new TODO(data);
let convert = process.argv;
if (convert[2] == "add") {
    todo.add(String(convert.slice(3)).replace(/,/g, ' '));
    todo.saveToFile();
} else if (convert[2] == "list") {
    todo.list()
} else if (convert[2] == "delete") {
    todo.delete(convert[3]);
    todo.saveToFile()
} else if (convert[2] == "detail") {
    todo.detail(convert[3]);
} else if (convert[2] == "complete") {
    todo.complete(convert[3]);
    todo.saveToFile()
} else if (convert[2] == "uncomplete") {
    todo.uncomplete(convert[3]);
    todo.saveToFile()
} else if (convert[2] == "help") {
    todo.help(convert[3]);
} else {
    console.log(`Command is not found`);
}
