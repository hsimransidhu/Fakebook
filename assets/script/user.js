'use strict';

export default class User {
    constructor(id, name, userName, email) {
        this._id = id;
        this._name = name;
        this._userName = userName;
        this._email = email;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get userName() {
        return this._userName;
    }

    get email() {
        return this._email;
    }

    getInfo() {
        return {
            id: this.id,
            name: this.name,
            userName: this.userName,
            email: this.email,
        };
    }
}