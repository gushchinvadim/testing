import { validateCardNumber, getPaymentSystem } from '../cardValidator.js';

describe('Credit Card Validator', () => {
  // Тесты для валидации номера
  describe('validateCardNumber', () => {
    test('должен вернуть true для валидного номера карты', () => {
      // Валидные номера карт (проверены по алгоритму Луна)
      expect(validateCardNumber('4111111111111111')).toBe(true); // Visa
      expect(validateCardNumber('5555555555554444')).toBe(true); // MasterCard
      expect(validateCardNumber('501800000009')).toBe(true); // Maestro (12 цифр)
      expect(validateCardNumber('6200000000000005')).toBe(true); // UnionPay
      expect(validateCardNumber('2200000000000400')).toBe(true); // Mir
    });

    test('должен вернуть false для невалидного номера карты', () => {
      expect(validateCardNumber('4111111111111112')).toBe(false); // Неверный чек-сумма
      expect(validateCardNumber('1234')).toBe(false); // Слишком короткий
      expect(validateCardNumber('12345678901234567890')).toBe(false); // Слишком длинный
      expect(validateCardNumber('abc123')).toBe(false); // Не цифры
    });
  });

  // Тесты для определения платежной системы
  describe('getPaymentSystem', () => {
    // Visa
    test('должен определить Visa', () => {
      expect(getPaymentSystem('4111111111111111')).toBe('visa');
      expect(getPaymentSystem('4242424242424242')).toBe('visa');
    });

    // MasterCard
    test('должен определить MasterCard', () => {
      expect(getPaymentSystem('5555555555554444')).toBe('master');
      expect(getPaymentSystem('5200828282828210')).toBe('master');
    });

    // Maestro
    test('должен определить Maestro', () => {
      expect(getPaymentSystem('501800000009')).toBe('maestro'); // 12 цифр
      expect(getPaymentSystem('5018111111111111')).toBe('maestro'); // 16 цифр
      expect(getPaymentSystem('6304000000000000')).toBe('maestro');
    });

    // UnionPay
    test('должен определить UnionPay', () => {
      expect(getPaymentSystem('6200000000000005')).toBe('unionpay');
      expect(getPaymentSystem('6212345678901234')).toBe('unionpay');
    });

    // Mir
    test('должен определить Mir', () => {
      expect(getPaymentSystem('2200000000000400')).toBe('mir');
      expect(getPaymentSystem('2201310000000005')).toBe('mir');
    });

    test('должен вернуть null для неизвестной системы', () => {
      expect(getPaymentSystem('1234567890123456')).toBe(null);
    });
  });
});