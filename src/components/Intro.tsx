import React from 'react';

interface IntroProps {
    onStart: () => void;
}

function Intro({ onStart }: IntroProps) {
    return (
        <div className="intro">
            <div className="intro-image">
                <img 
                    src="https://www.vivadayspa.com/wp-content/uploads/2019/08/Viva_Day_Spa_10_GA_170411_571_2000x635.jpg" 
                    alt="Massage relaxant"
                />
            </div>
            <div className="intro-content">
                <h1>Découvrez votre massage idéal</h1>
                <p>En seulement 2 minutes, notre questionnaire personnalisé vous guidera vers le massage qui correspond le mieux à vos besoins actuels.</p>
                <p>Prenez un moment pour vous. Votre bien-être mérite cette attention particulière.</p>
                <button onClick={onStart} className="start-button">
                    Commencer le questionnaire
                </button>
            </div>
        </div>
    );
}

export default Intro; 