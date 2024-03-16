const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(){
    return await db.User.findAll();
}

async function getById(id){
    return await getUser(id);

}

async function update(id, params){
    const user = await getUser(id);

}

//validate
const usernameChange = params.username && user.username !== params.username;
if (usernameChange && await db.User.findOne({where: {username: params.username}})){
    throw 'Username "' + params.username + '"is already taken';
}

// hash password if it was entered
if (params.password){
    params.passwordHash = await bcrypt.hash(params.password, 10);

}

//copy params to user and save
Object.assign(user, params);
await user.save();
