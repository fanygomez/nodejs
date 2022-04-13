const Task = require("./Task");

class Tasks{

    _taskList = {};
    constructor(){
        this._taskList = {};
    }

    get listArr(){
        const list = [];
        Object.keys(this._taskList).forEach( key => {
            list.push(this._taskList[key]);
        })
    
        return list;
    }

    createTask(desc =''){
        const task = new Task(desc);
        this._taskList[task.id] = task;
    }

    loadTasksFromArray( tasks = [] ){
        tasks.forEach(task => { this._taskList[task.id] = task});
    }

    listCompleted(){
        
        this.listArr.forEach((task, i) =>{
            const id = `${ i+1}.`.green;
           // const {desc, compleadoEn} = task;
            const status = (task.compleadoEn)? 'Done'.green : ' Pending'.red
            console.log(id + task.desc + ' ::: ' + status);

        });
    }

    listPendingTask( completedTask = true){
        let index = 0;
        this.listArr.forEach((task, i) =>{
            
            const {desc, compleadoEn} = task;
            const status = (task.compleadoEn)? 'Done'.green : ' Pending'.red
            if (completedTask) {
                
                if(compleadoEn){
                    index+=1;
                    console.log(`${ index}.`.green + desc + ' ::: ' + compleadoEn);
                }
            }else{
                if (!compleadoEn) {
                    index+=1;
                    console.log(`${ index}.`.green + desc + ' ::: ' + status);
                }
            }

        });
    }
    

    deleteTask(id = ''){
        if( this._taskList[id]){
            delete this._taskList[id];
        }
    }

    toggleCompletes(ids = []){
        
        ids.forEach(id => {
            const task = this._taskList[id];
            if (! task.compleadoEn ){
                task.compleadoEn = new Date().toISOString();
            }
        });

        this.listArr.forEach(task => {
            if( !ids.includes(task.id)){
                this._taskList[task.id].compleadoEn = null;
            }
        });
    }
}

module.exports = Tasks;