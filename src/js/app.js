import { validateCardNumber, getPaymentSystem } from './cardValidator.js';

document.addEventListener('DOMContentLoaded', () => {
  const cardInput = document.getElementById('card-number');
  const validateButton = document.getElementById('validate-button');
  const resultMessage = document.getElementById('result-message');
  const paymentSystemIcons = document.querySelectorAll('.payment-system-icon');
  
  // Обновляем иконку платежной системы при вводе
  cardInput.addEventListener('input', () => {
    const cardNumber = cardInput.value;
    const paymentSystem = getPaymentSystem(cardNumber);
    
    // Скрываем все иконки
    paymentSystemIcons.forEach(icon => {
      icon.style.display = 'none';
    });
    
    // Показываем соответствующую иконку
    if (paymentSystem) {
      document.getElementById(paymentSystem).style.display = 'inline-block';
    }
  });
  
  // Обработчик проверки
  validateButton.addEventListener('click', () => {
    const cardNumber = cardInput.value;
    const isValid = validateCardNumber(cardNumber);
    const paymentSystem = getPaymentSystem(cardNumber);
    
    if (!isValid) {
      resultMessage.textContent = 'Неверный номер карты';
      resultMessage.style.color = 'red';
    } else if (!paymentSystem) {
      resultMessage.textContent = 'Неверная платежная система';
      resultMessage.style.color = 'red';
    } else {
      resultMessage.textContent = `Валидный номер карты для системы: ${paymentSystem}`;
      resultMessage.style.color = 'green';
    }
  });
});