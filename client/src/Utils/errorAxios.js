const showErr = (err, cb) => {
    if (err.response && err.response.status) {
        if (err.response.status === 500)
            return cb({ msg: "Server Error" }, null);
        return cb(err.response.data, null);
    } else {
        console.log(err);
        cb({ msg: "Unknown Error" }, null);
    }
};

export default showErr;
