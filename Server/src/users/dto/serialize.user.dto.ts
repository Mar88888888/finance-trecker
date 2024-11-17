import { Exclude, Transform } from 'class-transformer';
import { BaseUserDto } from './abstracts/base.user.dto';
import { GroupModel } from 'src/groups/group.model';

export class UserSerializeDto extends BaseUserDto {
  id: number;
  isEmailVerified: boolean;
  @Transform(({ value }) => (value === true ? 'male' : 'female'))
  gender: boolean;

  @Exclude()
  password: string;

  @Exclude()
  groups: GroupModel;

  @Exclude()
  myGroups: GroupModel;
  
  @Exclude()
  transactions: any;

  @Exclude()
  verificationToken?: string;
}
