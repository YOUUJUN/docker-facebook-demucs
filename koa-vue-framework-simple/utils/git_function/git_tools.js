const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

var {exec} = require("child_process");
const { spawn } = require('child_process');


var git = {

    /*---git clone---*/
    clone : async function (originPath, workPath){
        await execFile('git',['clone', originPath],{cwd : workPath});
    },

    /*---deal git push unsuccessful*/
    dealPushIssue : async function(path) {
        await execFile("git",['config','receive.denyCurrentBranch','ignore'],{cwd : path});
    },

    /*---git add---*/
    add : async function(filePath, dirPath){
        await  execFile("git",['add',filePath],{cwd : dirPath});
    },

    /*---git commit ---*/
    commit : async function(path, message){
        try{
            await  execFile("git",['commit','-m',message],{cwd : path});
        }catch(err) {
            console.log("git commit err!", err);
        }
    },

    /*---git commit all ---*/
    commitAll : async function(path,message) {
        try{
            await  execFile("git",['commit','-a','-m',message],{cwd : path});
        }catch(err) {
            console.log("git commit all err!", err);
        }
    },

    /*---git push ---*/
    push : async function (path,remote) {
        if(!remote){
            remote = "";
        }
        await execFile("git",['push', remote],{cwd: path});
    },


    /*---git push force ---*/
    pushForce : async function (path, remote) {
        if(!remote){
            remote = "";
        }

        await execFile("git",['push','--force', remote],{cwd: path});
    },

    /*---git fetch ---*/
    fetch : async function (path, remote) {
        if(!remote){
            remote = "";
        }

        await execFile("git",['fetch', remote],{cwd: path});
    },

    /*---git diff ---*/
    diff : async function(son, nextDoor,path){

        await execFile("git",['diff', son,nextDoor],{cwd: path});
    }


};


module.exports = git;





