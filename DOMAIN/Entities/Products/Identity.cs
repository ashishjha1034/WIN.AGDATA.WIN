using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Products
{
    public class Identity
    {
        public string Name { get; private set; }
        public string Description { get; private set; }

        public Identity(string name, string description)
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
            if (string.IsNullOrWhiteSpace(name))
                throw new DomainException("Product name is required");

            if (name.Trim().Length < 2)
                throw new DomainException("Product name must be at least 2 characters");
        }

        private void ValidateDescription(string description)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new DomainException("Product description is required");

            if (description.Trim().Length < 10)
                throw new DomainException("Product description must be at least 10 characters");
        }

        public override bool Equals(object obj)
        {
            return obj is Identity identity &&
                   Name.Equals(identity.Name, StringComparison.OrdinalIgnoreCase);
        }

        public override int GetHashCode() => Name.ToLower().GetHashCode();
    }
}