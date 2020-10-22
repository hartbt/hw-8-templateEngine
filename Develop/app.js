const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var team = []
var id = []

function runBuilt(){

function engineer(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your engineers name?",
            name: "engName",
            validate: answer => {
                if(answer !== ""){
                    return true
                }
                return "Please enter your engineers name."
            }
        },{
            type: "input",
            message: "What is your engineers ID?",
            name: "engId",

            validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  if (id.includes(answer)) {
                    return "ID number is already in use.";
                  } else {
                    return true;
                  }
                              
                }
                return "Please use an integer greater than 0";
              }
            
        },{
            type: "input",
            message: "What is your engineers email?",
            name: "engEmail",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                )
                if(pass){
                    return true
                } 
                return "Please enter a valid email address."
            }
        },{
            type: "input",
            message: "What is your engineers GitHub?",
            name: "engGitHub",
            validate: answer => {
                if(answer !== ""){
                    return true
                }
                return "Please enter your engineers GitHub."
            }
        }
    ]).then(answers => {
        const engineer = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.engGitHub)
        team.push(engineer)
        id.push(answers.engId)
        makeTeam();
    })

}

function intern(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your interns name?",
            name: "intName",
            validate: answer => {
                if(answer !== ""){
                    return true
                }
                return "Please enter your interns name."
            }
        },{
            type: "input",
            message: "What is your interns ID?",
            name: "intId",
            validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  if (id.includes(answer)) {
                    return "ID number is already in use.";
                  } else {
                    return true;
                  }
                              
                }
                return "Please use an integer greater than 0";
              }
        },{
            type: "input",
            message: "What is your interns email?",
            name: "intEmail",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                )
                if(pass){
                    return true
                } 
                return "Please enter a valid email address."
            }
        },{
            type: "input",
            message: "What is your interns school?",
            name: "intSchool",
            validate: answer => {
                if(answer !== ""){
                    return true
                }
                return "Please enter your interns school."
            }
        }
    ]).then(answers => {
        const intern = new Intern(answers.intName, answers.intId, answers.intEmail, answers.intSchool)
        team.push(intern)
        id.push(answers.intId)
        makeTeam();
    })

}

function manager(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your managers name?",
            name: "manName",
            validate: answer => {
                if(answer !== ""){
                    return true
                }
                return "Please enter your managers name."
            }
        },{
            type: "input",
            message: "What is your managers ID?",
            name: "manId",
            validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  if (id.includes(answer)) {
                    return "ID number is already in use.";
                  } else {
                    return true;
                  }
                              
                }
                return "Please use an integer greater than 0";
              }
        },{
            type: "input",
            message: "What is your managers email?",
            name: "manEmail",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                )
                if(pass){
                    return true
                } 
                return "Please enter a valid email address."
            }
        },{
            type: "input",
            message: "What is your managers office number?",
            name: "manON",
            validate: answer => {
                if(answer !== ""){
                    return true
                }
                return "Please enter your managers office number."
            }
        }
    ]).then(answers => {
        const manager = new Manager(answers.manName, answers.manId, answers.manEmail, answers.manON)
        team.push(manager)
        id.push(answers.manId)
        makeTeam();
    })

}

function makeTeam(){
    inquirer.prompt([
        {
            type: "list",
            message: "Please select a role you would like to add",
            name: "roleAdd",
            choices: ["Manager", "Engineer", "Intern", "I am done adding roles"]
        }
    ]).then(hrChoice => {
        switch(hrChoice.roleAdd){
            case "Engineer": 
            engineer()
            break
            case "Intern": 
            intern()
            break
            case "Manager": 
            manager()
            break
            default: 
            generateTeam()
            
        }
    })
}

function generateTeam(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(team), "utf-8")
}
makeTeam()
}

runBuilt()
// Write code to use inquirer to gather information about the development team members,

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
