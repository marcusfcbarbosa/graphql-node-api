import { Injectable } from '@nestjs/common';
import { IContract } from 'src/shared/icontract';
import { ChangePasswordDto } from '../dtos/change-password-dto';
import { Flunt } from 'src/utils/flunt';

@Injectable()
export class ChangePasswordContract implements IContract {
    errors: any[];
    validate(_dto: ChangePasswordDto): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(_dto.password, 6, 'senha necessita de pelo menos 6 caracteres');
        flunt.hasMinLen(_dto.newPassword, 6, 'nova senha necessita de pelo menos 6 caracteres');
        flunt.isEqual(_dto.newPassword, _dto.password, 'Seenha atual não pode ser igual a antiga');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}