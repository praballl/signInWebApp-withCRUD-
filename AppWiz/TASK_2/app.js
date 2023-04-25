const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const con = require("./connections");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// ------------main code---------------

app.get("/", (req, res) => {
    res.render("index");
});
app.post("/", (req, res) => {
    var name = req.body.inputName;
    var email = req.body.inputEmail;
    var pass = req.body.inputPass;


    var sql = "INSERT INTO students (name,email,password) VALUES(?, ?, ?);";

    con.query(sql, [name, email, pass], (err, result) => {
        if (err) throw err;
        res.redirect("students")
    })
});


app.get("/students", (req, res) => {
    var sql = "SELECT * FROM students;";

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        res.render("students", { students: result })
    })
});

// ---------deleting-------------
app.get("/delete-student", (req, res) => {

    var sql = "DELETE FROM students WHERE id=?;";
    var id = req.query.id;
    con.query(sql, [id], (err, result) => {
        if (err) console.log(err);
        res.redirect("students");
    })
});
//-------------updating------------

app.get("/update-student", (req, res) => {

    var sql = "SELECT * FROM students WHERE id=?;";
    var id = req.query.id;
    con.query(sql, [id], (err, result) => {
        if (err) console.log(err);
        res.render("update-student", { students: result })
    })
});

app.post("/update-student", (req, res) => {

    var id = req.body.id;
    var name = req.body.inputName;
    var email = req.body.inputEmail;
    var pass = req.body.inputPass;

    var sql = "UPDATE students SET name=?, email=?, password=? WHERE id=?;";

    con.query(sql, [name, email, pass, id], (err, result) => {
        if (err) console.log(err);
        res.redirect("students")
    })
});

// ---------searching-----------
app.get("/search-students", (req, res) => {

    var sql = "SELECT * FROM students;";

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        res.render("search-students", { students: result })
    })
})

app.get("/search", (req, res) => {
    var name = req.query.name;
    var email = req.query.email;

    var sql = "SELECT * FROM students WHERE name LIKE '%" + name + "%'AND email LIKE '%" + email + "%'";

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        res.render("search-students", { students: result })
    })
});




app.listen(process.env.PORT, () => { console.log("server started at 5000!") })

