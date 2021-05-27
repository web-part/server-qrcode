
const qr = require('qr-image');

module.exports = {
    
    send(res, opt) {
        let { size, url, } = opt;
        // console.log(url);

        let image = qr.image(url, {
            'type': 'png',
            'size': size || 5,   //默认是 5。
        });

        res.setHeader('Content-type', 'image/png');
        image.pipe(res);
    },
};