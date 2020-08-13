let deadlock = false
document.querySelectorAll("a").forEach(a => {
	a.onclick = function (e) {
		e.preventDefault()

		if(deadlock) return
		deadlock = true

		let speed = 50,
			h = location.href,
			l = h.lastIndexOf("/"),
			c = h.substring(l+1),
			i = 0,
			buildDown,
			buildUp

		if(c == "#iron-man" || c == "#captain-america" || c == "#thor" || c == "#black-widow" || c == "#hulk" || c == "#hawkeye") {
			buildDown = setInterval(function() {
				i++
				history.replaceState( {}, 'Faisal', c.substring(0,c.length-i))
				if(i==c.length) {
					clearInterval(buildDown)

					h = a.href,
					l = h.lastIndexOf("/"),
					c = h.substring(l+1),
					i = 0

					buildUp = setInterval(function() {
						i++
						document.querySelector(c).scrollIntoView()
						history.replaceState( {}, 'Faisal', c.substring(0,i))
						if(i==c.length) {
							deadlock = false
							clearInterval(buildUp)
						}
					}, speed)
				}
			}, speed)
		} else {
			h = a.href,
			l = h.lastIndexOf("/"),
			c = h.substring(l+1),
			i = 0
			document.querySelector(c).scrollIntoView()

			buildUp = setInterval(function() {
				i++
				history.replaceState( {}, 'Faisal', c.substring(0,i))
				if(i==c.length) {
					deadlock = false
					clearInterval(buildUp)
				}
			}, speed)
		}

	}
})
