const firebaseConfig = {
  apiKey: "AIzaSyCInWYqp1g0pIrEvxS3yXNod3qehcSn_8E",
  authDomain: "sage-byte-229713.firebaseapp.com",
  databaseURL: "https://sage-byte-229713.firebaseio.com",
  projectId: "sage-byte-229713",
  storageBucket: "sage-byte-229713.appspot.com",
  messagingSenderId: "675550487494",
  appId: "1:675550487494:web:8b7a3de878856e45"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().signInWithEmailAndPassword("noreply@sage-byte-229713.firebaseapp.com", "robot1234567890").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
var db = database =  firebase.firestore();
$( '#contact-form' ).submit(function ( e ) {
	e.preventDefault();
	var email=$("#contact-form input[name='email']").val() || "";
	var name=$("#contact-form input[name='name']").val() || "";
	var subject=$("#contact-form input[name='subject']").val() || "";
	var message=$("#contact-form textarea[name='message']").val() || "";
	var errorMessage=null;
	if(email==""){
		errorMessage="Email can\'t be empty";
	}else if(name==""){
		errorMessage="Your name can\'t be empty";
	}
	else if(subject==""){
		errorMessage="Subject can\'t be empty";
	}
	else if(message==""){
		errorMessage="message can\'t be empty";
	}
	else if(message.length<10){
		errorMessage="message too short";
	}
	if(errorMessage){
		var html=document.createElement('div');
		html.innerHTML=`<div class="alert alert-danger" role="alert">
		  <strong>Hi ${name}!</strong>
		  	${errorMessage}
		</div>`;
		html.setAttribute("class","col-md-12 contact-alert")
		if($('.contact-alert').length>0){
			$('.contact-alert').html(html);
		}else{
			$('#contact-form').prepend(html);
		}
	}else{
		db.collection("mailbox").add({
		    email: email,
		    name: name,
		    subject: subject,
		    message:message
		})
		.then(function(docRef) {
			var html=document.createElement('div');
			html.innerHTML=`<div class="alert alert-success" role="alert">
			  <strong>Hi ${name}!</strong> We have successfully receive your mail we will revert to you as soon as possible.
			</div>`;
			html.setAttribute("class","col-md-12 contact-alert")
			if($('.contact-alert').length>0){
				$('.contact-alert').html(html);
			}else{
				$('#contact-form').prepend(html);
			}
		})
		.catch(function(error) {
		    var html=document.createElement('div');
			html.innerHTML=`<div class="alert alert-denger" role="alert">
			  <strong>Hi ${name}!</strong>
			  	couldn't send mail at this time please try again later .
			</div>`;
			html.setAttribute("class","col-md-12 contact-alert")
			if($('.contact-alert').length>0){
				$('.contact-alert').html(html);
			}else{
				$('#contact-form').prepend(html);
			}
		});
	}
});

db.collection("mailbox").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});