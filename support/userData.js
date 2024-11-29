import { faker } from '@faker-js/faker';

export function generateRandomUser(prefix) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  const email = `${prefix}${faker.string.alphanumeric(5)}@example.com`;
  
  const password = generateValidPassword();
  
  return {
    firstName,
    lastName,
    email,
    password,
  };
}

export function generateValidPassword() {
  let password;
  
  do {
    password = faker.internet.password({
      length: faker.number.int({ min: 8, max: 15 }), 
      specialCharacters: true, 
    });
  } while (!isValidPassword(password));
  
  return password;
}

export function isValidPassword(password) {
  const hasUpperCase = /[A-Z]/.test(password); 
  const hasLowerCase = /[a-z]/.test(password); 
  const hasDigit = /\d/.test(password); 
  return hasUpperCase && hasLowerCase && hasDigit;
}