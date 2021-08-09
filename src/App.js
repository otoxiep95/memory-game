import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import deepcopy from "deepcopy";
import './App.css';
import Card from './components/Card';

function App() {

  const cardsIconNames = ['animal1', 'animal2', 'animal3', 'animal4', 'animal5', 'animal6']
  const [cards, setCards] = useState([])
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [points, setPoints] = useState(0)
  const [wins, setWins] = useState(0)
  const [loading, setIsLoading] = useState(true)



  const onSuccess = () => {
    console.log('success')
    setAttempts(attempts + 1)
    setPoints(points + 10)
    const firstCardId = firstCard.id
    const secondCardId = secondCard.id
    setCardCanFlip(firstCardId, false)
    setCardCanFlip(secondCardId, false)
    setCardIsFlipped(firstCardId, false)
    setCardIsFlipped(secondCardId, false)
    setFirstCard(null)
    setSecondCard(null)
    //resetCardChosen()
  }

  const onFailure = () => {
    console.log('failure')
    setAttempts(attempts + 1)
    const firstCardId = firstCard.id
    const secondCardId = secondCard.id
    setCardIsWrong(firstCardId, true)
    setCardIsWrong(secondCardId, true)
    //setTimeout(() => {
    //  setCardIsFlipped(firstCardId, true);
    //}, 2000);
    //setTimeout(() => {
    //  setCardIsFlipped(secondCardId, true);
    //}, 2000);

    setTimeout(() => {
      //setCardIsWrong(firstCardId, false)
      //setCardIsWrong(secondCardId, false)
      //setCardIsFlipped(firstCardId, true);
      //setCardIsFlipped(secondCardId, true);
      resetCardChosen()
    }, 2000)
  }

  const resetCardChosen = () => {
    const firstCardId = firstCard.id
    const secondCardId = secondCard.id
    setCardIsWrong(firstCardId, false)
    setCardIsWrong(secondCardId, false)
    setCardIsFlipped(firstCardId, true);
    setCardIsFlipped(secondCardId, true);
    setFirstCard(null)
    setSecondCard(null)
  }

  const onCardClicked = (card) => {
    console.log(card)
    if (!card.canFlip) {
      return;
    }
    //let firstCard = firstCard ? firstCard : null;
    let firstCardId = firstCard ? firstCard.id : null;
    //let secondCard = secondCard ? secondCard : null;
    let secondCardId = secondCard ? secondCard.id : null;
    console.log(firstCard, "first card selected")
    console.log(secondCard, "second card selected")
    if ((firstCard && (card.id === firstCardId) || (secondCard && (card.id === secondCardId)))) {
      return;
    }

    setCardIsFlipped(card.id, false)

    if (firstCard) {
      console.log('set second card')
      setSecondCard(card)


    } else {
      console.log('set first card to', card)
      setFirstCard(card)
      console.log(firstCard)
    }

  }

  const setCardIsFlipped = (id, isFlipped) => {
    let cardsArray = cards
    console.log(id)
    cardsArray.forEach((card) => {
      if (card.id === id) {
        console.log(card)
        card.isFlipped = isFlipped
      }
    });
    setCards(cardsArray)
  }

  const setCardIsWrong = (id, isWrong) => {
    console.log('set red color')
    let cardsArray = cards
    cardsArray.forEach(card => {
      if (card.id === id) {
        card.isWrong = isWrong
      }
    });
    setCards(cardsArray)

  }

  const flipAllCards = () => {
    let cardsArray = cards
    cardsArray.forEach(card => {
      card.isFlipped = true
    });
    setCards(cardsArray)
  }

  const setCardCanFlip = (id, canFlip) => {
    let cardsArray = cards
    cardsArray.forEach((card) => {
      if (card.id === id) {
        card.canFlip = canFlip
      }
    });
    setCards(cardsArray)
  }

  const cardsMatchCheck = () => {
    console.log(firstCard)
    let firstCardSelected = firstCard;
    let secondCardSelected = secondCard;


    (firstCardSelected.pair === secondCardSelected.pair) ? onSuccess() : onFailure()

  }

  const generateCards = () => {

    let cards = cardsIconNames.map((card) => ({
      id: uuidv4(),
      isWrong: false,
      isFlipped: false,
      canFlip: true,
      imageURL: "../icons/" + card + ".png",
      pair: card
    })).flatMap((e) => [e, { ...deepcopy(e), id: uuidv4() }])
    return cards
  }

  useEffect(() => {
    console.log('init game')
    let playCards = generateCards(cardsIconNames.length).sort(() => Math.random() - 0.5);
    setCards(playCards)
    setIsLoading(false)

  }, [wins])

  useEffect(() => {
    console.log('flip')

    setTimeout(() => {
      flipAllCards()
    }, 5000);


  }, [loading])


  useEffect(() => {
    if (firstCard && secondCard) {
      cardsMatchCheck()
    }
  }, [secondCard])

  useEffect(() => {
    if (points === 60) {
      setIsLoading(true)
      setWins(wins + 1)
      setPoints(0)
      setAttempts(0)
      setCards([])
    }
  }, [points])

  const cardsElem = cards.map((card) => {
    return <Card onClick={() => onCardClicked(card)} key={card.id} {...card} />
  })

  return (
    <div className="App">
      <div className='header'>
        <h2>Attempts: {attempts}</h2>
        <h2>Points: {points}</h2>
        <h2>Wins: {wins}</h2>
      </div>
      <div className='game-container'>
        {cardsElem}
      </div>
    </div>
  );

}

export default App;
