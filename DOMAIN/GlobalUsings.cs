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
global using EventInfo = WIN.AGDATA.WIN.Domain.Entities.Events.EventInfo;
global using EventStatus = WIN.AGDATA.WIN.Domain.Entities.Events.EventStatus;
global using PrizeTier = WIN.AGDATA.WIN.Domain.Entities.Events.PrizeTier;
global using Winner = WIN.AGDATA.WIN.Domain.Entities.Events.Winner;
global using ProductIdentity = WIN.AGDATA.WIN.Domain.Entities.Products.ProductIdentity;
global using ProductPoints =  WIN.AGDATA.WIN.Domain.Entities.Products.ProductPoints;
global using ProductInventory = WIN.AGDATA.WIN.Domain.Entities.Products.ProductInventory;
global using RedemptionStatus = WIN.AGDATA.WIN.Domain.Entities.Redemptions.RedemptionStatus;
global using PointsTransaction = WIN.AGDATA.WIN.Domain.Entities.Transactions.PointsTransaction;
