import User from '../Models/User';
export default function(Record, req, res, type, authenticate){
  var request = req.params;
  var user = req.body.userId;
  if(authenticate){
    var user = User.findById(user, (err, user) => {
      if(err){
        res.send({status: 401, message: 'User not found.', errors: err})
      } else {
        if(user.has.read){
          findById(Record, req, res, type, request);
        } else {
          res.send({status: 401, message: 'You can not read records!', errors: err})
        }
      }
    })
  } else {
    findById(Record, req, res, type, request);
  }
}

function findById(Record, req, res, type, request){
  var record = Record.findById(request.id, (err, result) => {
    if(err){
      res.send({status: 500, error: err, message: 'Something went wrong.'})
    } else {
      res.send({status: 200, foundRecord: result, recordType: type, message: 'Record has been fetched'})
    }
  });
}
