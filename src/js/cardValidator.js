/**
 * Проверка валидности номера карты по алгоритму Луна
 * @param {string} cardNumber - Номер карты
 * @returns {boolean} Валиден ли номер
 */
export function validateCardNumber(cardNumber) {
  // Удаляем все нецифровые символы
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  // Проверяем длину (12-19 цифр)
  if (cleanNumber.length < 12 || cleanNumber.length > 19) {
    return false;
  }
  
  // Проверяем, что все символы цифры
  if (!/^\d+$/.test(cleanNumber)) {
    return false;
  }
  
  // Проверяем алгоритм Луна
  return isLuhnValid(cleanNumber);
}

/**
 * Алгоритм Луна (Luhn)
 * @param {string} cardNumber - Очищенный номер карты
 * @returns {boolean} Валиден ли номер
 */
function isLuhnValid(cardNumber) {
  let sum = 0;
  let shouldDouble = false;
  
  // Проходим с конца к началу
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    
    // Удваиваем каждую вторую цифру
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9; // Если результат > 9, вычитаем 9
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  // Проверяем, что сумма кратна 10
  return sum % 10 === 0;
}

/**
 * Определение платежной системы по номеру карты
 * @param {string} cardNumber - Номер карты
 * @returns {string|null} Название платежной системы или null
 */
export function getPaymentSystem(cardNumber) {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  if (cleanNumber.length === 0) {
    return null;
  }
  
  // Visa (начинается с 4, длина 13-16)
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cleanNumber)) {
    return 'visa';
  }
  
  // MasterCard (51-55 или 2221-2720, длина 16)
  if (/^5[1-5][0-9]{14}$/.test(cleanNumber) || 
      /^2(22[1-9]|2[3-9][0-9]|3[0-9]{2}|[4-9][0-9]{2})[0-9]{12}$/.test(cleanNumber)) {
    return 'master';
  }
  
  // Maestro (50, 56-58, 6300-6399, 6700-6799, длина 12-19)
  if (/^5[0678][0-9]{10,17}$/.test(cleanNumber) || 
      /^6[37][0-9]{10,17}$/.test(cleanNumber)) {
    return 'maestro';
  }
  
  // UnionPay (62, длина 16-19)
  if (/^62[0-9]{14,17}$/.test(cleanNumber)) {
    return 'unionpay';
  }
  
  // Mir (2200-2204, длина 16)
  if (/^220[0-4][0-9]{12}$/.test(cleanNumber)) {
    return 'mir';
  }
  
  return null;
}