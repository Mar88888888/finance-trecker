import { IsNotEmpty, IsNumber, IsDate, IsString, IsBoolean } from 'class-validator';
import { Type, Expose, Exclude, Transform } from 'class-transformer';
import { UserSerializeDto } from 'src/users/dto/serialize.user.dto';
import { UserModel } from 'src/users/user.model';

export class PurposeDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  category: string;
  
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  type: boolean;
}

export class SerializeTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  sum: number;

  @IsNotEmpty()
  @IsDate()
  @Expose()
  date: string;

  @IsNotEmpty()
  @Type(() => UserSerializeDto)
  @Expose()
  member: UserModel;
  
  @IsNotEmpty()
  @Expose()
  @Type(() => PurposeDto)
  purpose: PurposeDto;

  @Exclude()
  purposeId;
}
