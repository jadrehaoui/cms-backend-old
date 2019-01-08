import User from '../Models/User';
export default function(Record, req, res, type, authenticate){
  var request = req.body;
  console.log("BODY",req.body);
  if(authenticate){
    var user = User.findById(request.userId, (err, user) => {
      if(err){
        res.send({status: 401, message: 'User not found.', errors: err})
      } else {
        if(user.has.delete){
          request.updatedBy = user.givenName;
          request.deleted = true;
          softRemoveMany(Record, req, res, type ,request);
        } else {
          res.send({status: 401, message: 'You can not delete records!', errors: err})
        }
      }
    })
  } else {
    request.updatedBy = "N/A";
    request.deleted = true;
    softRemoveMany(Record, req, res, type, request);
  }
}

function softRemoveMany(Record, req, res, type, request){
  var record = Record.updateMany({_id: {$in: request.delete}}, request, (err, result) => {
    if(err){
      res.send({status: 500, error: err, message: "Something went wrong."});
    } else {
      res.send({status: 200, message: "Records have been removed", recordType: type, number: result.n});
    }
  })
}
