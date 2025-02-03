const fsPromises = require('fs').promises;
const path = require('path');

const git = require("./../git_function/git_tools");


/*--store builder--*/
/*
*
* 操作成功返回工作路径;
*
* */

var workspaces = {

    checkWorkSpaceByUser :async (userName) =>{
        var spaceName = workspaces.workspaceNameGenerator(userName);
        const headPath = path.resolve('./public/workspaces');
        let spacePath = path.join(headPath,spaceName);
        try{
            await fsPromises.access(spacePath)
        }catch (e) {
            return false;
        }
        return true;
    },

    checkModuleByUser : (moduleName, userName) =>{
        let hello = workspaces.checkWorkSpaceByUser();
        console.log("hello------------",hello);
    },

    workspaceNameGenerator : (username) =>{
        let reName = "workBanchFor_";
        const spaceName = reName.concat(username);
        return spaceName;
    },

    createWorkSpace : async (origin, name) => {
        const headPath = path.resolve('./public/workspaces');
        const createPath = path.join(headPath,name);
        console.log("createPath",createPath);
        await fsPromises.mkdir(createPath);

        try{
            await git.clone(origin,createPath);
            await git.dealPushIssue(createPath);
            await git.add("*",createPath);
            await git.commit(createPath,"初始化工作区");
        }catch (e) {
            console.error("创建工作区"+name+"失败！");
            workspaces.destroyWorkSpace(createPath);
            return;
        }
        return createPath;
    },

    destroyWorkSpace : async (path) => {
        console.log("destroying-------------");
        await fsPromises.rmdir(path);
    }
};


module.exports = workspaces;





// function createWorkSpace(origin, name, callback){
//     if(callback){
//         callback = callback;
//     }
//
//     var headPath = path.resolve('./public/workspaces');
//     var createPath = path.join(headPath,name);
//
//     try{
//         fs.mkdir(createPath,function(err){
//             if(err) {
//                 throw err;
//                 return console.log("创建用户工作区功能失败!",err);
//             }
//             console.log("用户目录创建成功！名称为",createPath);
//
//             git.clone(origin,createPath,function (err) {
//                 if(err){
//                     throw err;
//                     return console.log("Git clone 用户工作区功能失败!",err);
//                 }
//
//                 git.dealPushIssue();
//
//                 git.add("*",createPath ,function (err) {
//                     if(err){
//                         throw err;
//                         return;
//                     }
//
//                     git.commit(createPath,"用户工作空间git初始化成功!",function (err) {
//                         if(err){
//                             throw err;
//                             return;
//                         }
//                     });
//
//                 });
//             });
//
//         });
//
//         callback(null, createPath);
//
//     }catch (err) {
//         destroyWorkSpace(createPath);
//         callback(err);
//     }
//
// }