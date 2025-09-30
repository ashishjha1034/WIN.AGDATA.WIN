using WIN.AGDATA.WIN.Domain.Exceptions;


namespace Domain.Entities.Users
{
    public class User
    {
        public Identity Identity { get; }
        public Status Status { get; }
        public Points Points { get; }

        public User(string employeeId, string email, string firstName, string lastName)
        {
            Identity = new Identity(employeeId, email, firstName, lastName);
            Status = new Status();
            Points = new Points();
        }

        // Simple delegation
        public void AddPoints(int points, string reason) => Points.Add(points);
        public void DeductPoints(int points, string reason) => Points.Deduct(points);
        public void UpdateEmail(string newEmail) => Identity.UpdateEmail(newEmail);
        public void Deactivate() => Status.Deactivate();
        public void Reactivate() => Status.Reactivate();

        public bool CanRedeem(int requiredPoints)
            => Status.IsActive && Points.Balance >= requiredPoints;
    }
}