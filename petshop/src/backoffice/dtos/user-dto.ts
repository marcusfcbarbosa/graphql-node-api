'use strict'
export class UserDto {
    constructor(
        public name: string,
        public document: string,
        public email: string
    ) {
    }
}