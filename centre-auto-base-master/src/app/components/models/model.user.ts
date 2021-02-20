export class User{
    private _id : string;
    private _firstname : string;
    private _lastname : string;
    private _email : string;
    private _password;


    constructor(firstname : string, lastname: string,email: string,password : string){

        this._firstname  = firstname;
        this. _lastname = lastname;
        this._email = email;
        this._password = password;
    }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get firstname(): string {
        return this._firstname;
    }

    set firstname(value: string) {
        this._firstname = value;
    }

    get lastname(): string {
        return this._lastname;
    }

    set lastname(value: string) {
        this._lastname = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    toPlainObj(){
        return {
            id : this._id,
            firstname : this._firstname,
            lastname : this._lastname,
            password : this._password,
            email : this._email
        }
    }
}
