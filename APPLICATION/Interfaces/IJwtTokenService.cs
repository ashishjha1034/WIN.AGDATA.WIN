using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IJwtTokenService
{
    string GenerateToken(Domain.Entities.Users.User user);
}
