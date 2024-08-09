const multer = require("multer");
const Course = require("../models/course");
const Student = require("../models/student");
const { getTeach } = require("../service/teach");
const { parse } = require("csv-parse");
const fs = require('fs');

async function handleUpload(req, res) {
    try {
        const teachidToken = req.cookies?.teachid;
        if (!teachidToken) {
            return res.status(400).send("No teach ID provided");
        }

        const teachid = getTeach(teachidToken); // Use getTeach to decode the token
        if (!teachid || !teachid.classnumber) {
            return res.status(400).send("Invalid teach ID or class number");
        }

        console.log(teachid.classnumber);

        const filePath = req.file?.path;
        if (!filePath) {
            return res.status(400).send("No file uploaded");
        }

        const results = [];

        fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", (row) => {
                results.push(row);
            })
            .on("error", (error) => {
                console.error(`File read error: ${error.message}`);
                res.status(500).send(`File read error: ${error.message}`);
            })
            .on("end", async () => {
                for (const row of results) {
                    try {
                        const user = await Student.findOne({ username: row[0] });
                        if (user) {
                            user.coursesTeach.push(teachid.classnumber);
                            await user.save();
                            console.log(`Updated user: ${user.username}`);
                        } else {
                            console.log(`User not found for username: ${row[0]}`);
                        }
                    } catch (err) {
                        console.error(`Error fetching or updating user for row ${row}: ${err.message}`);
                    }
                }
                console.log("Finished processing");
                res.status(200).send("Upload and processing complete");
            });
    } catch (err) {
        console.error(`Unexpected error: ${err.message}`);
        res.status(500).send(`Unexpected error: ${err.message}`);
    }
}

module.exports = { handleUpload };
