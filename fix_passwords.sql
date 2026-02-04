-- Fix password hashes with correct BCrypt format
-- Password: Password@123

UPDATE Users 
SET PasswordHash = '$2a$11$6kybXtmlYxHZsQS0itXCZOcGImL2ydA0eaqY4.zvfmDZlmHXEIdAO'
WHERE Email LIKE '%@agdata.com';

SELECT TOP 1 Email, LEN(PasswordHash) as HashLen, PasswordHash FROM Users;
