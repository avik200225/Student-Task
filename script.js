document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
  
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(taskForm);
      const taskData = Object.fromEntries(formData.entries());
  
      try {
        const response = await fetch('/courses/' + taskData.courseId + '/tasks');
        const tasks = await response.json();
  
        renderTasks(tasks);
      } catch (error) {
        console.error('Error retrieving tasks:', error.message);
      }
    });
  
    const renderTasks = (tasks) => {
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
          <h3>${task.taskName}</h3>
          <p><strong>Due Date:</strong> ${task.dueDate}</p>
          <p><strong>Additional Details:</strong> ${task.additionalDetails}</p>
        `;
        taskList.appendChild(taskElement);
      });
    };
  });
  