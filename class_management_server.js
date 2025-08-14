const express = require(`express`);
const app = express();
const PORT=3000;

app.use(express.json());

let users= [
    {id:1, lastName: `castillo`, firstName:`josh vrylle`, section: `bsit 4a`, status:`p`},
    {id:2, lastName: `hernandez`, firstName:`marc lester`, section: `bsit 4a`, status:`a`},
];

app.get(`/users`,(req,res)=>{
    const {lastName,firstName,section,status} = req.body;

    const userIndex = users.findIndex(user=> user.lastName === lastName && user.firstName === firstName);

    if(userIndex !== -1){
        users[userIndex].status = status;
        console.log(`Updated attendance for ${lastName}, ${firstName} to: ${status}`);
        res.status(200).json({message:`Attendance for ${lastName}, ${firstName} has been updated to ${status}.`});
    }else{
        const newUser = {
            id:users.length + 1,
            firstName,
            lastName,
            section,
            status,
        };
        users.push(newUser);
        console.log(`New user added: ${lastName}, ${firstName} with status:${status}`);
        res.status(201).json({message:`New student ${lastName}, ${firstName} has been added with status: ${status}.`});
    };
});

app.get(`/users`, (req,res)=> {
    res.status(200).json(users);
});

app.get(`/`, (req,res)=> {
    res.send(`Server is up and running`);
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});

module.exports = app;
