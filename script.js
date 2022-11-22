// selectors | Reference
var todoInput = document.querySelector(".todo-input");
var btn = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
const todoInputPriorities = document.querySelectorAll(".priority");

let arrayToDo = new Array;

const savedList = JSON.parse(localStorage.getItem('arrayToDo'));

if (Array.isArray(savedList)) {
  arrayToDo = savedList;
}

printArray();

//Event Handler
todoList.onclick = performAction;

var data;

function performAction(e) {
  var item = e.target;
  // console.log(item);

  if (item.classList[0] == "cmpltBtn") {
    // console.log("Cmplete Button pressed");
    var parent = item.parentElement;
    parent.classList.toggle("todo-done");//toggle is doing something here
  }
  if (item.classList[0] == "deleteBtn") {
    var parent = item.parentElement;
    // console.log(parent);
    parent.remove();
  }
}

function addTaskToArray() {
  data = todoInput.value;
  data = data.trim();
  if (data != "") {
    var priority = getSelected();
    if (data != "") {
      let task = { todo: data, p: priority };
      console.log(task);
      arrayToDo.push(task);
      createSortedArray();
      printArray();
    }
  } else {
    alert("Box can not be blank");
  }
}
function createSortedArray() {
  for (var i = 1; i < arrayToDo.length; i++) {
    var j = i;
    while (j > 0 && arrayToDo[j].p > arrayToDo[j - 1].p) {
      var temp = arrayToDo[j];
      arrayToDo[j] = arrayToDo[j - 1];
      arrayToDo[j - 1] = temp;
      j--;
    }
  }
  console.log(arrayToDo);
}

function getSelected() {
  let radioSelected = undefined;

  todoInputPriorities.forEach((todoInputPriorities) => {
    if (todoInputPriorities.checked) {
      radioSelected = todoInputPriorities.id;
    }
  });

  return radioSelected;
}

printArray();

function printArray() {
  todoList.innerHTML = '';
  var message = document.querySelector(".message");
  if (arrayToDo.length <= 0) {
    message.innerHTML = 'Nothing to do!';
  } else {
    message.innerHTML = '';
    for (var i = 0; i < arrayToDo.length; i++) {
      var newDiv = document.createElement("div");
      newDiv.classList.add("todo");

      if (arrayToDo[i].p == 3) {
        var pHeading = document.createElement("div");
        pHeading.classList.add("container");
        pHeading.classList.add("mostred");
        pHeading.innerHTML = "<h1>Most Priority<h1><hr>";
        newDiv.appendChild(pHeading);
      } else if (arrayToDo[i].p == 2) {
        var pHeading = document.createElement("div");
        pHeading.classList.add("container");
        pHeading.classList.add("mediumyellow");
        pHeading.innerHTML = "<h1>Medium Priority<h1><hr>";
        newDiv.appendChild(pHeading);
      } else if (arrayToDo[i].p == 1) {
        var pHeading = document.createElement("div");
        pHeading.classList.add("container");
        pHeading.innerHTML = "<h1>Least Priority<h1><hr>";
        newDiv.appendChild(pHeading);
      }

      var newLi = document.createElement("li");
      newLi.classList.add("todo-item");
      if (arrayToDo[i].p == 3) {
        newLi.classList.add("mostred");
      } else if (arrayToDo[i].p == 2) {
        newLi.classList.add("mediumyellow");
      }
      newLi.innerText = arrayToDo[i].todo;
      newDiv.appendChild(newLi);

      var cmpltBtn = document.createElement("button");
      cmpltBtn.classList.add("cmpltBtn");
      cmpltBtn.innerHTML = '<i class="fa fa-check " aria-hidden="true"></i>'//Tick Diaply
      newDiv.appendChild(cmpltBtn);

      var deleteBtn = document.createElement("button");
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.setAttribute("onclick", `deleteObj(${i})`);
      deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
      newDiv.appendChild(deleteBtn);

      todoList.appendChild(newDiv);
      todoInput.value = "";
    }

  }
  saveToStorage();
}

function deleteObj(id) {
  for (var i = 0; i < arrayToDo.length; i++) {
    if (id == i) {
      for (var j = i; j < arrayToDo.length - 1; j++) {
        arrayToDo[j] = arrayToDo[j + 1];
      }
    }
  }
  arrayToDo.pop();
  printArray();
}

function performAction(e) {
  var item = e.target;
  // console.log(item);

  if (item.classList[0] == "cmpltBtn") {
    // console.log("Cmplete Button pressed");
    var parent = item.parentElement;
    parent.classList.toggle("todo-done");//toggle is doing something here
  }
}

function saveToStorage() {
  localStorage.setItem('arrayToDo', JSON.stringify(arrayToDo));
}
