module.exports = function (addOn) {

    return common[addOn] ? common[addOn] : require("profile-extension-" + addOn);

};

var common = {
    "pairwise": require("./extensions/pairwise.js"),
    "approval": {
        "approvalData": function () {
            console.log("test");
        }
    }
};
