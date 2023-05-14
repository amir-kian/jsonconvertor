using System;

namespace JsonConverter.Models
{
    public class Furmula
    {
      public int Id { get;set;}
      public int VoucherTypeId {get;set;}
      public int OrderIndex {get;set;}
      public int SourceVoucherTypeId {get;set;}
      public int DebitCreditStatus {get;set;}
      public int AccountHeadId {get;set;}
      public string RowDescription {get;set;}
      public string Formula {get;set;}
      public string Conditions {get;set;}
      public string GroupBy {get;set;}
      public int OwnerRoleId {get;set;}
      public int CreatedById {get;set;}
      public string CreatedAt {get;set;}
      public int ModifiedById {get;set;}
      public string ModifiedAt {get;set;}
      public bool IsDeleted { get; set; }
    }
}
