// Pricing
import Currency from "./3-currency.js";
export default class Pricing {
  constructor (amount, currency){
    this._amount = amount;
    this._currency = Currency;
  }
  get ammount() {
    return this._amount;
  }

  set amount(value) {
    if (typeof value !== 'number') {
        throw new TypeError('Amount must be a number');
    }
    this._amount = value;
  }

  get currency() {
    return this._currency;
  }

  set currency(value) {
    if (typeof value !== 'string') {
        throw new TypeError('Currency must be a string');
    }
    this._currency = value
  }

  displayFullPrice() {
    return `${this.amount} ${this.currency.displayFullCurrency()}`;
  }

  static convertPrice(amount, conversionRate) {
    if (typeof amount !== 'number' || typeof conversionRate !== 'number') {
      throw new TypeError('Amount an conversionRate must be numbers');
    }
    return amount * conversionRate;
  }
}
