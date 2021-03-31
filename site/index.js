const root = document.getElementById('root')
root.style.margin = '0'
root.style.backgroundColor = 'lightgrey'
const header = document.createElement('header')
const h1 = document.createElement('h1')

h1.innerHTML = 'Poker'
h1.style.backgroundColor = 'red'
h1.style.margin = '0'
h1.style.padding = '1rem'
header.appendChild(h1)
header.style.textAlign = 'center'
header.style.fontSize = ''

root.appendChild(header)
