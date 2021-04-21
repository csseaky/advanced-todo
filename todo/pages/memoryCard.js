import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";

export const MemoryCard = () => {
  const [cardAmount, setCardAmount] = useState(4);
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState(null);
  const [prevClickedCard, setPrevClickedCard] = useState(null);
  const [clicksDisabled, setClicksDisabled] = useState(false);

  const flipCardsAfterTimeout = (prevClickedCard, clickedCardIndex) => {
    let newCards = {};
    setCards((prevState) => {
      Object.keys(prevState).map((cardIndex) => {
        if (prevState[cardIndex] === prevState[prevClickedCard]) {
          newCards[prevClickedCard] = {
            ...prevState[prevClickedCard],
            cardState: "hidden",
          };
        } else if (prevState[cardIndex] === prevState[clickedCardIndex]) {
          newCards[clickedCardIndex] = {
            ...prevState[clickedCardIndex],
            cardState: "hidden",
          };
        } else {
          newCards[cardIndex] = prevState[cardIndex];
        }
      });
      return newCards;
    });
    setClicksDisabled(false);
  };

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
      cardsObject[cardsArray[i]] = {
        picture: randomPictures[randomPictureIndex],
        cardState: "hidden",
      };
      cardsObject[cardsArray[i + 1]] = {
        picture: randomPictures[randomPictureIndex],
        cardState: "hidden",
      };
      randomPictureIndex++;
    }
    setCards(cardsObject);
  }, [cardAmount]);

  const handleCardClick = (clickedCardIndex) => {
    if (clicksDisabled) return;
    clickedCardIndex = Number(clickedCardIndex);
    if (cards[clickedCardIndex].cardState === "done") return;
    if (cards[clickedCardIndex].cardState === "visible") return;
    if (prevClickedCard === null) {
      setPrevClickedCard(clickedCardIndex);
      setCards((prevState) => {
        let newCards = {};
        Object.keys(prevState).map((cardIndex) => {
          if (prevState[cardIndex] === prevState[clickedCardIndex]) {
            newCards[clickedCardIndex] = {
              ...cards[clickedCardIndex],
              cardState: "visible",
            };
          } else {
            newCards[cardIndex] = prevState[cardIndex];
          }
        });
        return newCards;
      });
    } else {
      if (cards[prevClickedCard].picture === cards[clickedCardIndex].picture) {
        setCards((prevState) => {
          let newCards = {};
          Object.keys(prevState).map((cardIndex) => {
            if (prevState[cardIndex] === prevState[clickedCardIndex]) {
              newCards[clickedCardIndex] = {
                ...prevState[clickedCardIndex],
                cardState: "done",
              };
            } else if (prevState[cardIndex] === prevState[prevClickedCard]) {
              newCards[prevClickedCard] = {
                ...prevState[prevClickedCard],
                cardState: "done",
              };
            } else {
              newCards[cardIndex] = prevState[cardIndex];
            }
          });
          setPrevClickedCard(null);
          return newCards;
        });
      } else {
        setCards((prevState) => {
          let newCards = {};
          Object.keys(prevState).map((cardIndex) => {
            if (prevState[cardIndex] === prevState[prevClickedCard]) {
              newCards[prevClickedCard] = {
                ...prevState[prevClickedCard],
                cardState: "visible",
              };
            } else if (prevState[cardIndex] === prevState[clickedCardIndex]) {
              newCards[clickedCardIndex] = {
                ...prevState[clickedCardIndex],
                cardState: "visible",
              };
            } else {
              newCards[cardIndex] = prevState[cardIndex];
            }
          });
          setTimeout(
            flipCardsAfterTimeout,
            1500,
            prevClickedCard,
            clickedCardIndex
          );
          setClicksDisabled(true);
          setPrevClickedCard(null);
          return newCards;
        });
      }
    }
  };
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
              {Object.keys(cards).map((item, index) => {
                return (
                  <div className="card" onClick={(e) => handleCardClick(item)}>
                    {<CardImage item={cards[item]} />}
                  </div>
                );
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

const CardImage = (props) => {
  const { cardState, picture } = props.item;
  if (cardState === "visible")
    return (
      <img
        src={`/cardMatch/${`flowers/${picture}.png`}`}
        alt=""
        className="card-image"
      />
    );
  else if (cardState === "hidden") {
    return <img src={"/cardMatch/hidden.png"} alt="" className="card-image" />;
  } else {
    return (
      <img src={"/cardMatch/download.jpeg"} alt="" className="card-image" />
    );
  }
};
