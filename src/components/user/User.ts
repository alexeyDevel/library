const {v4: uuid} = require("uuid");

class User {
    id: string;
    userName: string;
    displayName: string;
    email: string;
    age: string;
    password: string;
    
    constructor(userName: string, displayName: string, email: string, age: string, password: string){
        this.id = uuid(),
        this.userName = userName,
        this.displayName = displayName,
        this.email = email,
        this.age = age,
        this.password = password
    }
}

export default User;