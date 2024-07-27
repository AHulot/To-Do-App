// Function to create and add a new close button to a list item
function addCloseButton(li) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Add click event listener to the close button
  span.addEventListener('click',
  function() {
    li.remove();
    saveList(); // Save the updated list
  });
}

// Function to load the list from localStorage
function loadList() {
  const savedList = localStorage.getItem('todoList');
  let items;

  if (savedList) {
    const items = JSON.parse(savedList);
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;
        if (item.checked) {
          li.classList.add('checked');
        }
        addCloseButton(li);
        document.getElementById("myUL").appendChild(li);
    });
  } else {
    items = [{
      "text": "Create tasks using the input bar above! 👆",
      "checked": false
    },
    {
      "text": "Tasks can be marked as complete or incomplete by clicking on them! ✅❌",
      "checked": true
    }];

    localStorage.setItem('todoList', JSON.stringify(items));
    
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;
        if (item.checked) {
          li.classList.add('checked');
        }
        addCloseButton(li);
        document.getElementById("myUL").appendChild(li);
    });
  }
}

// Function to save the list to localStorage
function saveList() {
  const items = Array.from(document.querySelectorAll('#myUL li')).map(li => ({
    text: li.textContent.replace("\u00D7", "").trim(),
    // Remove the close button from text
    checked: li.classList.contains('checked')
  }));
  localStorage.setItem('todoList', JSON.stringify(items));
}

// Add event listener to the list for dynamically added items
document.getElementById('myUL').addEventListener('click',
function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    saveList(); // Save the updated list
  }
},
false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  const inputValue = document.getElementById("myInput").value.trim();

  if (event.key == "Enter") {
    if (inputValue === '') {
      alert("You must write something!");
      return;
    }

    const li = document.createElement("li");
    li.textContent = inputValue;
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";

    addCloseButton(li);
    saveList(); // Save the updated list
  }
}

// Load the list when the page loads
loadList();
