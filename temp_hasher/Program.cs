using BCrypt.Net;

var password1 = "Password@123";
var password2 = "Admin@123456";

var hash1 = BCrypt.Net.BCrypt.HashPassword(password1);
var hash2 = BCrypt.Net.BCrypt.HashPassword(password2);

Console.WriteLine($"Password: {password1}");
Console.WriteLine($"Hash: {hash1}");
Console.WriteLine();
Console.WriteLine($"Password: {password2}");
Console.WriteLine($"Hash: {hash2}");
