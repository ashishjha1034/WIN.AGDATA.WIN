using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Products
{
    public class ProductIdentity
    {
        public string Name { get; private set; }
        public string Description { get; private set; }

        public ProductIdentity(string name, string description)
        {
            ValidateName(name);
            ValidateDescription(description);

            Name = name.Trim();
            Description = description.Trim();
        }

        public void UpdateName(string name)
        {
            ValidateName(name);
            Name = name.Trim();
        }

        public void UpdateDescription(string description)
        {
            ValidateDescription(description);
            Description = description.Trim();
        }

        
        private void ValidateName(string name)
        {
            // Reuse ValidationGuards to validate and normalize the name
            Name = ValidationGuards.ValidateAndNormalizeName(name, "Product name", 2, 200);
        }

        private void ValidateDescription(string description)
        {
            
            Description = ValidationGuards.ValidateAndNormalizeDescription(description, 10, 2000);
        }


        public override bool Equals(object obj)
        {
            return obj is ProductIdentity identity &&
                   Name.Equals(identity.Name, StringComparison.OrdinalIgnoreCase);
        }

        public override int GetHashCode() => Name.ToLower().GetHashCode();
    }
}