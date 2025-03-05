// const login = async (email, password) => {
//    console.log(email, password);
//    try {
//       const result = await axios({
//          method: 'POST',
//          url: 'http://127.0.0.1:7070/api/v1/users/login',//{{URL}}api/v1/users/login
//          data: { email, password },
//          // withCredentials: true
//       });
//       console.log(result);
//    } catch (err) {
//       console.log(err);
//    }
// };

const login = async (email, password) => {
   console.log(email, password);
   try {
      const result = await axios({
         method: 'POST',
         url: 'http://127.0.0.1:7070/api/v1/users/login',
         data: { email, password },
         withCredentials: true // ✅ Include cookies
      });
      console.log(result);
   } catch (err) {
      console.log(err);
   }
};



document.querySelector('.form').addEventListener('submit', e => {
   e.preventDefault();
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   login(email, password);
});
