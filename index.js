#! /usr/bin/env node

const fs = require('fs');

let command = process.argv[2];
let currentPath = process.cwd();

let existFile = function (path) {
    let exit = false;
    try{
        let fileStat = fs.statSync(path);
        if(fileStat){
            exit = true;
        }
    }catch(err){
        if(err.code !== 'ENOENT'){
            exit = true;
        }
    }
    return exit;
}

let newFile = function () {
    let file = process.argv[3];
    let fullPath = currentPath + '/' + file + '.md';
    let template = `<!--mdblog
{
    "title":"${file}",
    "date":${JSON.stringify(new Date())},
    "tag":[]
}
mdblog-->`;

    if(existFile(fullPath)){
        console.log(`${fullPath} 文件已存在`);
    }else{
        console.log(`new file ${fullPath}`);
        fs.writeFileSync(fullPath,template);
    }
}

let help = function () {
    console.log('Usage: mdblog [command] [arg]');
    console.log('command:');
    console.log('\t new|n : new markdown file. [argv] is the file name.');
    console.log('example:');
    console.log('\t mdblog n hello : create the new file hello.md');
}

switch(command) {
    case 'new':
        newFile();
        break;
    case 'n':
        newFile();
        break;
    case '--help':
        help();
        break;
    default:
        console.log('nothing to do');
}


