const form = document.querySelector('form');
const tasksArr = [];

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const task = {};
  const random = Math.floor((Math.random() * 1000000000000) + 1);
  task['id'] = random;

  const formData = new FormData(event.target);
  formData.forEach((value, key) =>
    task[key] = value
  )
  addTask(task);
}

function addTask(task) {
  tasksArr.push(task);
  const newNote = createNote(task);
  addElements(task, newNote);
  addButtonDelete(newNote);
  saveTaskToLocalStorage(tasksArr);
  resetform();
}

function createNote(task) {
  const note = document.createElement('div');
  document.getElementById('containerNotes').appendChild(note);
  note.classList.add('note');
  note.id = task['id'];

  return note;
}

function addElements(task, note) {
  note.innerHTML = ` 
  <div class="contenTask">
    <span class="title">Task:</span>
    <span>${task.task}</span>
  </div>
  <div class="contenDateTime">
    <span class="dateTime">${task.date}</span>
    <span class="dateTime">${task.time}</span>
  </div>   
  `
}

function addButtonDelete(noteElement) {
  const btnDelete = document.createElement("BUTTON");
  btnDelete.classList.add("btn-close");
  btnDelete.aria_label = "close";
  btnDelete.addEventListener('click', closeNotes);
  noteElement.appendChild(btnDelete);
}

function closeNotes(event) {
  const removeNote = event.target.parentNode;
  removeItemLocalStorage(removeNote);
  removeNote.remove();  
}

function saveTaskToLocalStorage(tasksArr) {
  const stringTask = JSON.stringify(tasksArr);
  localStorage.setItem('arrNotes', stringTask);
}

function resetform() {
  document.getElementById('form').reset();
}

function removeItemLocalStorage(note) {
  const id = parseInt(note.id);
  const localStorageArr = JSON.parse(localStorage.getItem('arrNotes'));
  const removeIndex = localStorageArr.map(note => note.id).indexOf(id);

  if(removeIndex !== -1) {
    localStorageArr.splice(removeIndex, 1);
    localStorage.setItem('arrNotes',JSON.stringify(localStorageArr));
  }
}

