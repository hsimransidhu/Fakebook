import User from './user.js';

'use strict';
export default class Subscriber extends User {
    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email);
        this._pages = pages;
        this._groups = groups;
        this._canMonetize = canMonetize;
    }

    get pages() {
        return this._pages;
    }

    get groups() {
        return this._groups;
    }

    get canMonetize() {
        return this._canMonetize;
    }

    getInfo() {
        const baseInfo = super.getInfo();
        return {
            ...baseInfo,
            pages: this.pages,
            groups: this.groups,
            canMonetize: this.canMonetize,
        };
    }
}