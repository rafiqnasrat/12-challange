const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

const dbConn = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'Haya2022@#$',
    database : 'emp_db'
  });

  dbConn.connect(err => {
      if(err) throw err;
      console.log("Connection Was Successfull!");
      start();
  });





// START INQUIRER
  const start = ()=>{  
    inquirer
    .prompt([
        {
            type: "list",
            name: "start",
            message: "What would you like to do?",
            choices: ['View', 'Add', 'Update', 'Exit']
        }
    ])
    .then((answers) => {
        switch(answers.start)
        {
            case "View": view(); 
            break;

            case "Add": add();
            break;

            case "Update": update();
            break;

            case "Exit": exit();
            break;
            
            default: "Invalid Option";
        }
    })
  } 





  // START INQUIRER
  const view = ()=>{  
    inquirer
    .prompt([
        {
            type: "list",
            name: "start",
            message: "What would you like to explore?",
            choices: ['All Employee', 'Department', 'Role']
        }
    ])
    .then((answers) => {
        switch(answers.start)
        {
            case "All Employee": viewAllEmployees(); 
            break;

            case "Department": viewDepartments();
            break;

            case "Role": viewRole();
            break;
            default: "Invalid Option";
        }
    })
  } 



  // SELECT * FROM EMPLOYEES
  const viewAllEmployees = ()=>{
      dbConn.query("SELECT e.id AS ID, e.firstName AS First, e.lastName AS Last, e.role_id AS Role, r.salary AS Salary, m.lastName AS Mananger, d.name AS department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id", (err, results)=>{
          if(err) throw err;
          console.table(results);
          start();

      })
  }



//   SELECT BY DEPARTMENT
  const viewDepartments = ()=>
  {
    dbConn.query("SELECT * FROM department", (err, results)=>{
        // IF THERE IS ERROR
        if(err) throw err;


                // RUN DAYNAMIC INQUIRER
                inquirer
                .prompt([
                    {
                        type: "rawlist",
                        name: "choice",
                        message: "Select Department:",
                        choices: ()=>{
                            let array = [];
                            for(i=0; i<results.length; i++)
                            {
                                array.push(results[i].name);
                            }
                            return array;
                        }
                    }
                ])
                .then((answers) => {
                    dbConn.query("SELECT e.id AS ID, e.firstName AS First, e.lastName AS Last, e.role_id AS Role, r.salary AS Salary, m.lastName AS Mananger, d.name AS department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE d.name =?", [answers.choice] , (err, results)=>{
                        if(err) throw err;
                        console.table(results);
                        start();
                });
        
                
        
        
            });

  })
}






// SELECT BY ROLE
const viewRole = ()=>
{
  dbConn.query("SELECT * FROM role", (err, results)=>{
      // IF THERE IS ERROR
      if(err) throw err;


              // RUN DAYNAMIC INQUIRER
              inquirer
              .prompt([
                  {
                      type: "rawlist",
                      name: "choice",
                      message: "Select Role:",
                      choices: ()=>{
                          let array = [];
                          for(i=0; i<results.length; i++)
                          {
                              array.push(results[i].title);
                          }
                          return array;
                      }
                  }
              ])
              .then((answers) => {
                  dbConn.query("SELECT e.id AS ID, e.firstName AS First, e.lastName AS Last, e.role_id AS Role, r.salary AS Salary, m.lastName AS Mananger, d.name AS department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE r.title =?", [answers.choice] , (err, results)=>{
                      if(err) throw err;
                      console.table(results);
                      start();
              });
      
              
      
      
          });

})
}






// OPTIONS FOR ADDING NEW RECORDS
const add = ()=>{
    inquirer
    .prompt([
        {
            type: "list",
            name: "add",
            message: "What would you like to add?",
            choices: ['Add Department', 'Add Employee', 'Add Role']
        }
    ])
    .then((answers) => {
        switch(answers.add)
        {
            case "Add Department": addDepartment(); 
            break;

            case "Add Employee": addEmployee();
            break;

            case "Add Role": addRole();
            break;
            default: "Invalid Option";
        }
    })
}






// ADD DEPARTMENT
const addDepartment = ()=>{
    inquirer
    .prompt([
        {
            type: "input",
            name: "department",
            message: "Enter department name, please:",
        }
    ])
    .then((answers) => {
        dbConn.query("INSERT INTO department(name)VALUES(?)", [answers.department], (err, results)=>{
            if(err) throw err;

            console.log(answers.department + " Added Successfully!");
        })

        start();
    })
}




// ADD ROLE
const addRole = ()=>{
    inquirer
    .prompt([
        {
            type: "input",
            name: "role",
            message: "Enter role title, please:",
        },
        {
            type: "input",
            name: "salary",
            message: "Enter salary, please:",
        },
        {
            type: "input",
            name: "dep",
            message: "Enter department id, please:",
        }

    ])
    .then((answers) => {
        dbConn.query("INSERT INTO role SET ?", {
            title: answers.role,
            salary: answers.salary,
            department_id: answers.dep
        }, (err, results)=>{
            if(err) throw err;

            console.log(answers.role + " Added Successfully!");
        })

        start();
    })
}







// ADD EMPLOYEE
const addEmployee = ()=>{
    inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter first name, please:",
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter last name, please:",
        },        {
            type: "input",
            name: "role_id",
            message: "Enter role id, please:",
        },        {
            type: "input",
            name: "manager_id",
            message: "Enter manager id, please:",
        }

    ])
    .then((answers) => {
        dbConn.query("INSERT INTO employee SET ?", {
            firstName: answers.firstName,
            lastName: answers.lastName,
            role_id: answers.role_id,
            manager_id: answers.manager_id
        }, (err, results)=>{
            if(err) throw err;

            console.log("Employee added successfullywe");
        })

        start();
    })
}






// UPDATE
const update = ()=>
{
  dbConn.query("SELECT * FROM employee", (err, results)=>{
      // IF THERE IS ERROR
      if(err) throw err;
    console.log(results);

              // RUN DAYNAMIC INQUIRER
              inquirer
              .prompt([
                  {
                      type: "rawlist",
                      name: "choice",
                      message: "Select Employee:",
                      choices: ()=>{
                          let array = [];
                          for(i=0; i<results.length; i++)
                          {
                              array.push(results[i].lastName);
                          }
                          return array;
                      }
                  }
              ])
              .then((answers) => {
                  const empName = answers.choice;
                  
                  dbConn.query("SELECT * FROM employee", (err, results)=>{
                      if(err) throw err;

                      inquirer.prompt([
                          {
                              type: "rawlist",
                              name: "role",
                              message: "Select title",
                              choices: ()=>{
                                  let roleArray = [];
                                  for(i=0; i<results.length; i++)
                                  {
                                    roleArray.push(results[i].role_id);
                                  }
                                  return roleArray;
                              }
                          },
                          {
                              type: "number",
                              name: "manager",
                              message: "Enter manager id:",
                              default: "1"
                          }
                      ])
                      .then(function(answers){
                        dbConn.query("UPDATE employee SET ? WHERE lastName = ?",[{
                            role_id: answers.role,
                            manager_id: answers.manager
                        }, empName])

                        console.log("Updated");
                        start();
                      });
                  });
      
      
          });

})
}




// EXIT 
const exit = ()=>{
    console.log("ALL DONE");
}