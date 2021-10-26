const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const Food = require("../../../models/food");
const History = require('../../../models/history');



module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    return res.json(200, {
      message: "Sign In Successful, here is your token, please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "caloriesapp", { expiresIn: "100000" }),
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log("*******", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};


module.exports.createHistory = async function (req, res) {
  try {
  
        let history = await History.create({
          date: req.body.date,
          caloriesgain: req.body.total,
          caloriesburn: req.body.burnout,
          user:req.body.id

        });
          

          return res.json(200, {
            message: "History Created Successfully",

            data: {
              
              history:history,
            },
            success: true,
          });
        ;
      }
    
   catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};



module.exports.signUp = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.json(422, {
        message: "Passwords donot match",
      });
    }

    User.findOne({ email: req.body.email }, function (err, user) {
      if (user) {
        return res.json(200, {
          message: "Sign Up Successful, here is your token, plz keep it safe",

          data: {
            //user.JSON() part gets encrypted

            token: jwt.sign(user.toJSON(), "caloriesapp", {
              expiresIn: "100000",
            }),
            user,
          },
          success: true,
        });
      }

      if (!user) {
        let user = User.create(req.body, function (err, user) {
          if (err) {
            return res.json(500, {
              message: "Internal Server Error",
            });
          }

          // let userr = User.findOne({ email: req.body.email });

          return res.json(200, {
            message: "Sign Up Successful, here is your token, plz keep it safe",

            data: {
              //user.JSON() part gets encrypted

              token: jwt.sign(user.toJSON(), "caloriesapp", {
                expiresIn: "100000",
              }),
              user,
            },
            success: true,
          });
        });
      } else {
        return res.json(500, {
          message: "Internal Server Error",
        });
      }
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.editProfile = async function (req, res) {
  if (req.body.password == req.body.confirm_password) {
    try {
      let user = await User.findById(req.body.id);

      user.name = req.body.name;
      user.password = req.body.password;
      user.role = req.body.role

      user.save();

      return res.json(200, {
        message: "User is updated Successfully",

        data: {
          //user.JSON() part gets encrypted

          // token: jwt.sign(user.toJSON(), env.jwt_secret, {
          //   expiresIn: "100000",
          // }),
          user,
        },
        success: true,
      });
    } catch (err) {
      console.log(err);

      return res.json(500, {
        message: "Internal Server Error",
      });
    }
  } else {
    return res.json(422, {
      message: "Passwords donot match",
    });
  }
};

module.exports.searchUser = async function (req, res) {
  try {
    var regex = new RegExp(req.params.name, "i");
    
    let users = await Food.find({ Food: regex });

    return res.json(200, {
      message: "The list of Searched Users",

      data: {
        //user.JSON() part gets encrypted

        //token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
        users: users,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.getHistory = async function (req, res) {
  try {
    let history = await History.findOne({user:req.query.id,date:req.query.date});

    return res.json(200, {
      message: "The User Profile",

      data: {
        //user.JSON() part gets encrypted

        // token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
        history: history,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

