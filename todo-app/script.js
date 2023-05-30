let data;

const body = document.querySelector('body');
const icon = document.querySelector('#icon');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const unfinishedTasks = document.querySelector('.remaining');
const allBtn = document.querySelector('[data-all-button]'),
  activeBtn = document.querySelector('[data-active-button]'),
  completedBtn = document.querySelector('[data-completed-button]');
const clearBtn = document.querySelector('.clear');

const filter = document.querySelector('[data-filter]');
const filterMobile = document.querySelector('[data-filter-mobile]');

let reference;
let onstart;

const addEventListeners = () => {
  document.querySelectorAll('.task').forEach((draggable) => {
    draggable.addEventListener('dragstart', (e) => {
      reference = e.currentTarget.parentElement;
      onstart = e.clientY;
    });
  });

  document.querySelectorAll('.li-task').forEach((item) => {
    item.addEventListener('dragover', (e) => e.preventDefault());
    item.addEventListener('dragenter', (e) => {
      e.currentTarget.classList.add('drag');
      document.querySelectorAll('.li-task').forEach((element) => {
        if (e.currentTarget != element) element.classList.remove('drag');
      });
    });

    item.addEventListener('drop', (e) => {
     

      if (onstart - e.clientY > 0) {
        swapElements(reference, e.currentTarget, 'beforebegin');
      } else {
        swapElements(reference, e.currentTarget, 'afterend');
      }
      document.querySelectorAll('.li-task').forEach((element, index) => {
        element.setAttribute('data-index', index + 1);
        element.classList.remove('drag');
      });

      reference = '';
    });
  });
};

const swapElements = function (start, drop, place) {
  drop.insertAdjacentElement(place, start);
  Storage.update(true, undefined);
};

class Methods {
  static insertAllTasks() {
    this.clearTaskList();
    if (localStorage.getItem('todoapp') == null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem('todoapp'));
    }
    let check;
    let list = [];
    let filter = taskList.getAttribute('data-category');
    if (filter == undefined || filter == 'All') {
      list = data;
      check = false;
    } else {
      let c;
      c = filter == 'Active' ? 'false' : 'true';

      list = data.filter((d) => {
        if (d.completed == c) {
          return true;
        }
        check = true;
      });
    }
    this.updateRemainingCount();
    list.forEach((element) => {
      let li = document.createElement('li');
      li.setAttribute('data-completed', element.completed);
      li.setAttribute('data-index', element.index);
      li.classList.add('li-task');
      li.innerHTML = `<div class="circle-box"><div class="circle"><img src="images/icon-check.svg" /></div></div><div class="task" draggable="true" >${element.task}</div><img src="images/icon-cross.svg" alt="" class="cross" />`;
      li.addEventListener('click', (e) => {
        if (e.target.className != 'cross') {
          if (e.currentTarget.getAttribute('data-completed') == 'true') {
            e.currentTarget.setAttribute('data-completed', 'false');
            this.updateInData(
              e.currentTarget.getAttribute('data-index'),
              'false'
            );

            Storage.update(false, data);
            this.clearTaskList();
            this.insertAllTasks();
          } else {
            e.currentTarget.setAttribute('data-completed', 'true');
            this.updateInData(
              e.currentTarget.getAttribute('data-index'),
              'true'
            );
            Storage.update(false, data);
            this.clearTaskList();
            this.insertAllTasks();
          }
        } else {
          Methods.removeFromData(e.currentTarget.getAttribute('data-index'));
          data = Methods.sortData(data);
          Storage.update(false, data);
          Methods.updateIndexData();
          Methods.clearTaskList();
          Methods.insertAllTasks();
        }
        this.updateRemainingCount();
      });

      taskList.appendChild(li);
    });
    addEventListeners();
  }

  static addTask(value) {
    data.push({ index: data.length + 1, task: value, completed: 'false' });
    Storage.update(false, data);
    this.clearTaskList();
    this.insertAllTasks();
  }

  static sortData(data) {
    return data.sort((a, b) => a.index - b.index);
  } // Sorts data in data by indexes

  static updateIndexData() {
    let i = 1;
    data.forEach((d) => {
      d.index = i;
      i++;
    });
  } // Update indexes in data storage

  static updateInData(index, value) {
    let i = data.findIndex((e) => {
      if (e.index == index) {
        return true;
      }
    });

    data[i].completed = value;
  }

  static removeFromData(value) {
    let index = data.findIndex((e) => {
      if (e.index == value) {
        return true;
      }
    });
    data.splice(index, 1);
    data = Methods.sortData(data);
  } // removes from data storage by giving the object.index to remove

  static clearTaskList() {
    let allLIs = document.querySelectorAll('.li-task');
    allLIs.forEach((e) => e.remove());
  }

  static updateRemainingCount() {
    let i = 0;
    data.forEach((d) => {
      if (d.completed == 'false') {
        i++;
      }
    });
    if (i > 0) {
      taskList.removeAttribute('data-data');
      unfinishedTasks.innerText = `${i} tasks are pending`;
    } else if (i == 0) {
      if (data.length == 0) taskList.setAttribute('data-data', 'empty');
      unfinishedTasks.innerText = `No unfinished tasks`;
    }
  }
}

class Storage {
  static update(readFromNodes, dataVar) {
    if (readFromNodes) {
      data = [];
      document.querySelectorAll('.li-task').forEach((element) => {
        data.push({
          index: element.getAttribute('data-index'),
          task: element.childNodes[1].innerText,
          completed: element.getAttribute('data-completed'),
        });
      });

      Methods.updateIndexData();
      if (data != []) {
        localStorage.setItem('todoapp', JSON.stringify(data));
      } else {
        localStorage.setItem('todoapp', '[]');
      }
    } else {
      localStorage.setItem('todoapp', JSON.stringify(dataVar));
    }
  }
}
body.setAttribute('data-theme', localStorage.getItem('todoTheme'));
Methods.insertAllTasks();
Methods.updateRemainingCount();

icon.addEventListener('click', () => {
  if (localStorage.getItem('todoTheme') === undefined) {
    localStorage.setItem('todoTheme', 'dark');
  }
  let theme = localStorage.getItem('todoTheme');
  body.setAttribute('data-theme', theme);

  if (theme === 'dark') {
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('todoTheme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('todoTheme', 'dark');
  }
});

taskInput.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    if (taskInput.value == '') {
      return;
    } else {
      Methods.addTask(taskInput.value);
      taskInput.value = '';
    }
  }
});

filter.addEventListener('click', (e) => {
  if (
    e.target.innerText == 'All' ||
    e.target.innerText == 'Active' ||
    e.target.innerText == 'Completed'
  ) {
    allBtn.removeAttribute('data-state');
    activeBtn.removeAttribute('data-state');
    completedBtn.removeAttribute('data-state');
    e.target.setAttribute('data-state', 'active');
    taskList.setAttribute('data-category', e.target.innerText);

    Methods.insertAllTasks();
  }
});

filterMobile.addEventListener('click', (e) => {
  if (
    e.target.innerText == 'All' ||
    e.target.innerText == 'Active' ||
    e.target.innerText == 'Completed'
  ) {
    document.querySelectorAll('[data-filters-mobile]').forEach((element) => {
      element.removeAttribute('data-state');
    });
    e.target.setAttribute('data-state', 'active');
    taskList.setAttribute('data-category', e.target.innerText);

    Methods.insertAllTasks();
  }
});

clearBtn.addEventListener('click', (e) => {
  data = JSON.parse(localStorage.getItem('todoapp'));
  data = data.filter((e) => {
    if (e.completed == 'false') {
      return true;
    }
  });
  Storage.update(false, data);
  allBtn.removeAttribute('data-state');
  activeBtn.removeAttribute('data-state');
  completedBtn.removeAttribute('data-state');
  document.querySelectorAll('[data-filters-mobile]').forEach((element) => {
    element.removeAttribute('data-state');
  });
  allBtn.setAttribute('data-state', 'active');
  document
    .querySelectorAll('[data-filters-mobile]')[0]
    .setAttribute('data-state', 'active');

  taskList.setAttribute('data-category', 'All');
  Methods.insertAllTasks();
});
