module.exports = function (package) {

    return common[package] ? common[package] : require("profile-extension-" + package);

};

var common = {
    "condercet": require("./extensions/pairwise.js"),
    "approval": {
        "approvalData": function () {
            console.log("test");
        }
    }
};
