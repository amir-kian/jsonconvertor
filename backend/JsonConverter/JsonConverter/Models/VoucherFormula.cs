namespace CodeVoucherGroups.Models
{
    public class VoucherFormula
    {
        public string Id { get; set; }
        public string VoucherTypeId { get; set; }
        public string OrderIndex { get; set; }
        public string SourceVoucherTypeId { get; set; }
        public string DebitCreditStatus { get; set; }
        public string AccountHeadId { get; set; }
        public string RowDescription { get; set; }
        public string Formula { get; set; }
        public string Conditions { get; set; }
        public string GroupBy { get; set; }
        public string OwnerRoleId { get; set; }
        public string CreatedById { get; set; }
        public string CreatedAt { get; set; }
        public string ModifiedById { get; set; }
        public string ModifiedAt { get; set; }
        public string IsDeleted { get; set; }
    }
}
