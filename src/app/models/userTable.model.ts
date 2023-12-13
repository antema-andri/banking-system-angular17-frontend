export interface UserTable {
    id:string;
    username: string;
    password: string;
    name:string|null; //name customer
    email:string|null; //email customer
    roleName:string; //role user
}