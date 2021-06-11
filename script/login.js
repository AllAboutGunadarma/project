$(document).ready(function () {

  
   $('#login-button').click(function (e) { 
       e.preventDefault();
       
       let email = $('#email').val(),
       password = $('#password').val();
    
       auth.signInWithEmailAndPassword(email,password).then(cred=>{
           alert('Login Berhasil !');
           window.location.assign('/root/public/pages/edit.html')
       }).catch(e=>{
           alert('Password atau Username salah !')
       })
   });
});