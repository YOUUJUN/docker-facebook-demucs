const Path = require("path");
const Controller = require(Path.join(process.cwd(), "nut-core")).Controller;
const { exec, execFile, spawn } = require("child_process");

class HomeController extends Controller {
    async indexPage(ctx, next) {
        let service = ctx.service;
        console.log("somebody just visit home page!");

        ctx.helper.helloLa();
        await next();

        ctx.body = await service.home.readPages("test.html");
    }

    async index(ctx, next) {
        // console.log("this from home.js=====>",this);
        // let service = ctx.service;
        // console.log('service from home.js===>',service);
        console.log("-----1");
        await next();
        console.log("-----3");
        // ctx.body = await service.home.sayHi();
        ctx.body = "ok";
    }

    async index2(ctx, next) {
        console.log("__dirname1", __dirname);

        exec('/usr/lib/demucs/', (error, stdout, stderr) => {
            if (error) {
                console.log('error', error)
            }

            console.log('stdout', stdout)

            console.log('stderr', stderr)
        });


        await next();

        ctx.body = "Hello";
    }
}

module.exports = HomeController;
