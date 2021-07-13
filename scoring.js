const calculateScore = (player) => {
  const { position } = player
  switch (position) {
    case 'QB':
      return handleQB(player)
      break;
    case 'RB':
    case 'WR':
      return handleRBAndWR(player)
      break;
    case 'TE':
      return handleTE(player)
      break;
    default:
      return 0
  }
}

// QB Point Handler
const handleQB = (player) => {
  // Obtaining individual player stats needed
  const { stats: { passing, rushing } } = player
  const { yards: passingYards, touchdowns: passingTDs, interceptions } = passing
  const { yards: rushingYards, touchdowns: rushingTDs, fumbles } = rushing

  // Calculating points by category
  const passingPts = (passingYards / 25) + (passingTDs * 6)
  const rushingPts = (rushingYards / 10) + (rushingTDs * 6)
  const intAndFumblesPts = (interceptions + fumbles) * 3

  // Calculating total points
  const totalPts = (passingPts + rushingPts) - intAndFumblesPts

  return totalPts
}

const handleRBAndWR = (player) => {
  // Obtaining individual player stats needed
  const { stats: { rushing, receiving, return: { kickreturn, puntreturn } } } = player
  const { yards: rushingYards, touchdowns: rushingTDs, fumbles: rushingFumbles } = rushing
  const { yards: receivingYards, touchdowns: receivingTDs, receptions, fumbles: receivingFumbles } = receiving
  const { yards: kickReturnYards, touchdowns: kickReturnTDs, fumbles: kickReturnFumbles } = kickreturn
  const { yards: puntReturnYards, touchdowns: puntReturnTDs, fumbles: puntReturnFumbles } = puntreturn

  // Calculating points by category
  const rushingPts = (rushingYards / 10) + (rushingTDs * 6)
  const receivingPts = (receptions) + (receivingYards / 10) + (receivingTDs * 6)
  const returnPts = ((kickReturnYards + puntReturnYards) / 15) + ((kickReturnTDs + puntReturnTDs) * 6)
  const intAndFumblesPts = (rushingFumbles + receivingFumbles + kickReturnFumbles + puntReturnFumbles) * 3

  // Calculating total points
  const totalPts = (rushingPts + receivingPts + returnPts) - intAndFumblesPts

  return totalPts
}

const handleTE = (player) => {
  // Obtaining individual player stats needed
  const { stats: { receiving } } = player
  const { yards: receivingYards, touchdowns: receivingTDs, receptions, fumbles: receivingFumbles } = receiving

  // Calculating points by category
  const receivingPts = (receptions) + (receivingYards / 10) + (receivingTDs * 6)
  const intAndFumblesPts = (receivingFumbles) * 3

  // Calculating total points
  const totalPts = (receivingPts) - intAndFumblesPts

  return totalPts
}


module.exports = calculateScore


