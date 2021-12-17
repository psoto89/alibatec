fs = require('fs');
const path = require ('path');
const { uuid } = require('uuidv4');

const userFilepath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(userFilepath, 'utf-8'))

const User = {

    getData: function (){ 
        return users;
    },

    writeFile(contents){
        let fileContents = JSON.stringify(contents, null, " ");
        fs.writeFileSync(userFilepath, fileContents)
    },
    
    
    findByPK: function (id) {
        let allUser = this.getData(); 
        let userFound = allUser.find (oneUser => oneUser.id=== id); 
        return userFound; 
    },
    findByField: function (field, text){
        let allUser = this.getData();
        let userFound = allUser.find(oneUser => oneUser[field] === text);
        return userFound;
    },
    create: function (userData) {
        let allUser = this.getData(); 
        let newUser = {
            id: uuid(),
            ... userData
        }
        allUser.push (newUser) 
        fs.writeFileSync(userFilepath, JSON.stringify (allUser, null, ' ')); 
        return newUser; 
    },
    delete: function(id){
        let allUser = this.getData();
        let finalUser = allUser.filter(oneUser => oneUser.id !== id);
        finalUser.push(allUser);
        fs.writeFileSync(userFilepath, JSON.stringify(finalUser, null, ' '));
        return true;
    }
}
module.exports = User;