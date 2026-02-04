using BCrypt.Net;

var password = "Admin@123456";
var hash = BCrypt.HashPassword(password);
Console.WriteLine($"Password: {password}");
Console.WriteLine($"BCrypt Hash: {hash}");
