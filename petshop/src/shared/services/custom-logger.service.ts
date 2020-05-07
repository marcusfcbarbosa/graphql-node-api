import { LoggerService, Logger }  from '@nestjs/common'

export class CustomLogger implements LoggerService{
    
    log(message: any, context?: string) {
        console.log(message);
    }
    error(message: any, trace?: string, context?: string) {
        console.error(message);
    }
    warn(message: any, context?: string) {
        console.warn(message);
    }
    verbose(message: any, context?: string) {
        
    }
}