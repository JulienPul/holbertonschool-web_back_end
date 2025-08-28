// handle multiple successfull promises
import  uploadPhoto  from "./utils"
import createUser from "./utils"
export default function handleProfileSignup() {
  Promise.allSettled([
    uploadPhoto(Promise.resolve()),
    createUser(Promise.resolve(),)
  ]).then(results => console.log(results));
  return Promise
}
