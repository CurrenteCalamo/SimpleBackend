import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from 'exceptions/validation.exception';
@Injectable()
export class validationpipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors: any = Validate(obj);
    if (errors.length) {
      let messagges = errors.map((err) => {
        return `${err.property}-${Object.values(err.constraints).join(`, `)}`;
      });
      throw new ValidationException(messagges);
    }
  }
}
