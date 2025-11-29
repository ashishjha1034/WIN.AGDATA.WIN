// Core Framework
global using System;
global using System.Collections.Generic;
global using System.ComponentModel.DataAnnotations;
global using System.Linq;
global using System.Text.RegularExpressions;

// Domain Layer
global using WIN.AGDATA.WIN.Domain.Common;
global using WIN.AGDATA.WIN.Domain.Exceptions;
global using WIN.AGDATA.WIN.Domain.ValueObjects;
global using WIN.AGDATA.WIN.Domain.Entities.Users;
global using WIN.AGDATA.WIN.Domain.Entities.Events;
global using WIN.AGDATA.WIN.Domain.Entities.Products;
global using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
global using WIN.AGDATA.WIN.Domain.Entities.Transactions;
global using WIN.AGDATA.WIN.Domain.Enums;

// Namespace Aliases for Long Declarations
global using EventStatus = WIN.AGDATA.WIN.Domain.Enums.EventStatus;
global using PrizeTier = WIN.AGDATA.WIN.Domain.Entities.Events.PrizeTier;
global using ProductPoints =  WIN.AGDATA.WIN.Domain.Entities.Products;
//global using ProductInventory = WIN.AGDATA.WIN.Domain.Entities.Products.;
global using RedemptionStatus = WIN.AGDATA.WIN.Domain.Enums.RedemptionStatus;
global using PointsTransaction = WIN.AGDATA.WIN.Domain.Entities.Transactions.UserPointsTransaction;
