document.addEventListener('DOMContentLoaded', function() {
    var jlhRating = 0;

    const ulasan = [];
    const lamanUlasan = document.querySelector('#ulasan')
    const tombolRating = document.querySelector("#tombol-rate");
    const formRating =  document.querySelector(".master-wrapper");
    tombolRating.addEventListener('click', () => {
        formRating.style.display = 'flex';
    })

    const buttonCancel = document.querySelector(".btn.cancel");
    const buttonSubmit = document.querySelector(".btn.submit");
    const ulasanField = document.querySelector("#ulasan-field");
    const allStar = document.querySelectorAll('.rating .star')
    const ratingValue = document.querySelector('.rating input')
	ratingValue.value = 0;

    allStar.forEach((item, idx) => {
        item.addEventListener('click', function () {
            let click = 0;
            ratingValue.value = idx + 1;

            allStar.forEach(i => {
                i.classList.replace('bxs-star', 'bx-star')
                i.classList.remove('active')
            })

            for (let i = 0; i < allStar.length; i++) {
                if (i <= idx) {
                    allStar[i].classList.replace('bx-star', 'bxs-star')
                    allStar[i].classList.add('active')
                } else {
                    allStar[i].style.setProperty('--i', click)
                    click++
                    jlhRating = click;
                }
            }
        })
    })

    buttonCancel.addEventListener("click", () => {
        formRating.style.display = 'none';
    });

	if (ratingValue.value === "0") {
		buttonSubmit.style.opacity = '0.6';
	} 

	ratingValue.addEventListener("change", () => {
		const buttonSubmit = document.querySelector(".btn.submit");
	
		if (ratingValue.value !== "0") {
			buttonSubmit.style.opacity = '1';
		} else {
			buttonSubmit.style.opacity = '0.5'; // or any other value for disabled state
		}
	});
	

    buttonSubmit.addEventListener("click", () => {
        if (ratingValue.value !== "0") {
			formRating.style.display = 'none';
			ulasan.push(ulasanField.value);
			const newDiv = document.createElement("div");
			newDiv.textContent = ulasanField.value + " Rating: " + ratingValue.value;
			lamanUlasan.appendChild(newDiv);
			ulasanField.value = "";
			ratingValue.value = 0;
		} else {
			buttonSubmit.style.opacity = '0.6';
			console.log(ratingValue.value)
		}
        // Clear the input field after submitting
    });
});
