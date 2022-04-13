//
require("colors");

//

const showMenu = () => {
  return new Promise((resolve) => {

    console.clear();
    console.log("=======================");
    console.log("Select option".green);
    console.log("=======================\n");

    console.log(`${"1".green} Create task`);
    console.log(`${"3".green} List task`);
    console.log(`${"4".green} List task complete`);
    console.log(`${"5".green} Complete task`);
    console.log(`${"6".red} Delete task`);
    console.log(`${"0".green} Quit \n`);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question("Please. Select a option:", (opt) => {
      readLine.close();
      resolve(opt)
    });
  });
};

const pause = () => {
    return new Promise(resolve => {

        const readLine = require("readline").createInterface({
          input: process.stdin,
          output: process.stdout,
        });
      
        readLine.question(
          ` \n Press the ${"Enter".green} key to continue: `,(opt) => {
            readLine.close();
            resolve();
          }
        );
        
    });
};
module.exports = {
  showMenu,
  pause,
};
