export interface UserTable {
    id:string|null|number;
    username: string;
    password: string;
    name:string|null; //name customer
    email:string|null; //email customer
    roleName:string; //role user
}