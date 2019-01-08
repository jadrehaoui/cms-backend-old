import User from '../Models/User';
export default function(Record, req, res, type, authenticate){
  var request = req.body;
  if(authenticate){
    var user = User.findById(request.userId, (err, user) => {
      if(err){
        res.send({status: 401, message: 'User not found.', errors: err})
      } else {
        if(user.has.delete){
          request.updatedBy = user.givenName;
          request.published = true;
          softRemoveMany(Record, req, res, type ,request);
        } else {
          res.send({status: 401, message: 'You can not edit records!', errors: err})
        }
      }
    })
  } else {
    request.updatedBy = "N/A";
    request.published = false;
    softRemoveMany(Record, req, res, type, request);
  }
}

function softRemoveMany(Record, req, res, type, request){
  var record = Record.updateMany({_id: {$in: request.publish}}, request, (err, result) => {
    if(err){
      res.send({status: 500, error: err, message: "Something went wrong."});
    } else {
      res.send({status: 200, message: "Records have been unpublished", recordType: type, number: result.n});
    }
  })
}
