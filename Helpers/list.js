import _ from 'lodash';
import User from '../Models/User';
export default function(Record, req, res, type, authenticate){
  var condition = {published: true, deleted: false};
  if(type === "User"){
    condition = {};
  }
  var request = req.body;
  if(authenticate){
    var user = User.findById(request.userId, (err, user) => {
      if(err){
        res.send({status: 401, message: 'User not found.', errors: err})
      } else {
        if(user.has.admin){
          list(Record, req, res, type, {});
        } else if(user.has.read){
          list(Record, req, res, type, condition);
        } else {
          res.send({status: 401, message: 'You can not read records!', errors: err})
        }
      }
    })
  } else {
    list(Record, req, res, type, condition);
  }
}
function list(Record, req, res, type, condition){
  var record = Record.find(condition, (err, result) => {
    if(err){
      err = err.errors
      res.send({status: 500, message: "Something went wrong.", errors: err})
    } else {
      res.send({
                status: 200,
                result: "Got Records",
                recordType: type,
                noOfRecords: result.length,
                obj: _.mapKeys(Object.assign({}, result), '_id')
              })
    }
  });
}
