'use strict'
export class UpdateCustomerDto {
    constructor(
        public name: string,
        public username: string,
        public document: string,
        public email: string,
        public password: string) {
    }
}