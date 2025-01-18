import React, { useState, useEffect, useCallback } from 'react';

const KeypressTest = ({ onComplete }) => {
    const [currentKey, setCurrentKey] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [scores, setScores] = useState([]);
    const [round, setRound] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const keys = ['A', 'S', 'D', 'F', 'J', 'K', 'L'];
    const totalRounds = 5;

    const startTest = () => {
        setScores([]);
        setRound(0);
        setShowResults(false);
        setIsWaiting(true);
        setTimeout(() => startRound(), 1000); // Delay before the first round
    };

    const startRound = useCallback(() => {
        if (round >= totalRounds) {
            setShowResults(true);
            return;
        }

        setIsWaiting(true);
        setTimeout(() => {
            const newKey = keys[Math.floor(Math.random() * keys.length)];
            setCurrentKey(newKey);
            setStartTime(Date.now());
            setIsWaiting(false);
            setRound((prev) => prev + 1);
        }, 1000); // Delay before showing the key
    }, [keys, round]);

    const handleKeyPress = useCallback(
        (e) => {
            if (isWaiting || !currentKey || e.key.toUpperCase() !== currentKey) return;

            const reactionTime = Date.now() - startTime;
            setScores((prevScores) => [...prevScores, reactionTime]);
            setIsWaiting(true);

            setTimeout(() => {
                startRound();
            }, 3000); // 3-second interval before the next key
        },
        [currentKey, isWaiting, startTime, startRound]
    );

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [handleKeyPress]);

    const handleSubmit = () => {
        const averageTime = scores.length
            ? scores.reduce((a, b) => a + b) / scores.length
            : 0;

        onComplete({
            type: 'keypress',
            scores,
            average: averageTime,
        });
    };

    const averageReactionTime = scores.length
        ? Math.round(scores.reduce((a, b) => a + b) / scores.length)
        : 0;

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #58cc02 0%, #1cb0f6 100%)',
                padding: '2rem',
            }}
        >
            <div
                style={{
                    width: '600px', // Fixed width
                    background: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                    padding: '2rem',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                {round === 0 ? (
                    <div>
                        <h1
                            style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: '#333',
                                marginBottom: '1rem',
                            }}
                        >
                            Test Your Keypress Speed
                        </h1>
                        <p
                            style={{
                                fontSize: '1.2rem',
                                color: '#555',
                                marginBottom: '2rem',
                            }}
                        >
                            Press the key shown on screen as quickly as possible!
                        </p>
                        <button
                            onClick={startTest}
                            style={{
                                fontSize: '1.2rem',
                                padding: '0.8rem 2rem',
                                background: '#58cc02',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            Start Test
                        </button>
                    </div>
                ) : (
                    <>
                        <div>
                            <h1
                                style={{
                                    fontSize: '5rem',
                                    fontWeight: 'bold',
                                    color: isWaiting ? '#aaa' : '#1cb0f6',
                                    margin: '2rem 0',
                                }}
                            >
                                {isWaiting ? '...' : currentKey}
                            </h1>
                        </div>
                        <p
                            style={{
                                fontSize: '1.2rem',
                                color: '#555',
                                marginBottom: '1rem',
                            }}
                        >
                            Round: {round}/{totalRounds}
                        </p>
                    </>
                )}

                {showResults && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: '#fff',
                            padding: '2rem',
                            borderRadius: '10px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            textAlign: 'center',
                            width: '400px', // Fixed width for the modal
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: '#58cc02',
                                marginBottom: '1rem',
                            }}
                        >
                            Test Complete!
                        </h2>
                        <p
                            style={{
                                fontSize: '1.5rem',
                                color: '#333',
                                marginBottom: '1rem',
                            }}
                        >
                            Average Reaction Time: {averageReactionTime} ms
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button
                                onClick={() => {
                                    setShowResults(false);
                                    setRound(0);
                                    setScores([]);
                                }}
                                style={{
                                    padding: '0.8rem 2rem',
                                    fontSize: '1rem',
                                    background: '#fff',
                                    border: '2px solid #58cc02',
                                    color: '#58cc02',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Try Again
                            </button>
                            <button
                                onClick={handleSubmit}
                                style={{
                                    padding: '0.8rem 2rem',
                                    fontSize: '1rem',
                                    background: '#58cc02',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Submit Results
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeypressTest;
