import { useState } from 'react';
import { ConnectButton } from 'thirdweb/react';
import { client } from '../client';
import { inAppWallet } from 'thirdweb/wallets';
type Choice = 'Rock' | 'Paper' | 'Scissor';
type Result = 'Win' | 'Lose' | 'Tie';

const choices: Choice[] = ['Rock', 'Paper', 'Scissor'];

const getComputerChoice = (): Choice =>
  choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (
  playerChoice: Choice,
  computerChoice: Choice
): Result => {
  if (playerChoice === computerChoice) return 'Tie';
  if (
    (playerChoice === 'Rock' && computerChoice === 'Scissor') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissor' && computerChoice === 'Paper')
  ) {
    return 'Win';
  }
  return 'Lose';
};

interface GameResult {
  playerChoice: Choice;
  computerChoice: Choice;
  gameResult: Result;
}

export default function RockPaperScissor() {
  const [result, setResult] = useState<GameResult | null>(null);
  const [showPrize, setShowPrize] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [prizeClaimed, setPrizeClaimed] = useState<boolean>(false);
  console.log(showPrize, showModal, prizeClaimed);

  const handleChoice = (playerChoice: Choice) => {
    const computerChoice = getComputerChoice();
    const gameResult = determineWinner(playerChoice, computerChoice);
    setResult({ playerChoice, computerChoice, gameResult });
    setShowPrize(gameResult === 'Win');
  };

  const resetGame = () => {
    setResult(null);
    setShowPrize(false);
    setPrizeClaimed(false);
  };

  const claimPrize = () => {
    setShowModal(true);
  };
  console.log(claimPrize);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f0f0',
        color: '#333',
      }}
    >
      <div
        style={{
          padding: '2rem',
          margin: '0 0.5rem',
          width: '400px',
          maxWidth: '98%',
          height: '400px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          Mini Game
          <ConnectButton
            client={client}
            wallets={[
              inAppWallet({
                auth: {
                  options: ['email'],
                },
              }),
            ]}
          />
        </h1>
        {!result ? (
          <div>
            <h3>Choose your options:</h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                margin: '2rem',
              }}
            >
              {choices.map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleChoice(choice)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '3rem',
                  }}
                >
                  {choice === 'Rock' ? '🪨' : choice === 'Paper' ? '📄' : '✂️'}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p style={{ fontSize: '1.5rem', marginBottom: '-10px' }}>
              You chose: {result.playerChoice}
            </p>
            <p style={{ fontSize: '1.5rem', marginBottom: '-20px' }}>
              Computer chose: {result.computerChoice}
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '2rem' }}>
              Result: {result.gameResult}
            </p>
            <div
              style={{
                position: 'absolute',
                bottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <button
                onClick={resetGame}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
