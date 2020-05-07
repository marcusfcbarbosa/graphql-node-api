'use strict'
export class CreateCustomerDto {
    constructor(
        public name: string,
        public username: string,
        public document: string,
        public email: string,
        public password: string,
        public roles: string[]) {
    }
}