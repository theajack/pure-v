
function promise (fn) {
    return new Promise(res => {
        fn(res);
    });
}

function delay (time = 50) {
    return promise((resolve) => {
        setTimeout(resolve, time);
    });
}

module.exports = {
    delay, promise
};