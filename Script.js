// Global variable
var row;

function editRow() {
  // Get the row of the table that you want to edit
  row = event.target.parentElement.parentElement;

  // Get the product information from the row
  var name = row.children[0].innerHTML;
  var id = row.children[1].innerHTML;
  var price = row.children[2].innerHTML;
  var desc = row.children[3].innerHTML;

  // Set the value of the input fields to the product information
  document.getElementById('proname').value = name;
  document.getElementById('proid').value = id;
  document.getElementById('proprice').value = price;
  document.getElementById('prodesc').value = desc;

  // Change the add button to an update button
  document.getElementById('add').innerHTML = 'Update';

  // Add an onclick event handler to the update button
  document.getElementById('add').onclick = updateRow
}

function updateRow() {
  // Get the product information from the input fields
  var name = document.getElementById('proname').value.trim('');
  var id = document.getElementById('proid').value.trim('');
  var price = document.getElementById('proprice').value.trim('');
  var desc = document.getElementById('prodesc').value.trim('');

  // Update the product information in the row
  row.children[0].innerHTML = name;
  row.children[1].innerHTML = id;
  row.children[2].innerHTML = price;
  row.children[3].innerHTML = desc;
  // Update the product information in local storage
  var products = JSON.parse(localStorage.getItem('products')) || [];
  products.forEach(product => {
    if (product.id === id) {
      product.name = name;
      product.price = price;
      product.desc = desc;
    }
  });
  localStorage.setItem('products', JSON.stringify(products));

  // Change the update button back to an add button
  document.getElementById('add').innerHTML = 'Add';

  // Remove the onclick event handler from the update button
  document.getElementById('add').onclick = Add

  $('.proadd').val('');
}

function Add() {
  // Get the product information from the input fields
  var name = document.getElementById('proname').value;
  var id =   document.getElementById('proid').value;
  var price = document.getElementById('proprice').value;
  var desc = document.getElementById('prodesc').value;
  var products = JSON.parse(localStorage.getItem('products')) || [];
  products.push({ name, id, price, desc });
  localStorage.setItem('products', JSON.stringify(products));
if (name != "" && id != "" && price != "" && desc != ""){
  var Table = document.getElementById('table')

  var Tr = document.createElement('tr');
    var Td1 = document.createElement('td');
    Td1.innerHTML = name
    Tr.appendChild(Td1);

    var Td2 = document.createElement('td');
    Td2.innerHTML = id
    Tr.appendChild(Td2);

    var Td3 = document.createElement('td');
    Td3.innerHTML = price
    Tr.appendChild(Td3);

    var Td4 = document.createElement('td');
    Td4.innerHTML = desc
    Tr.appendChild(Td4);
    
    var Td5 = document.createElement('td');
    var edbut = document.createElement('button')
    edbut.onclick = editRow
    edbut.innerHTML = 'EDIT'
    Td5.appendChild(edbut)
    Tr.appendChild(Td5)
  
    var Td6 = document.createElement('td');
    var delbut = document.createElement('button')
    delbut.onclick = deleteRow
    delbut.innerHTML = 'DELETE'
    Td6.appendChild(delbut)
    Tr.appendChild(Td6)

  Table.appendChild(Tr)
  
  $('.proadd').val('');
}
else{
    alert('please fill it in')
}
}

  $('#proprice').focusout(function() {
    if (isNaN($(this).val())) {
      alert('Please type a number');
      $(this).val('');
    }
  });
  $('#proname').focusout(function() {
  if (!isNaN($(this).val())) {
    alert('Please type a word');
    $(this).val('');
  }
});
$('#prodesc').focusout(function() {
  if (!isNaN($(this).val())) {
    alert('Please type a word');
    $(this).val('');
  }
});

window.onload = function() {
  // Get the product information from local storage
  var products = JSON.parse(localStorage.getItem('products')) || [];

  // Populate the table with the product information
  var table = document.getElementById('table');
  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    var row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.id}</td>
      <td>${product.price}</td>
      <td>${product.desc}</td>
      <td><button onclick="editRow()">EDIT</button></td>
      <td><button onclick="deleteRow()">DELETE</button></td>
    `;

    table.appendChild(row);
  }
};
function deleteRow() {

  // Get the row of the table that you want to delete
  var row = event.target.parentElement.parentElement;
 
  var name = row.children[0].innerHTML;
  var id = row.children[1].innerHTML;

  // Remove the product information from local storage
  var products = JSON.parse(localStorage.getItem('products')) || [];
  products = products.filter(product => product.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
  // Ask the user if they are sure they want to delete the row
  var confirmation = confirm('Are you sure you want to delete this Product?');

  // If the user confirms, delete the row
  if (confirmation) {
    row.remove();
  }
}

