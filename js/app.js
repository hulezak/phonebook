// app.js
// Define a data structure to store contacts
var contacts = [];

// Get DOM elements
var searchInput = document.getElementById('searchInput');
var contactList = document.getElementById('contactList');
var nameInput = document.getElementById('nameInput');
var phoneInput = document.getElementById('phoneInput');
var emailInput = document.getElementById('emailInput');
var createButton = document.getElementById('createButton');

// Function to render the contact list
function renderContacts() {
  contactList.innerHTML = '';

  contacts.forEach(function(contact) {
    var item = document.createElement('li');
    item.className = 'contact-item';
    item.textContent = contact.name;

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      var newName = prompt('Enter the new name for the contact:', contact.name);
      if (newName) {
        contact.name = newName;
        renderContacts();
      }
    });

    item.appendChild(editButton);
    contactList.appendChild(item);
  });
}

// Function to filter contacts based on search query
function filterContacts(query) {
  var filteredContacts = contacts.filter(function(contact) {
    return contact.name.toLowerCase().includes(query.toLowerCase());
  });

  renderContacts(filteredContacts);
}

// Function to create a new contact
function createContact() {
  var name = nameInput.value.trim();
  var phone = phoneInput.value.trim();
  var email = emailInput.value.trim();

  if (name && phone && email) {
    var newContact = {
      name: name,
      phone: phone,
      email: email
    };

    contacts.push(newContact);
    renderContacts();

    // Clear input fields
    nameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
  }
}

// Event listener for search input
searchInput.addEventListener('input', function(event) {
  var searchQuery = event.target.value;
  filterContacts(searchQuery);
});

// Event listener for create button
createButton.addEventListener('click', createContact);