'use strict';
const hapi = require('hapi');
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
       path: '/{x?}',
        handler: function (req, res){
         var x =  req.params.x.split(',');//.length;
          res(x.sort());
       }
});
server.route({
  method: 'GET',
  path: '/hello/{num?}',
  handler: function (req ,res) {
    // if array is empty, return 0
     var num = req.query.num.split(',');
    //var num = [1,3,4,5,12];
    if (num.length == 0) {
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
     res(find);
    //return find;
   //find ==> value returns the longest occurence
  }
});
