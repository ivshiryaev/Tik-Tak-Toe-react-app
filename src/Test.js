import React from 'react'

const products = [
	{ title: "Carrot", id:1	},
	{ title: "Apple", id:2	},
	{ title: "Juice", id:3	},
]

const listItems = products.map(item => {
	return(
		<li key={item.id}>{item.title}</li>
	)
})

const listStyle = {
	"listStyleType":"none"
}

function Test() {
	return (
		<div className="Holodilnik">
			<ul style={listStyle}>
				{listItems}
			</ul>
		</div>
	)
}

export default Test