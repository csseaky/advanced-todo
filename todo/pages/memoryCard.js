import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";

export const MemoryCard = () => {
  const [cardAmount, setCardAmount] = useState(4);
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    let cardsObject = {};
    let cardsArray = Array.from(Array(cardAmount).keys());
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    let randomPictures = new Set();
    while (randomPictures.size < cardAmount / 2) {
      randomPictures.add(Math.floor(Math.random() * 16) + 1);
    }
    randomPictures = Array.from(randomPictures);
    let randomPictureIndex = 0;
    for (let i = 0; i < cardAmount; i += 2) {
      cardsObject[cardsArray[i]] = randomPictures[randomPictureIndex];
      cardsObject[cardsArray[i + 1]] = randomPictures[randomPictureIndex];
      randomPictureIndex++;
    }
    let cardsArrayFromObject = [];
    Object.keys(cardsObject).forEach((item, index) => {
      cardsArrayFromObject.push(cardsObject[item]);
    });
    setCards(cardsArrayFromObject);
  }, [cardAmount]);
  return (
    <div>
      <Navbar navbarIsStatic="true"></Navbar>
      <div className="cardmatching-main">
        <div className="cardmatching-game">
          {!gameStarted ? (
            <div className="game-setup">
              <label htmlFor="amountOfCard">Select amount of cards</label>
              <input
                type="number"
                id="amountOfCards"
                min="4"
                max="16"
                step="2"
                value={cardAmount}
                onChange={(e) => {
                  setCardAmount(Number(e.target.value));
                }}
                style={{ alignSelf: "flex-start" }}
              />
              <button
                onClick={() => setGameStarted(true)}
                style={{ alignSelf: "flex-start" }}
              >
                Start
              </button>
            </div>
          ) : (
            <div className="game">
              {cards.map((cardNumber, index) => {
                return <Card id={index} number={cardNumber} />;
              })}
            </div>
          )}
        </div>
        <div className="cardmatching-explanation">
          <h1 style={{ alignSelf: "center" }}>
            Select game options, then start matching!
          </h1>
          <p>
            Matching and Memory Games: improve concentration train visual memory
            increase short term memory increase attention to detail improve the
            ability to find similarities and differences in objects help to
            classify objects that are grouped by similar traits improve
            vocabulary
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;

const Card = ({ number }) => {
  console.log(number);
  return (
    <div className="card">
      <img
        src={`cardMatch/flowers/${number}.png`}
        alt=""
        className="card-image"
      />
    </div>
  );
};
