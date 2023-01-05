const select = document.querySelectorAll('.row')
const alert = document.querySelector('.alert')
let noSelected = 0
const selectedCell = []

function reloadPage () {
  window.location.reload()
}

for (let i = 0; i < select.length; i++) {
  select[i].addEventListener('click', selectPosition)
}

function selectPosition () {
  const id = this.getAttribute('id')

  const selectedIndex = selectedCell.indexOf(id)

  if (selectedIndex >= 0) {
    noSelected--
  } else if (noSelected < 1) {
    this.style.background = 'black'
    selectedCell.push(id)
    noSelected++
  } else if (noSelected < 2) {
    this.style.background = 'rgb(37, 206, 37)'
    selectedCell.push(id)
    noSelected++
    checkAttack();
  } else {
    reloadPage()
  }
}

function attackFunction () {
  if (selectedCell.length !== 2) {
    reloadPage();
  } else {
    const position1 = selectedCell[0]
    const position2 = selectedCell[1]

    const cell11 = position1.split('', position1)[0]
    const cell12 = position1.split('', position1)[1]

    const cell21 = position2.split('', position2)[0]
    const cell22 = position2.split('', position2)[1]

    // horizontal check
    if (cell11 === cell21) {
      return true
    }

    // vertical check
    if (cell12 === cell22) {
      return true
    }

    // diagonal left to right
    if (cell11 - cell12 === cell21 - cell22) {
      return true
    }

    const positionRightLeft = Math.abs(parseInt(position1) - parseInt(position2))

    const moduleRightLeft = positionRightLeft % 9 === 0

    if (moduleRightLeft) {
      return true
    }
    alert.textContent = 'Queen attack not possible!'
    alert.style.color = 'red'
  }
}

function checkAttack () {
  const attack = attackFunction()
  if (attack) {
    alert.textContent = 'Queen Attack Possible!'
  }
}
