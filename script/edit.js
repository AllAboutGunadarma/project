$(document).ready(function () {

	const dbRef = db.collection('users');


	auth.onAuthStateChanged(user => {
		if (user) {
			$('#avatars').html(`${user.email}`);

			dbRef.where('mail', '==', `${user.email}`).get().then((snapshot) => {
				snapshot.docs.forEach(doc => {
					$('img').attr('src', `${doc.data().url}`);
					$('#id-field').val(`${doc.data().idPeg}`);
					$('#name-field').val(`${doc.data().nama}`);
					$('#phone-field').val(`${doc.data().number}`);
					$('#subject-field').val(`${doc.data().sub}`);
				})
			}).then(() => {
				$('#up-btn').click(function (e) {
					e.preventDefault();
					$('.form-control').prop("disabled", true);
					let pegID = $('#id-field').val(),
						namaLengkap = $('#name-field').val(),
						noHp = $('#phone-field').val(),
						subject = $('#subject-field').val();

					dbRef.doc(user.uid).update({
						idPeg:pegID,
						nama:namaLengkap,
						number:noHp,
						sub:subject
					}).then(()=>{
						$('#myModal').modal('show');
					}).then(()=>{
						$('.form-control').prop("disabled", false);
					})
				});


			})
		}
		else {
			// console.log(user);
			$('img').attr('src', ``);
			$('#id-field').val(``);
			$('#name-field').val(``);
			$('#phone-field').val(``);
			$('#subject-field').val(``);
		}
	})

	$('#logout').click(function (e) {
		e.preventDefault();

		auth.signOut().then(() => {
			$('img').attr('src', ``);
			$('#avatars').val(``);
			$('#id-field').val(``);
			$('#name-field').val(``);
			$('#phone-field').val(``);
			$('#subject-field').val(``);

			window.location.assign('/root/public/pages/login.html');
		})
	});

	// const database = firebase.database()
	// const beforeQuery = database.ref('guru/')

	// let file = {};

	// let imgURL;


	// adding new data
	/*$('#insert').click(function (e) {
		e.preventDefault();



		const pegID = $('#idbox').val(),
			fullname = $('#fullnamebox').val().toLowerCase(),
			subject = $('#subjectbox').val(),
			phone = $('#phonebox').val(),
			gelar1 = $('#gelar1box').val(),
			gelar2 = $('#gelar2box').val(),
			img = $('#fileinput').val().slice(12),
			newId = beforeQuery.push()

		// console.log(fullname);
		// console.log(pegID)
		// console.log(fullname)
		// console.log(subject)
		// console.log(phone)
		// console.log(gelar1)'
		// console.log(gelar2)
		// console.log(img)

		// function chooseFile(e) {
		// 	file = e.target.files[0];
		// }
		$('#fileinput').change(function (e) {
			e.preventDefault();
			file = e.target.files
		});

		let metadata = {
			contentType: 'image/png',
		};

		let uploadTask = firebase.storage().ref('images/' + img).put(file, metadata)

		uploadTask.on('state_changed', (snapshot) => {
			let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');

		}, (error) => {
			// handling error
		}, () => {
			uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
				imgURL = url;
				console.log(imgURL);


				if (!pegID | !fullname | !subject | !phone) {

					alert('Data yang diinput tidak sesuai')
				}
				else {
					newId.set({
						pegID: pegID,
						fullname: fullname,
						subject: subject,
						phone: phone,
						gelar1: gelar1,
						gelar2: gelar2,
						link: imgURL
					},
						error => {
							if (!error) {
								$('#namebox').val("")
								$('#idbox').val("")
								$('#fullnamebox').val("")
								$('#subjectbox').val("")
								$('#phonebox').val("")
								$('#gelar1box').val("")
								$('#gelar2box').val("")
								$('#fileinput').val("")
							}
						})
				}
			})
		}
		)


		// if (!pegID | !fullname | !subject | !phone) {

		// 	alert('Data yang diinput tidak sesuai')
		// }
		// else {
		// 	newId.set({
		// 		pegID: pegID,
		// 		fullname: fullname,
		// 		subject: subject,
		// 		phone: phone,
		// 		gelar1: gelar1,
		// 		gelar2: gelar2,
		// 		link: imgURL
		// 	},
		// 		error => {
		// 			if (!error) {
		// 				$('#namebox').val("")
		// 				$('#idbox').val("")
		// 				$('#fullnamebox').val("")
		// 				$('#subjectbox').val("")
		// 				$('#phonebox').val("")
		// 				$('#gelar1box').val("")
		// 				$('#gelar2box').val("")
		// 				$('#fileinput').val("")
		// 			}
		// 		})
		// }

	});*/
});