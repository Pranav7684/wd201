const todoList = () => {
    const all = [];
  
    const add = (todoItem) => {
      all.push(todoItem);
    };
  
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
      const today = new Date().toISOString().split("T")[0];
      return all.filter((it) => !it.completed && it.dueDate < today);
    };
  
    const dueToday = () => {
      const today = new Date().toISOString().split("T")[0];
      return all.filter((it) => it.dueDate === today);
    };
  
    const dueLater = () => {
      const today = new Date().toISOString().split("T")[0];
      return all.filter((it) => !it.completed && it.dueDate > today);
    };
  
    const toDisplayableList = (list) => {
      return list.map((it) => {
          const cb = it.completed ? "[x]" : "[ ]";
          const fd = it.dueDate !== new Date().toISOString().split("T")[0] ? " " + it.dueDate  : "";
          return `${cb} ${it.title}${fd}`;
        }).join("\n");
    };       

    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList,
    };
  };
  

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #


module.exports = todoList; 