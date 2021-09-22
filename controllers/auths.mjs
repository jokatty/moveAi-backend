import jsSHA from 'jssha';

export default function initAuthController(db) {
  const createUser = async (req, res) => {
    console.log(req.body);
    const { userName, email, password } = req.body;

    // initialise the SHA obj
    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    // input the password from request to the SHA obj
    shaObj.update(password);
    const hashedPassword = shaObj.getHash('HEX');
    console.log('hashed password');
    console.log(hashedPassword);
    // store the email and hashed password to the db.
    try {
      db.User.create({
        name: userName,
        email,
        password: hashedPassword,
      }).then((result) => {
        console.log(result);
        res.send('user created successfully');
      });
    } catch (error) {
      console.log(error.stack);
    }
  };
  // login user
  const loginUser = (req, res) => {
    const { email } = req.body;
    try {
      db.User.findAll({
        where: {
          email,
        },
      }).then((result) => { console.log(result);
        if (result.length === 0) {
          res.status(403).send('login failed!');
        }
        // get user record from results
        const user = result[0].dataValues;
        console.log(user);
        // initialise SHA object
        const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
        // input the password from the request to the SHA object
        shaObj.update(req.body.password);
        // get the hashed value as output from the SHA object
        const hashedPassword = shaObj.getHash('HEX');

        // If the user's hashed password in the database
        // does not match the hashed input password, login fails
        if (user.password !== hashedPassword) {
          // the error for incorrect email and incorrect password are the same for security reasons.
          // This is to prevent detection of whether a user has an account for a given service.
          res.status(403).send('login failed!');
        }
      });
    } catch (error) {
      console.log('Error executing query', error.stack);
      res.status(503).send('try again');
      return;
    }
    res.send('successfully loggedIn user');
  };
  return {
    createUser,
    loginUser,
  };
}
