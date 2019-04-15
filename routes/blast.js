var express = require('express');
var app = express.Router();
const accountSid = '************************';
const authToken = '*************************';
const client = require('twilio')(accountSid, authToken);


app.post('/blast',function(req,res){
    var user_id =  req.body.user_id
    var message_data = req.body.message
    var file = req.files.fileup,
        filename = file.name;
        file.mv("./upload/"+"fileup.xlsx",function(err){
            // res.send("Done")
            const XLSX = require('xlsx');
            const workbook = XLSX.readFile('./upload/fileup.xlsx');
            const sheet_name_list = workbook.SheetNames;
            var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
            var result = data
            console.log(data[0].phone)
            for(var i =0; i<data.length;i++){
                console.log(data[i].phone)
                var phone_number = data[i].phone.toString()
                client.messages
                .create({
                    body: user_id+' \n '+message_data,
                    from: '+*********',
                    to: '+'+phone_number
                })
                .then(message => console.log(message.sid));
            }

            res.render('success',{result:data,message:message_data})
        })
   

})

// app.post('/blast',function(req,res){
//     console.log(req.body.massage)
// })


function export_data(req,res){
        
}


module.exports = app;