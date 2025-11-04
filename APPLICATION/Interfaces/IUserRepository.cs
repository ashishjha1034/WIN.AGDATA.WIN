using System;
using System.Collections.Generic;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IUserRepository
{
    User? GetById(Guid userId);
    User? GetByEmployeeId(string employeeId);
    List<User> GetAll();
    void Add(User user);
    void Update(User user);
    void Delete(Guid userId);
}
