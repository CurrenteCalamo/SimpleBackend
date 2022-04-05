import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'It`s Unique mail of user',
  })
  readonly email: string;
  @ApiProperty({
    example: 'ilikechocolate',
    description: 'It`s password of user',
  })
  readonly password: string;
}
