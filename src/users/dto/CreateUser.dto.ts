import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'It`s Unique mail of user',
  })
  @IsString({ message: 'всегда должно быть строкой' })
  @IsEmail({}, { message: 'aboba' })
  readonly email: string;
  @ApiProperty({
    example: 'ilikechocolate',
    description: 'It`s password of user',
  })
  @IsString({ message: 'всегда должно быть строкой' })
  @Length(4, 15, { message: 'aboba' })
  readonly password: string;
}
