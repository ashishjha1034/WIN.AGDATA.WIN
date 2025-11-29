// Core Framework
global using System;
global using System.Collections.Generic;
global using System.Linq;
global using System.Threading.Tasks;

// Entity Framework
global using Microsoft.EntityFrameworkCore;
global using Microsoft.EntityFrameworkCore.Metadata.Builders;

// Dependency Injection
global using Microsoft.Extensions.Configuration;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Logging;

// Domain & Application
global using WIN.AGDATA.WIN.Domain.Common;
global using WIN.AGDATA.WIN.Domain.Entities.Users;
global using WIN.AGDATA.WIN.Domain.Entities.Events;
global using WIN.AGDATA.WIN.Domain.Entities.Products;
global using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
global using WIN.AGDATA.WIN.Domain.Entities.Transactions;
global using WIN.AGDATA.WIN.Domain.Exceptions;
global using WIN.AGDATA.WIN.APPLICATION.Interfaces;
