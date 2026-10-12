import { Page, Locator } from '@playwright/test';

export class StudentPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly classroom: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#email');
    this.classroom = page.locator('#classroom');
  }

  async goto() {
    await this.page.goto('/');
  }

  async createStudent(
    firstName: string,
    lastName: string,
    email: string,
    classroom: string
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.classroom.fill(classroom);

    await this.page
      .getByRole('button', { name: 'Créer l’étudiant' })
      .click();
  }
  
  async refreshStudentList() {
  await this.page.getByRole('button', {
    name: 'Actualiser'
  }).click();
}

async getStudentByEmail(email: string) {
  return this.page.locator('table').getByText(email);
}
  
  
}