import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ResponseUserDto } from "./dto/response-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: "Create a new user"})
    @ApiResponse({
        status: 201,
        description: "The user has been successfully created.",
        type: ResponseUserDto
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request'
    })
    @ApiBody({type: CreateUserDto})
    async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        return this.userService.createUser(createUserDto);
    }

}