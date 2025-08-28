// handle multiple successfull promises
import { uploadPhoto } from "./utils";
import { createUser } from "./utils";
export default function handleProfileSignup() {
  return Promise.all([uploadPhoto(), createUser()])
  .then(([photo, user]) => {
    console.log(`${photo.body} ${user.firstName} ${user.lastName}`);
  })
  .catch(() => {console.log('Signup system offline');
  });
}
