//
require("colors");
const inquirer = require("inquirer");
//
//const { showMenu, pause2 } = require("./helpers/messages");
const { saveDB, readDB } = require("./helpers/guardar");
const {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  confirm,
  showCheckList
} = require("./helpers/inquirer");
const Tasks = require("./models/Tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const taskDB = readDB();
  if (taskDB) {
    tasks.loadTasksFromArray(taskDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Desciption: ");
        tasks.createTask(desc);
        break;
      case "2":
        tasks.listCompleted();
        break;
      case "3":
        tasks.listPendingTask();
        break;
      case "4":
        tasks.listPendingTask(false);
        break;
      case "5":
        const ids = await showCheckList(tasks.listArr);
        tasks.toggleCompletes( ids);
        // console.log({ids});
        break;
      case "6":
        const id = await deleteTaskList(tasks.listArr);
        if( id !== '0'){
          const ok = await confirm("Are you sure?");

          if (ok) {
            tasks.deleteTask(id);
            console.log("Task deleted!");
          }
          console.log({ ok });
        }
        break;
      default:
        break;
    }

    saveDB(tasks.listArr);

    await pause();
  } while (opt !== "0");
};

main();
