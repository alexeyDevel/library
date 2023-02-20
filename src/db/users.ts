import users from '../store/users';
import User from "../components/user/User";

interface IUser {
    id: string; userName: string; password: string; displayName: string; email: string; age: string;
}
interface IUserDtv {
    userName: string; password: string; displayName: string; email: string; age: string;
}

export function findById (id: string, cb: any){
    let user: IUser = null;
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

export function findByUserName (userName: string, cb: any){
      process.nextTick(function () {
        let user: IUser | null = null;
        users.forEach(item => {
            if(item.userName === userName){
                console.log(`${item.userName} === ${userName}   ${item.userName === userName}`)
                user = item;
            }      
        });
        if(user){
            return  cb(null, user);
        }else {
            return cb(new Error(`user width id: ${user.id} not found`), null);
        }
    });
}
export function createUser(user:IUserDtv) {
    try {
        const newUser = new User(
            user.userName,
            user.displayName,
            user.email,
            user.age,
            user.password
        );
        users.push({...newUser});
        console.log(users);
        return {user: newUser };
    } catch (err) {
        return  { err: err };
    }

    
    
}

export function verifyPassword (user: IUser, password: string) {
    return user.password === password
}