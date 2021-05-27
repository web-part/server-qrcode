


function format(path) {
    //确保以 `/` 开头。
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    //去掉结尾处的 `/`。
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    return path;
}



module.exports = {

    get({ path, host, port, }) {
        host = host || 'localhost';
        path = format(path);
        
        let url = `http://${host}:${port}`;
        let regexp = new RegExp(`${path}/+`);


        return { path, url, regexp, };

    },
};