
using System;
using System.Collections.Generic;

namespace WIN.AGDATA.WIN.Domain.Common
{
    public abstract class Entity<TId>
    {
        public TId Id { get; protected set; } = default!;

        protected Entity() { }

        protected Entity(TId id)
        {
            if (Equals(id, default(TId)))
                throw new DomainException("Id is required.");
            Id = id;
        }

        public override bool Equals(object? obj)
        {
            if (obj is not Entity<TId> other) return false;
            if (ReferenceEquals(this, other)) return true;
            if (GetType() != other.GetType()) return false;
            return EqualityComparer<TId>.Default.Equals(Id, other.Id);
        }

        public override int GetHashCode() => EqualityComparer<TId>.Default.GetHashCode(Id);
    }
}
