import { UserModel } from '../users/user.model';
import { AbstractGroupModel } from './abstracts/group.model.abstract';
import { GroupEntity } from './group.entity';
import { PurposeEntity } from 'src/purposes/purpose.entity';

export class GroupModel extends AbstractGroupModel {
  constructor(
    id: number,
    title: string,
    owner: UserModel,
    members: UserModel[] = [],
    purposes: number[] = [],
    joinCode: string,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.owner = owner;
    this.members = members;
    this.joinCode = joinCode;
    this.purposes = purposes;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getOwner(): UserModel {
    return this.owner;
  }

  setOwner(owner: UserModel): void {
    this.owner = owner;
  }

  getMembers(): UserModel[] {
    return this.members;
  }

  setMembers(members: UserModel[]): void {
    this.members = members;
  }

  getJoinCode(): string {
    return this.joinCode;
  }

  setJoinCode(joinCode: string): void {
    this.joinCode = joinCode;
  }

  addMember(user: UserModel): void {
    this.members.push(user);
  }

  removeMember(user: UserModel): void {
    this.members = this.members.filter((member) => member.getId() !== user.getId());
  }


  getPurposes(): number[] {
    return this.purposes;
  }

  setPurposes(purposes: number[]): void {
    this.purposes = purposes;
  }

  addPurpose(purpose: number): void {
    this.purposes.push(purpose);
  }
  addPurposes(purposes: number[]): void {
    this.purposes.push(...purposes);
  }

  static fromEntity(entity: GroupEntity): GroupModel {
    return new GroupModel(
      entity.id,
      entity.title,
      UserModel.fromEntity(entity.owner),
      entity.members?.map(user => UserModel.fromEntity(user)) || [],
      entity.purposes?.map(purpose => purpose.id) || [],
      entity.joinCode,
    );
  }

  static toEntity(model: GroupModel): GroupEntity {
    const entity = new GroupEntity();
    entity.id = model.getId();
    entity.title = model.getTitle();
    entity.owner = UserModel.toEntity(model.getOwner());
    entity.members = model.getMembers().map(user => UserModel.toEntity(user));
    entity.joinCode = model.getJoinCode();
    entity.purposes = model.getPurposes().map(purpose => {
      const purposeEntity = new PurposeEntity();
      purposeEntity.id = purpose;
      return purposeEntity;
    });
    return entity;
  }



}
