
  var arrPerintah=[];
  var perintah="";
  process.argv.forEach((val, index) => {
    let hasil=[];
    if(index>1)
    {
      arrPerintah.push(val)
    }
  });
    perintah=arrPerintah;

    var fs = require('fs');
    var str = fs.readFileSync('data.json');
    var list = JSON.parse(str);
    var addList=str;

    function todo(input)
    {
      if(input[0]==="help")
      {
        console.log("$ node todo.js list\n$ node todo.js add <task_content>\n$ node todo.js task<task_id>\n$ node todo.js delete <task_id>\n$ node todo.js complete <task_id>\n$ node todo.js uncomplete <task_id>");
      }
      else if(input[0]==="list")
      {
        for(let i=0; i<list.length;i++){
          if(list[i]["complete"]===true)
          console.log(`${i+1}. [X] ${list[i]["task"]}`);
          else console.log(`${i+1}. [ ] ${list[i]["task"]}`);
        }

      }
      else if(input[0]==="add")
      {
        add(input[1]);
      }
      else if(input[0]==="delete")
      {
        hapus(input[1])
      }
      else if(input[0]==="complete")
      {
        complete(input[1]);
      }
      else if(input[0]==="uncomplete")
      {
        uncomplete(input[1]);
      }
      else {
        console.log("inputan Task Salah, Coba liat help!");
      }
    }

    function add(input)
    {
      let obj={};
      obj["task"]=input
      list.push(obj)
      var fs = require('fs');
      fs.writeFile("./data.json",JSON.stringify(list), function(err) {
        if(err)
        return console.log(err);
        console.log(list);
        console.log(`data ${input} berhasil ditambahkan`);
      });

    }

    function hapus(input)
    {
      list.splice(Number(input-1),1);
      var fs = require('fs');
      fs.writeFile("./data.json",JSON.stringify(list), function(err) {
        if(err)
        return console.log(err);
        console.log(list);
      });
    }

    function uncomplete(input)
    {
      let i=Number(input)-1;
      list[i]["complete"]=false;
      var fs = require('fs');
      fs.writeFile("./data.json",JSON.stringify(list), function(err) {
        if(err)
        return console.log(err);
        console.log(list);
      });
    }


// console.log(todo(perintah));
console.log(todo(perintah));
