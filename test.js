let arr = '[{"task":"makan nasi","complete":false}{"task":"test","complete":false}]';

var fs = require('fs')
let data = fs.readFileSync("test.json")
.toString()
.split("\n");

console.log(data);
console.log(JSON.parse(data));

let testfile = "haha.json"
fs.writeFile(testfile, "write this bitch", (err, fd) => {
  if (err)
    return console.error(err);

  console.log("File written on the file");
})
