'use strict'
export class Flunt {

    constructor(public errors: any[] = []) { }

    isRequired(value, message) {
        if (!value || value.length <= 0) {
            this.errors.push(message);
        }
    }

    hasMinLen = (value, min, message) => {
        if (!value || value.length < min) {
            this.errors.push(message);
        }
    }

    hasMaxLen = (value, max, message) => {
        if (!value || value.length > max) {
            this.errors.push(message);
        }
    }

    isFixedLen = (value, len, message) => {
        if (!value || value.length != len) {
            this.errors.push(message);
        }
    }

    isEqual = (value1, value2, message) => {
        if (value1 == value2) {
            this.errors.push(message);
        }
    }

    isGreatherThan = (value, len, message) => {
        if (!value || value.length > len) {
            this.errors.push(message);
        }
    }

    isEmail = (value, message) => {
        var reg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        if (!reg.test(value)) {
            this.errors.push(message);
        }
    }

    isCpf = (cpf, message) => {

        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.length < 11)
            this.errors.push(message);
        for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                this.errors.push(message);
            numeros = cpf.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                this.errors.push(message);
        }
        else
            this.errors.push(message);
    }


    clear() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length === 0;
    }

}