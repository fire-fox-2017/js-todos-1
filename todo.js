const fs = require('fs');

class Todo{
  constructor(masukan){
    this._data = this.initData();  //dijalankan langsung untuk membaca data, Syncronus
    this._inputan = masukan[2];   //mengambil inputannya, yang ada di indeks ke dua (help, add, list, compelete)
  }

  initData(){
    let a = fs.readFileSync('data.json', 'utf8');
    let dataJson = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    // console.log(a);          // Perbedaan tanpa JSON.parse, variabel a menjadi string
    // console.log(a[2])
    // console.log(dataJson);
    return dataJson;
  }

  dataTask(masukan){
    let task = masukan.slice(3).join(' ')
    let idPalingUjung = this._data[this._data.length-1].id
    let jsonPush = {
      id: idPalingUjung+1,
      task: task,
      completed: false
    }
    return jsonPush;
  }

  inserData(input_user){
    this._data.push(input_user)
     fs.writeFileSync('data.json', JSON.stringify(this._data), 'utf8') ;
  }

  deleteData(input_id){
    for(let i=0;i<this._data.length;i++){
      if(input_id == this._data[i].id)
        this._data.splice(i, 1);
    }
    fs.writeFileSync('data.json', JSON.stringify(this._data), 'utf8') ;
  }

  print(){

    switch (this._inputan){
      case 'help':
        console.log('[+] node todo.js help');
        console.log('[+] node todo.js list');
        console.log('[+] node todo.js add <DATA>');
        console.log('[+] node todo.js task <ID>');
        console.log('[+] node todo.js delete <ID>');
        console.log('[+] node todo.js complete <ID>');
        console.log('[+] node todo.js uncomplete <ID>');
        break;

      case 'list':
        console.log('TODO LIST DATA')
        let value;
        for(let i=0;i<this._data.length;i++){
          if(this._data[i].completed == true){
            value = 'X';
          }
          else{
            value = ' ' ;
          }
          console.log(`[${this._data[i].id}][${value}] ${this._data[i].task}`)
        }
        break;

      case 'add':
        let jsonPush = this.dataTask(masukan)
        this.inserData(jsonPush);
        console.log('TODO LIST DATA')
        for(let i=0;i<this._data.length;i++){
          console.log(`[${this._data[i].id}] ${this._data[i].task}`)
        }

        break;

      case 'task':
        console.log('DATA')
        for(let i=0;i<this._data.length;i++){
          if(masukan[3] == this._data[i].id)
            console.log(`[${this._data[i].id}] ${this._data[i].task}`)
        }
        break;

      case 'delete':
        this.deleteData(masukan[3]);
        break;

      case 'uncomplete':
        for(let i=0;i<this._data.length;i++){
          if(masukan[3] == this._data[i].id)
            this._data[i].completed = false;
        }
        fs.writeFileSync('data.json', JSON.stringify(this._data), 'utf8');

        let uncom;
        for(let i=0;i<this._data.length;i++){
          if(this._data[i].completed == true){
            uncom = 'X';
          }
          else{
            uncom = ' ' ;
          }
          console.log(`[${this._data[i].id}][${uncom}] ${this._data[i].task}`)
        }
        break;

      case 'complete':
          for(let i=0;i<this._data.length;i++){
            if(masukan[3] == this._data[i].id)
              this._data[i].completed = true;
          }
          fs.writeFileSync('data.json', JSON.stringify(this._data), 'utf8') ;

          let nilai;
          for(let i=0;i<this._data.length;i++){
            if(this._data[i].completed == true){
              nilai = 'X';
            }
            else{
              nilai = ' ' ;
            }
            console.log(`[${this._data[i].id}][${nilai}] ${this._data[i].task}`)
          }
        break;
      }
  }

}

let masukan = process.argv

let todo = new Todo(masukan);
todo.print();