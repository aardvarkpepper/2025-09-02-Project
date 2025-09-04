// based on Lab 1
// Remember, bcrypt on password is handled through User.pre.  bcrypt on password comparison is handled through a custom method defined on User, invoked in this controller.
// There is no JWT check token functionality here.  The assignment only requires register and login, and neither strictly checks JWT tokens - just generates.
const router = require('express').Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  let isThereAnotherUserWithSameEmail; // this ends up storing a 'User', so rename sometime.
  try {
    isThereAnotherUserWithSameEmail = await User.findOne({ email: email }); // null if none, right?
  } catch (error) {
    return res.json({ error: `An unspecified error has occured:  ${error}` }); // vague for security.  But actually we generate a unique ticket number to send to user, encrypt that ticket for ID on server, store error message under that encrypted ID, then when helpdesk is notified, helpdesk can find.
  }
  if (isThereAnotherUserWithSameEmail) {
    return res.status(400).json({ error: `400 Bad Request:  Another user with email ${email} already exists.` });
  }
  // if we get this far then isThereAnotherUserWithSameEmail returned null (presumably, may have to deconstruct), and no errors.  So we can just go ahead and create a new user.  Note User.js contains middleware that encrypts the password.  isThereAnotherUserWithSameEmail is a 'User', after all, it's retrieved using User.findOne.
  // could pop this in a try/catch but . . . eh.  It's self-contained.
  User.create(req.body)
    .then(createdUser => {
      console.log('User created successfully:', createdUser);
      // Data returned to user below does not include hashed password.  However, the full createdUser including hashed password is printed - I need the _id as well for this project.
      res.status(201).json({ message: `User created`, user: { username, email } });
    })
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(400).json({ message: `Unspecified error when creating user.  ${err}` });
    })
} // registerUser

const login = async (req, res) => {
  let isThereAUserWithThisEmail;
  const { email, password } = req.body;
  try {
    isThereAUserWithThisEmail = await User.findOne({ email: email }); // null if none, right?  also, could just use { email } to deconstruct?
  } catch (error) {
    res.json({ error: `An unspecified error has occured`, error: error });
    return;
  }
  if (!isThereAUserWithThisEmail) {
    res.status(400).json({ message: `No user with this email exists.  Noted that vague error messages may be desired by some for security.` });
    return;
  }

  //So there IS a user with this email if we've gotten this far, now we just want to check password.
  const correctPw = await isThereAUserWithThisEmail.isCorrectPassword(password);

  if (!correctPw) {
    return res.status(400).json({ message: "Incorrect password.  Noted vague error messages may be desirable for security purposes" });
  }

  // JWT below
  const secret = process.env.JWT_SECRET;
  const expiration = '1h';

  // Payload is for minimal nonsensitive information.  Note tokens are typically stored in client's localStorage (?) and sent in headers - and headers can have maximum file sizes.  So a too-large token could simply bounce, as well as increasing costs of data transmission (multiplied over hundreds of thousands of transactions or more).
  const payload = {
    _id: isThereAUserWithThisEmail._id,
    username: isThereAUserWithThisEmail.username,
  }

  const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration }); // there's an additional argument that Bryan used here, I think.  Look into it.

  return res.json({ token, user: { username: isThereAUserWithThisEmail.username, email: isThereAUserWithThisEmail.email } });
} // login

const getAllUsers = async (req, res) => {
  const category = req.query.category;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const sortBy = req.query.sortBy ? req.query.sortBy.split("_")[0] : null;
  const sortAscOrDesc = req.query.sortBy ? (req.query.sortBy.split("_")[1] === "desc" ? -1 : 1) : null;
  // any nonsense will result in ascending order.  Could also just use 'asc' or 'desc' as those are accepted raw, but eh.
  // Remember, the query parameters are 'limit' and 'page', not pageIn or limitIn.
  const pageIn = req.query.page ? Math.round(Number(req.query.page)) : 0;
  const limitIn = req.query.limit ? Math.round(Number(req.query.limit)) : 0;
  const page = pageIn ? pageIn : 1;
  const limit = limitIn ? limitIn : 10;

  const customFilter = () => {
    const returnObject = {};
    const priceFilterObject = {};
    if (category) {
      returnObject.category = category;
      nullReturn = false;
    };
    if (minPrice || maxPrice) {
      returnObject.price = priceFilterObject;
    }
    if (minPrice) {
      priceFilterObject.$gte = minPrice;
    }
    if (maxPrice) {
      priceFilterObject.$lte = maxPrice;
    }
    return returnObject; // If none of the 'if' are true, then returns {} which is 'all' fields.
  };

  User.find(customFilter())
    .sort(sortBy ? { [sortBy]: sortAscOrDesc } : {})
    .skip((page - 1) * limit)
    .limit(limit)
    .then(allUsers => {
      console.log('All users in collection:', allUsers); // array or null (?)
      res.status(200).json({ message: 'All users', users: allUsers });
    })
    .catch(err => {
      console.error('Error retrieving all users:', err);
      res.status(500).json({ message: 'Unspecified error when retrieving all users.' });
    })
}; // getAllUsers

const getUser = async (req, res) => {
  const userId = req.params.id;
  // presumably we have to ID to work with because front end input is working off a list that includes IDs.  It is presumed the user is not directly manipulating the database.
  User.findById(userId)
    .then(user => {
      console.log('Found user:', user); // array or null (?)
      res.status(200).json({ message: `Found user`, user: user });
    })
    .catch(err => {
      console.error('Error retrieving user:', err);
      res.status(404).json({ message: `Unspecified error when retrieving user with ID ${userId}` });
    })
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const options = { new: true };
  User.findByIdAndUpdate(userId, req.body, options)
    .then(updatedUser => {
      console.log('User updated:', updatedUser); // always an array, I assume.  Could be null, I assume.
      res.status(200).json({ message: `Updated user`, user: updatedUser });
    })
    .catch(err => {
      console.error('Error updating user:', err);
      res.status(404).json({ message: `Unspecified error when updating user with ID ${userId}` });
    })
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then(deletedUser => { // if the user is not found, we get a null return.
      if (deletedUser) {
        console.log('Successfully deleted user:', deletedUser);
        res.status(200).json({ message: `Successfully deleted user:`, user: deletedUser });
      } else {
        console.log('Could not find user to delete.')
        res.status(404).json({ message: `User with ${userId} could not be found to be deleted.` });
      }
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: `Unspecified error when deleting user with ID ${userId}` });
    })
}; // deleteUser

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  registerUser,
  login
};


// const { signToken } = require('../../utils/auth');
 
// router.post('/register', async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     const token = signToken(user);
//     res.status(201).json({ token, user });
//     //if user already exists, 400 error
//   } catch (err) {
//     res.status(400).json(err); // actually would be 500
//   }
// });
 
// // POST /api/users/login - Authenticate a user and return a token
// router.post('/login', async (req, res) => {

//   //console.log('Attempting login with email', req.body.email);
//   // console.log('User', User, 'Properties of undefined reading findOne');
//   const user = await User.findOne({ "email": req.body.email });
 
//   if (!user) {
//     return res.status(400).json({ message: "Can't find this user" });
//   }
 
//   const correctPw = await user.isCorrectPassword(req.body.password);
 
//   if (!correctPw) {
//     return res.status(400).json({ message: 'Wrong password!' });
//   }
 
//   const token = signToken(user);
//   res.json({ token, user });
// });
 
// module.exports = router;

