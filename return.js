let SUCCESS = (e) => {
  let rs = { message: "Success", returnCode: 1 };
  rs.data = e;
  return rs;
};

let FAILURE = (e) => {
  let rs = { message: "Fail", returnCode: 0 };
  rs.data = e;
  return rs;
};

module.exports = {
  SUCCESS,
  FAILURE,
};
