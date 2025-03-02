// const login = async (email, password) => {
//    console.log(email, password);

//    try {
//       const res = await axios({
//          method: 'POST',
//          url: 'http://127.0.0.1:7070/api/v1/users/login',
//          data: {
//             email: email,
//             password: password
//          }
//       })
//       console.log(res);

//    } catch (error) {
//       console.log(error);

//    }
// }


// document.querySelector('.form').addEventListener('submit', event => {
//    event.preventDefault()
//    const email = document.getElementById('email').value;
//    const password = document.getElementById('password').value;
//    login(email, password)
// })


// import axios from 'axios';
// const axios = require('axios')

const login = async (email, password) => {
   console.log(email, password);

   try {
      const res = await axios({
         method: 'POST',
         url: 'http://127.0.0.1:7070/api/v1/users/login',
         data: { email, password }
      });
      console.log(res);

   } catch (error) {
      console.log(error);
   }
};

document.querySelector('.form').addEventListener('submit', event => {
   event.preventDefault();
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   login(email, password);
});
