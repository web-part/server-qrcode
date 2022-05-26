
const qr = require('qr-image');



module.exports = {
    /**
    * 启动二维码服务。
    * @param {*} app 
    * @param {object} opt 
    *   opt = {
    *       path: '/qrcode',    //必选，页面路径。
    *       size: 5,            //可选，二维码的大小。
    *       margin: 4,          //可选，二维码图像四周的空白。
    *   };
    * @returns { path, }
    */
    start(app, opt) {
        let { path, } = opt;

        //针对 `/` 的根目录路由。
        //支持直接指定目标 url，
        //如`http://localhost:3001/qrcode?size=10&margin=2&url=http%3A%2F%2Fgoogle.com`。
        app.get(path, (req, res) => {
            let { url, size, margin, } = req.query;

            url = url || `http://${req.headers.host}`;
            size = Number(size || opt.size) || 5;           //大小不能为 0。
            margin = Number(margin || opt.margin) || 0;     //空白可以为 0。

            let image = qr.image(url, {
                'type': 'png',
                'size': size,
                'margin': margin,
            });

            res.setHeader('Content-type', 'image/png');
            image.pipe(res);
        });


        return { path, };

    },

};