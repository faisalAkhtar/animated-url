(function() {
	let deadlock = false																// Using deadlock to prevent user from clicking again while one link is being updated
	document.querySelectorAll("a").forEach(a => {
		a.onclick = function (e) {
			e.preventDefault()															// Preventing default action (directly jumping to the section in this case)

			if (deadlock) return
			deadlock = true

			let speed = 50,
				h = location.href,														// the current page-link
				l = h.lastIndexOf("/"),
				c = h.substring(l + 1),													// the trailing-url string, which contains the id of section
				i = 0,
				buildDown,
				buildUp

			if (c == "#iron-man" || c == "#captain-america" || c == "#thor" ||			// checking if the trailing-url string is one of the section-ids
						c == "#black-widow" || c == "#hulk" || c == "#hawkeye") {
				buildDown = setInterval(function () {									// breaking the url, letter by letter
					i++
					history.replaceState({}, 'Faisal', c.substring(0, c.length - i))	// using replaceState webAPI, so the user-history is not crying for help...lol
					if (i == c.length) {
						clearInterval(buildDown)										// when complete url is broken down, stop the iteration and start again

						h = a.href,														// after the breaking down is done, initializing variables to build-up the url to new-id
						l = h.lastIndexOf("/"),
						c = h.substring(l + 1),
						i = 0

						buildUp = setInterval(function () {								// putting letter by letter into the url
							i++
							document.querySelector(c).scrollIntoView()					// also scrolling down to the desired section programatically here, because we stopped the default functionality and the user is going to be so mad if we don't do this...lol
							history.replaceState({}, 'Faisal', c.substring(0, i))		// using replaceState webAPI and putting parts of string
							if (i == c.length) {
								deadlock = false
								clearInterval(buildUp)									// when the string is complete, stop iteration
							}
						}, speed)
					}
				}, speed)
			} else {																	// if not one of the section-ids, then start from the beginning
				h = a.href,																// initializing variables for building-up only, no breaking-down here
				l = h.lastIndexOf("/"),
				c = h.substring(l + 1),
				i = 0
				document.querySelector(c).scrollIntoView()

				buildUp = setInterval(function () {										// here we directly replace state, and hence, whatever the trailing-url might be, will be instantly broken-down and we will start afresh, considering the edge condition: no string
					i++
					history.replaceState({}, 'Faisal', c.substring(0, i))
					if (i == c.length) {
						deadlock = false
						clearInterval(buildUp)
					}
				}, speed)
			}

		}
	})
})();
