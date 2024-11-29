import { test, expect } from '@playwright/test';
import BasePage from "../pageObjects/basePage";
import Registration from "../pageObjects/registrationPage";
import { generateRandomUser } from '../support/userData';

let basePage;
let registration;

test.describe('Registration form validation', () => {
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    const config = testInfo.project.use;

    basePage = new BasePage(page);
    registration = new Registration(page);

    await basePage.navigateToMainPageWithLogin(config.defaultCredentials);
    await registration.clickSignInButton();
    await registration.clickRegistrationButton();
  });

  test('Positive case: Create random user with Faker.js', async ({ page }) => {
  const randomUser = generateRandomUser('aqa');

  await registration.fillSignupName(randomUser.firstName);
  await registration.fillSignupLastName(randomUser.lastName);
  await registration.fillSignupEmail(randomUser.email);
  await registration.fillSignupPassword(randomUser.password);
  await registration.fillReenterPassword(randomUser.password);
  await registration.clickRegisterButton();
    
  await registration.verifyRedirectToGaragePage(page);
  await registration.verifyGaragePageElements(page);
});

  test.only('Name field: Empty name (error message and red borders)', async () => {
    await registration.fillSignupName('');
    await registration.signupLastName().click();
    await expect(registration.nameRequired()).toBeVisible();
    await expect(registration.nameRequired()).toContainText('Name required');
    await expect(registration.signupName()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

  test('Name field: Invalid name (error message and red borders)', async () => {
    await registration.fillSignupName('12345');
    await registration.signupLastName().click();
    await expect(registration.nameInvalid()).toBeVisible();
    await expect(registration.nameInvalid()).toContainText('Name is invalid');
    await expect(registration.signupName()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

  test('Name field: Name out of the length range (error message and red borders)', async () => {
    await registration.fillSignupName('A');
    await registration.signupLastName().click();
    await expect(registration.lengthNameRequired()).toBeVisible();
    await expect(registration.lengthNameRequired()).toContainText('Name has to be from 2 to 20 characters long');
    await expect(registration.signupName()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

  test('Last Name field: Empty Last name (error message and red borders)', async () => {
    await registration.fillSignupLastName('');
    await registration.signupEmail().click();
    await expect(registration.lastNameRequired()).toBeVisible();
    await expect(registration.lastNameRequired()).toContainText('Last name required');
    await expect(registration.signupLastName()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });
  
  test('Last Name field: Invalid Last name (error message and red borders)', async () => {
    await registration.fillSignupLastName('12345');
    await registration.signupEmail().click();
    await expect(registration.lastNameInvalid()).toBeVisible();
    await expect(registration.lastNameInvalid()).toContainText('Last name is invalid');
    await expect(registration.signupLastName()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

  test('Last Name field: Last Name out of the length range (error message and red borders)', async () => {
    await registration.fillSignupLastName('B');
    await registration.signupEmail().click();
    await expect(registration.lengthLastNameRequired()).toBeVisible();
    await expect(registration.lengthLastNameRequired()).toContainText('Last name has to be from 2 to 20 characters long');
    await expect(registration.signupLastName()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

  test('Check an error message if "Email" field is empty and red borders', async () => {
    await registration.fillSignupEmail('');
    await registration.signupLastName().click();
    await expect(registration.emailRequired()).toBeVisible();
    await expect(registration.emailRequired()).toContainText('Email required');
    await expect(registration.signupEmail()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

  test('Check an error message for invalid email input and red borders', async () => {
    await registration.fillSignupEmail('incorrect..email');
    await registration.signupLastName().click();
    await expect(registration.emailIncorrect()).toBeVisible();
    await expect(registration.emailIncorrect()).toContainText('Email is incorrect');
    await expect(registration.signupEmail()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

    test('Password field: Empty Password (error message and red borders)', async () => {
    await registration.fillSignupPassword('');
    await registration.signupLastName().click();
    await expect(registration.passwordRequired()).toBeVisible();
    await expect(registration.passwordRequired()).toContainText('Password required');
    await expect(registration.signupPassword()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

    test('Password field: Invalid Password (error message and red borders)', async () => {
    await registration.fillSignupPassword('incorrect.email');
    await registration.signupLastName().click();
    await expect(registration.passwordInvalid()).toBeVisible();
    await expect(registration.passwordInvalid()).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(registration.signupPassword()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

   test('Password field: Invalid Password Length - less 8 symbols (error message and red borders)', async () => {
    await registration.fillSignupPassword('i45');
    await registration.signupLastName().click();
    await expect(registration.passwordInvalid()).toBeVisible();
    await expect(registration.passwordInvalid()).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(registration.signupPassword()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  });

  test('Re-enter password field: Empty Re-enter password field (error message and red borders)', async () => {
    await registration.fillReenterPassword('');
    await registration.signupLastName().click();
    await expect(registration.reenterPasswordRequired()).toBeVisible();
    await expect(registration.reenterPasswordRequired()).toContainText('Re-enter password required');
    await expect(registration.signupRepeatPassword()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  }); 

  test('Re-enter password field: Invalid Re-enter password field (error message and red borders)', async () => {
    await registration.fillSignupPassword('Password123');
    await registration.fillReenterPassword('Password321');
    await registration.signupLastName().click();
    await expect(registration.reenterPasswordInvalid()).toBeVisible();
    await expect(registration.reenterPasswordInvalid()).toContainText('Passwords do not match');
    await expect(registration.signupRepeatPassword()).toHaveCSS('border-color', /rgb\(220, 53, 69\)/);
  }); 

  test('Check that "Register" button is disabled when one or more inputs are invalid', async () => {
    // Case 1: Invalid name
    await registration.fillSignupName('12345'); // Invalid name
    await registration.fillSignupLastName('Doe');
    await registration.fillSignupEmail('john.doe@example.com');
    await registration.fillSignupPassword('Password123');
    await registration.fillReenterPassword('Password123');
    await expect(registration.registerButton()).toBeDisabled();

    // Case 2: Invalid last name
    await registration.fillSignupName('John');
    await registration.fillSignupLastName('12345'); // Invalid last name
    await registration.fillSignupEmail('john.doe@example.com');
    await registration.fillSignupPassword('Password123');
    await registration.fillReenterPassword('Password123');
    await expect(registration.registerButton()).toBeDisabled();

    // Case 3: Invalid email
    await registration.fillSignupName('John');
    await registration.fillSignupLastName('Doe');
    await registration.fillSignupEmail('invalid-email'); // Invalid email
    await registration.fillSignupPassword('Password123');
    await registration.fillReenterPassword('Password123');
    await expect(registration.registerButton()).toBeDisabled();

    // Case 4: Invalid password
    await registration.fillSignupName('John');
    await registration.fillSignupLastName('Doe');
    await registration.fillSignupEmail('john.doe@example.com');
    await registration.fillSignupPassword('pass'); // Invalid password
    await registration.fillReenterPassword('pass');
    await expect(registration.registerButton()).toBeDisabled();

    // Case 5: Passwords do not match
    await registration.fillSignupName('John');
    await registration.fillSignupLastName('Doe');
    await registration.fillSignupEmail('john.doe@example.com');
    await registration.fillSignupPassword('Password123');
    await registration.fillReenterPassword('Password321'); // Passwords do not match
    await expect(registration.registerButton()).toBeDisabled();
  });
});
