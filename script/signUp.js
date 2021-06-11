
$(document).ready(function () {

	let file = {};

	$('#image-profile').change(function (e) {
		e.preventDefault();
		file = e.target.files[0];
		console.log(file);
	});

	//signed in user
	$('#submit').click(function (e) {
		e.preventDefault();
		let email = $('#input-email').val(),
			pegID = $('#input-id').val(),
			namaLengkap = $('#input-nama').val().toLowerCase(),
			subject = $('#input-subject').val().toLowerCase(),
			phone = $('#input-nomer').val(),
			password = $('#input-password').val(),
			profileImg = $('#image-profile').val();
		// currAva = $('#curr-avatar')
		auth.createUserWithEmailAndPassword(email, password)
			.then(cred => {

				let storageRef = firebase.storage().ref('users/' + cred.user.uid + '/profile.jpg'),
					// insertToStorage = storageRef.put(file)
				 uploadOnTask = storageRef.put(file);

				uploadOnTask.on('state_changed',
					(snapshot) => {
						// tracking progress uploading pada storage
						$('.form-control').prop("disabled", true);

						var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						$('.progress-bar').css({"width":progress +"%"});
						switch (snapshot.state) {
							case firebase.storage.TaskState.PAUSED: // or 'paused'
								console.log('Upload is paused');
								break;
							case firebase.storage.TaskState.RUNNING: // or 'running'
								console.log('Upload is running');
								break;
						}
					},
					(error) => {
						alert(error)
					},
					() => {
						// callback function saat proses success
						uploadOnTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
							return db.collection('users').doc(cred.user.uid).set({
								mail: email,
								idPeg: pegID,
								nama: namaLengkap,
								sub: subject,
								number: phone,
								url: downloadURL
							})
						}).then(() => {
							$('.progress-bar').css({"width":0 +"%"});
							$('.form-control').prop("disabled", false);
							$('#input-email').val(""),
								$('#input-nama').val(""),
								$('#input-nomer').val(""),
								$('#input-id').val(""),
								$('#input-subject').val(""),
								$('#input-password').val(""),
								$('#image-profile').val("");

								alert('Pendaftaran Berhasil');
						}).then(() => {
							window.location.assign('/root/public/pages/edit.html');
						});
					}
				);

				/*insertToStorage.then(() => {
					storageRef.getDownloadURL()
						.then(url => {
							imgURL = url
							console.log('link available at : ' + imgURL);

						})
						.then(() => {
							return db.collection('users').doc(cred.user.uid).set({
								mail: email,
								idPeg: pegID,
								nama: namaLengkap,
								sub: subject,
								number: phone,
								url: imgURL
							})
						}).then(() => {
							$('#input-email').val(""),
								$('#input-nama').val(""),
								$('#input-nomer').val(""),
								$('#input-id').val(""),
								$('#input-subject').val(""),
								$('#input-password').val(""),
								$('#image-profile').val("");

								alert('Pendaftaran Berhasil');
						})
						.then(() => {
							window.location.assign('/root/pages/edit.html');
						})
				})
					.catch(err => {
						console.log(err.message);
					})
				*/

				// .then(function () {
				// 	console.log('uploaded successfully');
				// 	$('#avatars').html(`${cred.user.email}`)
				// })
				// .then(() => {
				// 	firebase.storage().ref('users/' + cred.user.uid + '/profile.jpg').getDownloadURL()
				// 		.then(url => {
				// 			console.log(`url available at : ${url}`);
				// 			$('#curr-avatar').attr('src', url);
				// 			$('#input-email').val(""),
				// 			$('#input-nama').val(""),
				// 			$('#input-nomer').val(""),
				// 			$('#input-id').val(""),
				// 			$('#input-password').val(""),
				// 			$('#image-profile').val("");
				// 		}).then(() => {
				// 			$('#profile-info').css("visibility", "visible")
				// 		})
				// })
				// firebase.auth().onAuthStateChanged( user => {
				//     if (user) { 

				//         let storageRef = firebase.storage().ref('users/' + user.uid+ '/profile.jpg')

				// 				// uploading file
				// 				storageRef.put(file).then(function(snapshot){
				// 					// console.log('successfully uploaded');
				// 					// currAva.src = snapshot.downloadURL
				// 					$('#curr-avatar').attr("src", `${snapshot.DownloadURL}`)
				// 					$('#avatars').html(`${auth.user.email}`)
				// 					console.log(snapshot.DownloadURL);
				// 					console.log('successfully uploaded');
				// 				},err=>{
				// 					console.log(err.message);
				// 				})
				//     }
				//   });

			})
			.catch(e => {
				// handling errors
				console.log(e.message);
			})
	});

	auth.onAuthStateChanged(user => {
		if (user) {
			$('#avatars').html(`${user.email}`);
		} else {
			console.log(user);
		}
	})

	$('#sign-out').click(function (e) {
		e.preventDefault();
		auth.signOut().then(() => {
			$('#avatars').hide()
		})
	});


});



