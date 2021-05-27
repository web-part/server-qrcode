

const Path = require('./modules/Path');
const Response = require('./modules/Response');



module.exports = {

    /**
    * 启动二维码服务。
    * @param {*} app 
    * @param {object} opt 
    *   opt = {
    *       host: 'localhost',  //如果不传，则默认为 `localhost`。
    *       port: 3001,         //端口号。
    *       size: 10,           //二维码的大小。
    *       path: '/qrcode',    //页面路径。
    *   };
    * @returns { path, size, url, }
    */
    start(app, opt) {
        let { size, } = opt;
        let { path, regexp, url, } = Path.get(opt);

        //针对 `/qr` 的根目录路由。
        app.get(path, (req, res) => {
            Response.send(res, {
                'size': size,
                'url': url,
            });
        });


        //针对如 `/qr/a/b/c` 这样的任意路由。
        app.get(regexp, (req, res) => {
            let dir = req.url.slice(path.length);
          
            Response.send(res, {
                'size': size,
                'url': `${url}${dir}`,
            });

        });

        return {
            path,
            size,
            url,
        };

    },

};