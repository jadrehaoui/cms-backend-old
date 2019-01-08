import User from '../Models/User';
export default function(Record, req, res, type, authenticate){
  console.log("ADD FUNCTION");
  var request = req.body;
  if(authenticate){
    var user = User.findById(request.userId, (err, user) => {
      if(err){
        res.send({status: 401, message: 'User not found.', errors: err})
      } else {
        if(user.has.create){
          request.updatedBy = user.givenName;
          request.createdBy = user.givenName;
          add(Record, req, res, type, request);
        } else {
          res.send({status: 401, message: 'You can not create records!', errors: err})
        }
      }
    })
  } else {
    request.updatedBy = "N/A";
    request.createdBy = "N/A";
    add(Record, req, res, type, request);
  }
}

function add(Record, req, res, type, request){
  var record = new Record(request).save( (err, result) => {
    if(err){
      err = err.errors
      res.send({status: 500, message: err.title.name, errors: err})
    } else {
      console.log("ADDED");
      res.send({status: 200, result: "Record Added", recordType: type, obj: result})
    }
  });
}
