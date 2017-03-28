'use strict';
var hapi = require('hapi');
const server = new hapi.Server();
server.connection({port: 3000, host: 'localhost'});
server.start((err) => {
  if (err){
    throw err;
  }
  console.log("server running ${server.info.uri}");
});
server.route({
       method: 'GET',
       path: '/',
        handler: function (req, res){
          console.log("api is running success fully");
         res('hello');
       }
});
server.route({
  method: 'GET',
  path: '/api/{num?}',
  handler: function (req ,res) {

      var String_array = [req.query.num];
  //string_array it stores the array in string type because of http method
      var num = String_array[0].split(',').map((iteration)=> +iteration);
        //converts the number of string from arrray
          console.log(num);
          if (num.length == 0) {
           //if the array is empty it returns the zero
            return 0;
            }

    var check = [];
        //check [] ==> is used to check the  occurence of the array
    var find = 1;
     //find is used for check the maximum number
        for (var i=0; i<num.length; i++)
        check.push(num[i]);
         //pushing an array num[] in check[] for iteration
        for (var i=0; i<num.length; i++) {
                var left = num[i] - 1;
                var right = num[i] + 1;
                var count = 1;
         // count is the temp variable for check the occurence the the concecutive numbers
                while (check.indexOf(left) != -1) {
                    //if left element is present the loop executed
                    count++;
                    check.splice(check.indexOf(left), 1);
                    //if the concequence element is present it removes the value
                    left--;
                }
                while (check.indexOf(right) != -1) {
                    count++;
                    check.splice(check.indexOf(right), 1);
                    right++;
                }
             find = Math.max(count, find);
             //max function show the maximum number of ocurence throughout the array
        }
      //res('function executed');
     res('Output:'+find);
    //return find;
   //find ==> value returns the longest occurence
  }
});
