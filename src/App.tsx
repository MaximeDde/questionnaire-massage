import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Intro from './components/Intro';

function App() {
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);

    return (
        <div className="app">
            {showQuestionnaire ? (
                <Questionnaire />
            ) : (
                <Intro onStart={() => setShowQuestionnaire(true)} />
            )}
        </div>
    );
}

export default App;
