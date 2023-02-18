const users = require('../store/users');
const User = require("../components/user/User")

exports.findById = (id, cb) => {
    let user = null;
    process.nextTick(function () {
        users.forEach(item => {
            if(item.id === id)
                user = item;
        });
        if(user){
            return  cb(null, user);
        }else {
            return cb(new Error(`user width id: ${id} not found`), null);
        }
        
    });
}

exports.findByUserName = (userName, cb) => {
      process.nextTick(function () {
        let user = null;
        users.forEach(item => {
            if(item.userName === userName){
                console.log(`${item.userName} === ${userName}   ${item.userName === userName}`)
                user = item;
            }      
        });
        if(user){
            return  cb(null, user);
        }else {
            return cb(new Error(`user width id: ${id} not found`), null);
        }
    });
}
exports.createUser = (user) => {
    try {
        const newUser = new User(
            userName = user.userName,
            displayName = user.displayName,
            email = user.email,
            age = user.age,
            password = user.password
        );
        users.push({...newUser});
        console.log(users);
        return {user: newUser };
    } catch (err) {
        return  { err: err };
    }

    
    
}

exports.verifyPassword = (user, password) => {
    return user.password === password
}