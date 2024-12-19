export default class GaragePage {
  constructor(page) {
    this.page = page;

    this.locators = {
      addCarButton: this.page.locator('button', { hasText: 'Add car' }),
      carBrandDropdown: this.page.locator('select#addCarBrand'),
      carModelDropdown: this.page.locator('select#addCarModel'),
      addCarMileage: this.page.locator('input#addCarMileage'),
      addButton: this.page.locator('button', { hasText: /^Add$/ }),
      mileageRequiredMessage: this.page.locator('p', { hasText: 'Mileage cost required' }),
      carList: this.page.locator('.car-list'),
    };

    this.brandOptions = ['Audi', 'BMW', 'Ford', 'Porsche', 'Fiat'];

    this.modelOptions = {
      Audi: ['TT', 'R8', 'Q7', 'A6', 'A8'],
      BMW: ['3', '5', 'X5', 'X6', 'Z3'],
      Ford: ['Fiesta', 'Focus', 'Fusion', 'Mondeo', 'Sierra'],
      Porsche: ['Cayenne', '911', 'Panamera'],
      Fiat: ['Palio', 'Ducato', 'Panda', 'Punto', 'Scudo'],
    };
  }

  async verifyCarBrandInList(brand) {
    await this.locators.carList.containsText(brand);
  }

  async verifyCarModelInList(model) {
    await this.locators.carList.containsText(model);
  }

  async selectRandomOption(dropdown, options) {
    const randomOption = options[Math.floor(Math.random() * options.length)];
    await dropdown.selectOption({ label: randomOption });
    return randomOption;
  }

  async addCar(mileage) {
    const randomBrand = await this.selectRandomOption(this.locators.carBrandDropdown, this.brandOptions);
    const randomModel = await this.selectRandomOption(this.locators.carModelDropdown, this.modelOptions[randomBrand]);
    await this.locators.addCarMileage.fill(mileage);
    await this.locators.addButton.click();
    return { brand: randomBrand, model: randomModel, mileage };
  }
}
