import User from '../Models/User';
export default function(Record, req, res, type, authenticate) {
  var request = req.body;
  var params = req.params;
  request.updatedTs = new Date().toISOString();
  if(authenticate){
    var user = User.findById(request.userId, (err, user) => {
      if(err){
        res.send({status: 401, message: 'User not found.', errors: err})
      } else {
        if(user.has.update){
          request.updatedBy = user.givenName;
          update(Record, req, res, type, params.id, request);
        } else {
          res.send({status: 401, message: 'You can not edit records!', errors: err})
        }
      }
    })
  } else {
    request.updatedBy = "N/A";
    update(Record, req, res, type,req.params.id, request);
  }
}

function update(Record, req, res, type, id, request){
  var record = Record.findOneAndUpdate({_id: id},request,{new: true}, (err, result) => {
    if(err){
      res.send({status: 500, error: err, message: 'Something went wrong.'})
    } else {
      res.send({status: 200, updatedRecord: result, recordType: type, message: 'Record has been updated.'})
    }
  });
}
