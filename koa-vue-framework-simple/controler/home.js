const router = require('koa-router')();
const git = require("./../utils/git_function/git_tools");
const workspaces = require("./../utils/workspace_manager/workspace");

const fsPromises = require('fs').promises;

const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

module.exports = {
    index : async (ctx,next) =>{
        const username = ctx.cookies.get("username");

        const ifExist = await workspaces.checkWorkSpaceByUser(username);


        if(!ifExist){
            let workName = workspaces.workspaceNameGenerator(username);
            let userPath = await workspaces.createWorkSpace("F:\\learn_git_koa\\public\\source",workName);
        }

        await next();
    },

    getFile : async (ctx,next) => {
        console.log("ctx",ctx);
        ctx.body = {msg:"msg"};
    }
};