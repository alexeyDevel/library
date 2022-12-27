const {v4: uuid} = require("uuid");

class User {
    constructor(userName, displayName, email, age, password){
        this.id = uuid(),
        this.userName = userName,
        this.displayName = displayName,
        this.email = email,
        this.age = age,
        this.password = password
    }
}

module.exports = User;