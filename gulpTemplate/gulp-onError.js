/* Error handler */
exports.onError = function (err) {
    console.log(err);
    this.emit('end');
};