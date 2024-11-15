document.addEventListener('DOMContentLoaded', function () {
    // Selectors for tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
  
    // Data arrays for each tab
    let dataArray1 = JSON.parse(localStorage.getItem('dataArray1')) || [];
    let dataArray2 = JSON.parse(localStorage.getItem('dataArray2')) || [];
    let dataArray3 = JSON.parse(localStorage.getItem('dataArray3')) || [];
    let dataArray4 = JSON.parse(localStorage.getItem('dataArray4')) || []; // Додаємо масив для 4-го табу
  
    // Selectors for each tab's form and table
    const form1 = document.getElementById('form1');
    const dataTableBody1 = document.getElementById('data-table-body-1');
    const totalPriceElement1 = document.getElementById('total-price-1');
    const clearButton1 = document.getElementById('clear-all-1');
    const applyFilterButton1 = document.getElementById('apply-filter');
    const startDateInput1 = document.getElementById('start-date');
    const endDateInput1 = document.getElementById('end-date');
  
    const form2 = document.getElementById('form2');
    const dataTableBody2 = document.getElementById('data-table-body-2');
    const totalPriceElement2 = document.getElementById('total-price-2');
    const clearButton2 = document.getElementById('clear-all-2');
    const applyFilterButton2 = document.getElementById('apply-filter2');
    const startDateInput2 = document.getElementById('start-date2');
    const endDateInput2 = document.getElementById('end-date2');
  
    const form3 = document.getElementById('form3');
    const dataTableBody3 = document.getElementById('data-table-body-3');
    const totalPriceElement3 = document.getElementById('total-price-3');
    const clearButton3 = document.getElementById('clear-all-3');
    const applyFilterButton3 = document.getElementById('apply-filter3');
    const startDateInput3 = document.getElementById('start-date3');
    const endDateInput3 = document.getElementById('end-date3');

    const form4 = document.getElementById('form4'); // Додаємо форму для 4-го табу
    const dataTableBody4 = document.getElementById('data-table-body-4'); // Додаємо таблицю для 4-го табу
    const totalPriceElement4 = document.getElementById('total-price-4'); // Додаємо елемент для підсумкової ціни
    const clearButton4 = document.getElementById('clear-all-4'); // Кнопка очищення для 4-го табу
    const applyFilterButton4 = document.getElementById('apply-filter4'); // Кнопка фільтрації для 4-го табу
    const startDateInput4 = document.getElementById('start-date4'); // Вхід для початкової дати для 4-го табу
    const endDateInput4 = document.getElementById('end-date4'); // Вхід для кінцевої дати для 4-го табу

    const totalPriceAll = document.getElementById('total-price-all'); // Загальна сума
  
    // Handle tab switching
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
      });
    });
  
    // Function to handle form submission
    function handleFormSubmission(form, dataArray, dataTableBody, totalPriceElement, storageKey) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const date = form.querySelector('[name="date"]').value;
        const time = form.querySelector('[name="time"]').value;
        const name = form.querySelector('[name="name"]').value;
        const price = parseFloat(form.querySelector('[name="price"]').value);
  
        if (!date || !time || !name || !price) return;
  
        const newEntry = { date, time, name, price };
        dataArray.push(newEntry);
  
        // Save data to localStorage
        localStorage.setItem(storageKey, JSON.stringify(dataArray));
  
        // Clear form
        form.reset();
  
        // Render the table
        renderTable(dataArray, dataTableBody, totalPriceElement);
        updateTotalPrice(); // Оновлюємо загальну суму після кожного додавання
      });
    }
  
    // Function to render table
    function renderTable(dataArray, dataTableBody, totalPriceElement) {
      dataTableBody.innerHTML = '';
      let totalPrice = 0;
  
      dataArray.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${entry.date}</td>
          <td>${entry.time}</td>
          <td>${entry.name}</td>
          <td>${entry.price}</td>
        `;
        dataTableBody.appendChild(row);
        totalPrice += entry.price;
      });
  
      totalPriceElement.textContent = totalPrice.toFixed(2);
    }
  
    // Function to filter data based on date range
    function filterDataByDate(dataArray, startDate, endDate) {
      return dataArray.filter(entry => {
        const entryDate = new Date(entry.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || entryDate >= start) && (!end || entryDate <= end);
      });
    }
  
    // Function to update the total price for all tabs
    function updateTotalPrice() {
      const totalPrice1 = calculateTotalPrice(dataArray1);
      const totalPrice2 = calculateTotalPrice(dataArray2);
      const totalPrice3 = calculateTotalPrice(dataArray3);
      const totalPrice4 = calculateTotalPrice(dataArray4); // Додаємо для 4-го табу
  
      const totalPrice = totalPrice1 + totalPrice2 + totalPrice3 + totalPrice4;
      totalPriceAll.textContent = totalPrice.toFixed(2);
    }
  
    // Function to calculate the total price of an array of data
    function calculateTotalPrice(dataArray) {
      return dataArray.reduce((sum, entry) => sum + entry.price, 0);
    }
  
    // Function to clear data
    function clearData(dataArray, storageKey, dataTableBody, totalPriceElement) {
      dataArray.length = 0;
      localStorage.removeItem(storageKey);
      renderTable(dataArray, dataTableBody, totalPriceElement);
      updateTotalPrice(); // Оновлюємо загальну суму після очищення
    }
  
    // Apply filters for Tab 1
    applyFilterButton1.addEventListener('click', function () {
      const startDate = startDateInput1.value;
      const endDate = endDateInput1.value;
      const filteredData = filterDataByDate(dataArray1, startDate, endDate);
      renderTable(filteredData, dataTableBody1, totalPriceElement1);
      updateTotalPrice(); // Оновлюємо загальну суму після фільтрації
    });
  
    // Apply filters for Tab 2
    applyFilterButton2.addEventListener('click', function () {
      const startDate = startDateInput2.value;
      const endDate = endDateInput2.value;
      const filteredData = filterDataByDate(dataArray2, startDate, endDate);
      renderTable(filteredData, dataTableBody2, totalPriceElement2);
      updateTotalPrice(); // Оновлюємо загальну суму після фільтрації
    });
  
    // Apply filters for Tab 3
    applyFilterButton3.addEventListener('click', function () {
      const startDate = startDateInput3.value;
      const endDate = endDateInput3.value;
      const filteredData = filterDataByDate(dataArray3, startDate, endDate);
      renderTable(filteredData, dataTableBody3, totalPriceElement3);
      updateTotalPrice(); // Оновлюємо загальну суму після фільтрації
    });

    // Apply filters for Tab 4
    applyFilterButton4.addEventListener('click', function () {
      const startDate = startDateInput4.value;
      const endDate = endDateInput4.value;
      const filteredData = filterDataByDate(dataArray4, startDate, endDate);
      renderTable(filteredData, dataTableBody4, totalPriceElement4);
      updateTotalPrice(); // Оновлюємо загальну суму після фільтрації
    });

    // Initialize the forms and tables for each tab
    handleFormSubmission(form1, dataArray1, dataTableBody1, totalPriceElement1, 'dataArray1');
    handleFormSubmission(form2, dataArray2, dataTableBody2, totalPriceElement2, 'dataArray2');
    handleFormSubmission(form3, dataArray3, dataTableBody3, totalPriceElement3, 'dataArray3');
    handleFormSubmission(form4, dataArray4, dataTableBody4, totalPriceElement4, 'dataArray4'); // Додаємо для 4-го табу
  
    clearButton1.addEventListener('click', function () {
      clearData(dataArray1, 'dataArray1', dataTableBody1, totalPriceElement1);
    });
  
    clearButton2.addEventListener('click', function () {
      clearData(dataArray2, 'dataArray2', dataTableBody2, totalPriceElement2);
    });
  
    clearButton3.addEventListener('click', function () {
      clearData(dataArray3, 'dataArray3', dataTableBody3, totalPriceElement3);
    });

    clearButton4.addEventListener('click', function () { // Додаємо очищення для 4-го табу
      clearData(dataArray4, 'dataArray4', dataTableBody4, totalPriceElement4);
    });
  
    // Initial render
    renderTable(dataArray1, dataTableBody1, totalPriceElement1);
    renderTable(dataArray2, dataTableBody2, totalPriceElement2);
    renderTable(dataArray3, dataTableBody3, totalPriceElement3);
    renderTable(dataArray4, dataTableBody4, totalPriceElement4); // Додаємо рендер для 4-го табу
  
    // Update the total price for all tabs
    updateTotalPrice();
});
