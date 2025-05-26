// Load notes on page load
window.onload = function () {
    showNotes();
};

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText === '') {
        alert('Please write something!');
        return;
    }

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.unshift({text: noteText, completed: false});
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';
    showNotes();
}

function showNotes() {
  const notesContainer = document.getElementById('notesContainer');
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  
  notesContainer.innerHTML = '';

  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.innerHTML = `
      <input type="checkbox" ${note.completed ? 'checked' : ''} onchange="toggleNoteCompletion(${index})">
      <p style="${note.completed ? 'text-decoration: line-through' : ''}">${note.text}</p>
      <button class="delete-btn" onclick="deleteNote(${index})"><h5>X</h5></button>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

function toggleNoteCompletion(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[index].completed = !notes[index].completed;
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}