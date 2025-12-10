// Core Framework
global using System;
global using System.Collections.Generic;
global using System.Linq;
global using System.Threading.Tasks;
global using System.Security.Claims;

// ASP.NET Core
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Authorization;

// Dependency Injection
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Logging;

// Application & Domain
global using WIN.AGDATA.WIN.APPLICATION.Commands;
global using WIN.AGDATA.WIN.APPLICATION.Commands.Admin;
global using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
global using WIN.AGDATA.WIN.APPLICATION.Commands.Products;
global using WIN.AGDATA.WIN.APPLICATION.Commands.Redemptions;
global using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
global using WIN.AGDATA.WIN.APPLICATION.DTOs.Admin;
global using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
global using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
global using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
global using WIN.AGDATA.WIN.APPLICATION.DTOs.Transactions;
global using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
global using WIN.AGDATA.WIN.APPLICATION.Interfaces;
global using WIN.AGDATA.WIN.Domain.Entities.Users;
global using WIN.AGDATA.WIN.Domain.Entities.Events;
global using WIN.AGDATA.WIN.Domain.Entities.Products;
global using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
global using WIN.AGDATA.WIN.Domain.Enums;
global using WIN.AGDATA.WIN.Domain.Exceptions;
global using MediatR;
global using AutoMapper;
