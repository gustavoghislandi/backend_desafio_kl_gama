import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    findAll() {
        return [{message: 'Teste controller users ok.'}]
    }
}
