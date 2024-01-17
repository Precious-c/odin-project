// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('login-form');

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault(); // Prevent the default form submission

//         const formData = new FormData(form);
//         const email = formData.get('email');
//         const password = formData.get('password');

//         console.log(formData)
//         console.log(email)
//         console.log(password)

//         try {
//             const response = await fetch('/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Authentication successful:', data);
//                 document.cookie = `jwt=${data.token}`; 
//                 // console.log(document)
//                 // console.log(document.cookie)
//                 // path=/; secure; HttpOnly; SameSite=Strict`;

//                 // location.href("/localhost:2122")
//                 location.replace("http://localhost:2122/");
//             } else {
//                 const errorData = await response.json();
//                 console.error('Authentication failed:', errorData);
//                 location.reload()
//             }
//         } catch (error) {
//             console.error('Error during fetch:', error);
//             location.reload()
//         }
//     });
// });




