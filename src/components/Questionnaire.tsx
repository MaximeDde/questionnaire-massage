import React, { useState } from 'react';
import { Question, Result } from '../types/quiz';

function Questionnaire() {
    const questions: Question[] = [
        {
            id: 'q1',
            question: 'État général : Comment vous sentez-vous en ce moment ?',
            options: [
                'A. Très tendu(e), stressé(e), à fleur de peau.',
                'B. Un peu fatigué(e), manque d’énergie, léger déséquilibre général.',
                'C. Assez bien, mais quelques douleurs musculaires ou raideurs.',
                'D. Sensation de stagnation, besoin d’un « reset » ou de renouveler mon énergie.',
            ],
        },
        {
            id: 'q2',
            question: 'Relation avec votre corps : Vous cherchez avant tout à…',
            options: [
                'A. Vous reconnecter en douceur à votre corps, vous sentir enveloppé(e) et rassuré(e).',
                'B. Rééquilibrer vos énergies internes, harmoniser votre corps et votre esprit.',
                'C. Libérer des tensions musculaires, gagner en souplesse.',
                'D. Améliorer votre circulation, stimuler certaines fonctions internes sans forcément masser tout le corps.',
            ],
        },
        {
            id: 'q3',
            question: 'Vos préférences en termes d\'intensité du massage :',
            options: [
                'A. Plutôt léger, doux, très relaxant.',
                'B. Intermédiaire, avec un mélange de pressions douces et plus appuyées.',
                'C. Plus ferme, voire tonique, éventuellement avec des étirements.',
                'D. Pressions ciblées sur des points précis, mais dans l\'ensemble plutôt modérées.',
            ],
        },
        {
            id: 'q4',
            question: 'Votre intérêt pour une approche traditionnelle ou spirituelle :',
            options: [
                'A. J\'aime l\'idée d\'un massage qui me permette de lâcher prise émotionnellement.',
                'B. Je suis attiré(e) par une approche holistique, liée à des traditions de santé globale (ayurvéda, énergie vitale…).',
                'C. Je ne suis pas nécessairement en quête de spiritualité, je veux surtout soulager des tensions physiques.',
                'D. Je suis ouvert(e) aux approches énergétiques indirectes (via les pieds, par exemple), mais sans chercher une dimension fortement spirituelle.',
            ],
        },
        {
            id: 'q5',
            question: 'Situation personnelle :',
            options: [
                'A. Je suis en période de stress intense, j\'ai besoin de douceur.',
                'B. Je traverse une période de déséquilibre (digestion, sommeil), j\'aimerais un rééquilibrage.',
                'C. Je pratique une activité sportive régulière ou j\'ai des tensions musculaires récurrentes.',
                'D. J\'aimerais un massage qui travaille par zones réflexes plutôt que sur tout le corps.',
            ],
        },
        {
            id: 'q6',
            question: 'Contexte particulier :',
            options: [
                'A. Aucun contexte particulier, juste besoin de détente émotionnelle.',
                'B. J\'aime les voyages et les traditions venues d\'ailleurs, découvrir quelque chose d\'exotique et harmonisant.',
                'C. Je suis enceinte ou je souhaite un massage adapté à une situation corporelle spécifique (grossesse).',
                'D. Je veux un massage innovant ou différent (intérêt pour les pressions ciblées, les étirements, etc.).',
            ],
        }
        // ... autres questions ...
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<Result | null>(null);

    const calculateResult = () => {
        // Extraire uniquement la lettre (A, B, C ou D) de chaque réponse
        const letterAnswers = answers.map(answer => answer.charAt(0));
        
        // Compter les occurrences de chaque lettre
        const answerCounts = letterAnswers.reduce((acc, letter) => {
            acc[letter] = (acc[letter] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        // Trouver la lettre la plus fréquente
        const mostCommonLetter = Object.entries(answerCounts)
            .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

        let calculatedResult: Result;

        switch (mostCommonLetter) {
            case 'A':
                calculatedResult = {
                    title: 'Massage Californien ou Future Maman',
                    description: 'Vous aspirez à une profonde relaxation, un cocon de douceur, une enveloppe sécurisante. Le massage californien (ou massage future maman si vous êtes enceinte) vous apportera une détente émotionnelle et une libération des tensions en douceur.',
                    massageType: 'Massage californien ou future maman',
                };
                break;
            case 'B':
                calculatedResult = {
                    title: 'Massage Ayurvédique ou Balinais',
                    description: 'Vous cherchez une harmonisation globale et un rééquilibrage de vos énergies. Les traditions orientales comme le massage ayurvédique ou balinais vous correspondent parfaitement, offrant une expérience holistique et équilibrante.',
                    massageType: 'Massage ayurvédique ou balinais',
                };
                break;
            case 'C':
                calculatedResult = {
                    title: 'Massage Suédois ou Thaïlandais',
                    description: 'Vous avez des tensions musculaires à soulager et recherchez un massage plus dynamique. Le massage suédois ou thaïlandais sera idéal pour améliorer votre circulation, votre souplesse et soulager vos tensions musculaires.',
                    massageType: 'Massage suédois ou thaïlandais',
                };
                break;
            case 'D':
                calculatedResult = {
                    title: 'Réflexologie Plantaire',
                    description: 'Vous préférez une approche ciblée et énergétique. La réflexologie plantaire vous permettra de travailler sur vos organes internes via les zones réflexes des pieds, pour un rééquilibrage global.',
                    massageType: 'Réflexologie plantaire',
                };
                break;
            default:
                calculatedResult = {
                    title: 'Massage Personnalisé',
                    description: 'Vos besoins sont variés. Nous vous recommandons de discuter avec notre praticien pour définir le massage le plus adapté à vos attentes.',
                    massageType: 'À définir ensemble',
                };
        }

        setResult(calculatedResult);
        setShowResult(true);
    };

    const handleAnswer = (answer: string) => {
        setAnswers([...answers, answer]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult();
        }
    };

    return (
        <div className="questionnaire">
            {showResult && result ? (
                <div className="result">
                    <h2>{result.title}</h2>
                    <p>{result.description}</p>
                    <button 
                        onClick={() => window.location.href = 'https://www.divenliespa.fr/réservation/'}
                        className="cta-button"
                    >
                        Prendre rendez-vous
                    </button>
                </div>
            ) : (
                <div className="question-container">
                    <h2>{questions[currentQuestionIndex].question}</h2>
                    <div className="options-container">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button 
                                key={index} 
                                onClick={() => handleAnswer(option)}
                                className="option-button"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Questionnaire; 