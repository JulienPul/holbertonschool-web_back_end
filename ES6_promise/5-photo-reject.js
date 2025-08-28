// reject promises
export default function uploadPhoto(filename) {
    const promise = new Promise((resolve, reject) => {
      reject("${fileName} cannot be processed");
    });
    promise
    .then(value => console.log("Success", value))
    .catch(error => console.log("Error:", error));
    return promise
}