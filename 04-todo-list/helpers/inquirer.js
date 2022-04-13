const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "What do you need to do?",
    choices: [
      { value: "1", name: `${"1.".green} Create a task` },
      { value: "2", name: `${"2.".green} List tasks ` },
      { value: "3", name: `${"3.".green} List task completed` },
      { value: "4", name: `${"4.".green} Complete pending` },
      { value: "5", name: `${"5.".green} Complete a task( or tasks)` },
      { value: "6", name: `${"6.".green} Delete a task` },
      { value: "0", name: `${"7.".green} Quit` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=======================");
  console.log("Select option".white);
  console.log("=======================\n");

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press the ${"Enter".green} key to continue: `,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please introduce a value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const deleteTaskList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });
  //add a new option at the beginning
  choices.unshift({
    value: "0",
    name: "0.".red + " Cancel",
  });

  const questions = [
    {
      type: "list",
      name: "task",
      message: "Delete",
      choices,
    },
  ];

  const { task } = await inquirer.prompt(questions);

  return task;
};
const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.compleadoEn ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);

  return ids;
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  confirm,
  showCheckList

};
