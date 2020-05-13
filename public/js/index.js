document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault()
	const name = document.getElementById('first').value
	const id = document.getElementById('second').value
	fetch(`http://localhost:3000/search?name=${name}&id=${id}`).then((res) => {
		res.json().then((data) => {
			let divElement = document.getElementById('result')
			divElement.innerHTML = ''
			document.getElementById('outer').style.display = 'block'
			if(data.error) {
				let para = document.createElement("p")
				let node = document.createTextNode(data.error)
				para.appendChild(node)
				divElement.appendChild(para)
			} else {
				const arr = Object.keys(data).map((key) => {
					return [key, data[key]]
				})
				arr.forEach((ele, indx) => {
					let para = document.createElement("p")
					let node = document.createTextNode(ele[0].toUpperCase() + ' : ' + ele[1])
					para.appendChild(node)
					divElement.appendChild(para)
				})
			}
		})
	})
})