export class VouchersDetail {
      Id: string;
      VoucherTypeId: string;
      OrderIndex: string;
      SourceVoucherTypeId: string;
      DebitCreditStatus: string;
      AccountHeadId: string;
      RowDescription: string;
      Formula: string;
      Conditions: string;
      GroupBy: string;
      OwnerRoleId: string;
      CreatedById: string;
      CreatedAt: Date;
      ModifiedById: string;
      ModifiedAt: Date;
      IsDeleted: boolean;
    constructor(
      Id: string = "0",
      VoucherTypeId: string = "0",
      OrderIndex: string = "0",
      SourceVoucherTypeId: string = "0",
      DebitCreditStatus: string = "0",
      AccountHeadId: string = "0",
      RowDescription: string = "0",
      Formula: string = "0",
      Conditions: string = "0",
      GroupBy: string = "0",
      OwnerRoleId: string = "0",
      CreatedById: string = "0",
      CreatedAt: Date = new Date(),
      ModifiedById: string = "0",
      ModifiedAt: Date = new Date(),
      IsDeleted: boolean= false

    ) {
      this.Id = Id;
      this.VoucherTypeId = VoucherTypeId;
      this.OrderIndex = OrderIndex;
      this.SourceVoucherTypeId = SourceVoucherTypeId;
      this.DebitCreditStatus = DebitCreditStatus;
      this.AccountHeadId = AccountHeadId;
      this.RowDescription = RowDescription;
      this.Formula = Formula;
      this.Conditions = Conditions;
      this.GroupBy = GroupBy;
      this.OwnerRoleId = OwnerRoleId;
      this.CreatedById = CreatedById;
      this.CreatedAt = CreatedAt;
      this.ModifiedById = ModifiedById;
      this.ModifiedAt = ModifiedAt;
      this.IsDeleted = IsDeleted;
    }
  }
  
  