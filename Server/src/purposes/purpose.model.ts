import { TransactionEntity } from '../transactions/transaction.entity';
import { PurposeEntity } from './purpose.entity';
import { AbstractPurpose } from './abstracts/purpose.model.abstract';
import { UsersService } from '../users/users.service';
import { UserModel } from 'src/users/user.model';

export class PurposeModel extends AbstractPurpose {
  private transactions: TransactionEntity[] = [];


  constructor(id: number, category: string, type: boolean, user: UserModel) {
    super();
    this.id = id;
    this.category = category;
    this.type = type;
    this.user = user;
  }

  getTransactions(): TransactionEntity[] {
    return this.transactions;
  }

  setTransactions(transactions: TransactionEntity[]): void {
    this.transactions = transactions;
  }

  static fromEntity(entity: PurposeEntity): PurposeModel {
    const model = new PurposeModel(
      entity.id,
      entity.category,
      entity.type,
      UserModel.fromEntity(entity.user)
    );
    model.setTransactions(entity.transactions || []);
    return model;
  }

  static toEntity(model: PurposeModel): PurposeEntity {
    const entity = new PurposeEntity();
    entity.id = model.getId();
    entity.category = model.getCategory();
    entity.type = model.getType();
    entity.transactions = model.getTransactions();
    entity.user = UserModel.toEntity(model.getUser());
    return entity;
  }
}
