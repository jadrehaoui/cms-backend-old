import User from '../Models/User';
export default function(Record, req, res, type, authenticate){
  var request = req.body;
  if(authenticate){
    var user = User.findById(request.userId, (err, user) => {
      if(err){
        res.send({status: 401, message: 'User not found.', errors: err})
      } else {
        if(user.has.delete){
          remove(Record, req, res, request.id, type)
        } else {
          res.send({status: 401, message: 'You can not delete records!', errors: err})
        }
      }
    })
  } else {
    remove(Record, req, res, request.id, type)
  }
}
function remove(Record, req, res, id, type){
  var record = Record.findOneAndDelete({_id: req.body.id}, (err, result) => {
    if(err){
      res.send({status: 500, error: err, message: 'Something went wrong.'})
    } else {
      res.send({status: 200, removedRecord: result, recordType: type, message: 'Record has been deleted.'})
    }
  })
}
