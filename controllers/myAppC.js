'use strict';

const myAppModel = require('../model/myApp');

async function getAllC (req, res) {
const myApps = await myAppModel.find(null, { _id: 1, user: 1, app_id: 1 });

return { msg: 'Get ALL !', result: myApps };
}

async function getOneC (req, res) {
return await myAppModel.findOne({ _id: req?.params?.id });
}

async function SetC (req, res) {
const newMyAppModel = new myAppModel({ user: req?.body?.user, email: req?.body?.email, app_id: req?.body?.app_id });

await newMyAppModel.save();
return { msg: 'Save one !' };
}

// ....
module.exports = {
getAllC,
getOneC,
SetC,
//UpdateC,
//DeleteC
};
