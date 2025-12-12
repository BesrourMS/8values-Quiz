import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

// Data from the provided files
const questions = [
  { question: "Oppression by corporations is more of a concern than oppression by governments.", effect: { econ: 10, dipl: 0, govt: -5, scty: 0 } },
  { question: "It is necessary for the government to intervene in the economy to protect consumers.", effect: { econ: 10, dipl: 0, govt: 0, scty: 0 } },
  { question: "The freer the markets, the freer the people.", effect: { econ: -10, dipl: 0, govt: 0, scty: 0 } },
  { question: "It is better to maintain a balanced budget than to ensure welfare for all citizens.", effect: { econ: -10, dipl: 0, govt: 0, scty: 0 } },
  { question: "Publicly-funded research is more beneficial to the people than leaving it to the market.", effect: { econ: 10, dipl: 0, govt: 0, scty: 10 } },
  { question: "Tariffs on international trade are important to encourage local production.", effect: { econ: 5, dipl: 0, govt: -10, scty: 0 } },
  { question: "From each according to his ability, to each according to his needs.", effect: { econ: 10, dipl: 0, govt: 0, scty: 0 } },
  { question: "It would be best if social programs were abolished in favor of private charity.", effect: { econ: -10, dipl: 0, govt: 0, scty: 0 } },
  { question: "Taxes should be increased on the rich to provide for the poor.", effect: { econ: 10, dipl: 0, govt: 0, scty: 0 } },
  { question: "Inheritance is a legitimate form of wealth.", effect: { econ: -10, dipl: 0, govt: 0, scty: -5 } },
  { question: "Basic utilities like roads and electricity should be publicly owned.", effect: { econ: 10, dipl: 0, govt: 0, scty: 0 } },
  { question: "Government intervention is a threat to the economy.", effect: { econ: -10, dipl: 0, govt: 0, scty: 0 } },
  { question: "Those with a greater ability to pay should receive better healthcare.", effect: { econ: -10, dipl: 0, govt: 0, scty: 0 } },
  { question: "Quality education is a right of all people.", effect: { econ: 10, dipl: 0, govt: 0, scty: 5 } },
  { question: "The means of production should belong to the workers who use them.", effect: { econ: 10, dipl: 0, govt: 0, scty: 0 } },
  { question: "The United Nations should be abolished.", effect: { econ: 0, dipl: -10, govt: -5, scty: 0 } },
  { question: "Military action by our nation is often necessary to protect it.", effect: { econ: 0, dipl: -10, govt: -10, scty: 0 } },
  { question: "I support regional unions, such as the European Union.", effect: { econ: -5, dipl: 10, govt: 10, scty: 5 } },
  { question: "It is important to maintain our national sovereignty.", effect: { econ: 0, dipl: -10, govt: -5, scty: 0 } },
  { question: "A united world government would be beneficial to mankind.", effect: { econ: 0, dipl: 10, govt: 0, scty: 0 } },
  { question: "It is more important to retain peaceful relations than to further our strength.", effect: { econ: 0, dipl: 10, govt: 0, scty: 0 } },
  { question: "Wars do not need to be justified to other countries.", effect: { econ: 0, dipl: -10, govt: -10, scty: 0 } },
  { question: "Military spending is a waste of money.", effect: { econ: 0, dipl: 10, govt: 10, scty: 0 } },
  { question: "International aid is a waste of money.", effect: { econ: -5, dipl: -10, govt: 0, scty: 0 } },
  { question: "My nation is great.", effect: { econ: 0, dipl: -10, govt: 0, scty: 0 } },
  { question: "Research should be conducted on an international scale.", effect: { econ: 0, dipl: 10, govt: 0, scty: 10 } },
  { question: "Governments should be accountable to the international community.", effect: { econ: 0, dipl: 10, govt: 5, scty: 0 } },
  { question: "Even when protesting an authoritarian government, violence is not acceptable.", effect: { econ: 0, dipl: 5, govt: -5, scty: 0 } },
  { question: "My religious values should be spread as much as possible.", effect: { econ: 0, dipl: -5, govt: -10, scty: -10 } },
  { question: "Our nation's values should be spread as much as possible.", effect: { econ: 0, dipl: -10, govt: -5, scty: 0 } },
  { question: "It is very important to maintain law and order.", effect: { econ: 0, dipl: -5, govt: -10, scty: -5 } },
  { question: "The general populace makes poor decisions.", effect: { econ: 0, dipl: 0, govt: -10, scty: 0 } },
  { question: "Physician-assisted suicide should be legal.", effect: { econ: 0, dipl: 0, govt: 10, scty: 0 } },
  { question: "The sacrifice of some civil liberties is necessary to protect us from acts of terrorism.", effect: { econ: 0, dipl: 0, govt: -10, scty: 0 } },
  { question: "Government surveillance is necessary in the modern world.", effect: { econ: 0, dipl: 0, govt: -10, scty: 0 } },
  { question: "The very existence of the state is a threat to our liberty.", effect: { econ: 0, dipl: 0, govt: 10, scty: 0 } },
  { question: "Regardless of political opinions, it is important to side with your country.", effect: { econ: 0, dipl: -10, govt: -10, scty: -5 } },
  { question: "All authority should be questioned.", effect: { econ: 0, dipl: 0, govt: 10, scty: 5 } },
  { question: "A hierarchical state is best.", effect: { econ: 0, dipl: 0, govt: -10, scty: 0 } },
  { question: "It is important that the government follows the majority opinion, even if it is wrong.", effect: { econ: 0, dipl: 0, govt: 10, scty: 0 } },
  { question: "The stronger the leadership, the better.", effect: { econ: 0, dipl: -10, govt: -10, scty: 0 } },
  { question: "Democracy is more than a decision-making process.", effect: { econ: 0, dipl: 0, govt: 10, scty: 0 } },
  { question: "Environmental regulations are essential.", effect: { econ: 5, dipl: 0, govt: 0, scty: 10 } },
  { question: "A better world will come from automation, science, and technology.", effect: { econ: 0, dipl: 0, govt: 0, scty: 10 } },
  { question: "Children should be educated in religious or traditional values.", effect: { econ: 0, dipl: 0, govt: -5, scty: -10 } },
  { question: "Traditions are of no value on their own.", effect: { econ: 0, dipl: 0, govt: 0, scty: 10 } },
  { question: "Religion should play a role in government.", effect: { econ: 0, dipl: 0, govt: -10, scty: -10 } },
  { question: "Churches should be taxed the same way other institutions are taxed.", effect: { econ: 5, dipl: 0, govt: 0, scty: 10 } },
  { question: "Climate change is currently one of the greatest threats to our way of life.", effect: { econ: 0, dipl: 0, govt: 0, scty: 10 } },
  { question: "It is important that we work as a united world to combat climate change.", effect: { econ: 0, dipl: 10, govt: 0, scty: 10 } },
  { question: "Society was better many years ago than it is now.", effect: { econ: 0, dipl: 0, govt: 0, scty: -10 } },
  { question: "It is important that we maintain the traditions of our past.", effect: { econ: 0, dipl: 0, govt: 0, scty: -10 } },
  { question: "It is important that we think in the long term, beyond our lifespans.", effect: { econ: 0, dipl: 0, govt: 0, scty: 10 } },
  { question: "Reason is more important than maintaining our culture.", effect: { econ: 0, dipl: 0, govt: 0, scty: 10 } },
  { question: "Drug use should be legalized or decriminalized.", effect: { econ: 0, dipl: 0, govt: 10, scty: 2 } },
  { question: "Same-sex marriage should be legal.", effect: { econ: 0, dipl: 0, govt: 10, scty: 10 } },
  { question: "No cultures are superior to others.", effect: { econ: 0, dipl: 10, govt: 5, scty: 10 } },
  { question: "Sex outside marriage is immoral.", effect: { econ: 0, dipl: 0, govt: -5, scty: -10 } },
  { question: "If we accept migrants at all, it is important that they assimilate into our culture.", effect: { econ: 0, dipl: 0, govt: -5, scty: -10 } },
  { question: "Abortion should be prohibited in most or all cases.", effect: { econ: 0, dipl: 0, govt: -10, scty: -10 } },
  { question: "Gun ownership should be prohibited for those without a valid reason.", effect: { econ: 0, dipl: 0, govt: -10, scty: 0 } },
  { question: "I support single-payer, universal healthcare.", effect: { econ: 10, dipl: 0, govt: 0, scty: 0 } },
  { question: "Prostitution should be illegal.", effect: { econ: 0, dipl: 0, govt: -10, scty: -10 } },
  { question: "Maintaining family values is essential.", effect: { econ: 0, dipl: 0, govt: 0, scty: -10 } },
  { question: "To chase progress at all costs is dangerous.", effect: { econ: 0, dipl: 0, govt: 0, scty: -10 } },
  { question: "Genetic modification is a force for good, even on humans.", effect: { econ: 0, dipl: 0, govt: 0, scty: 10 } },
  { question: "We should open our borders to immigration.", effect: { econ: 0, dipl: 10, govt: 10, scty: 0 } },
  { question: "Governments should be as concerned about foreigners as they are about their own citizens.", effect: { econ: 0, dipl: 10, govt: 0, scty: 0 } },
  { question: "All people - regardless of factors like culture or sexuality - should be treated equally.", effect: { econ: 10, dipl: 10, govt: 10, scty: 10 } },
  { question: "It is important that we further my group's goals above all others.", effect: { econ: -10, dipl: -10, govt: -10, scty: -10 } }
];

const ideologies = [
  { name: "Anarcho-Communism", stats: { econ: 100, dipl: 50, govt: 100, scty: 90 } },
  { name: "Libertarian Communism", stats: { econ: 100, dipl: 70, govt: 80, scty: 80 } },
  { name: "Trotskyism", stats: { econ: 100, dipl: 100, govt: 60, scty: 80 } },
  { name: "Marxism", stats: { econ: 100, dipl: 70, govt: 40, scty: 80 } },
  { name: "De Leonism", stats: { econ: 100, dipl: 30, govt: 30, scty: 80 } },
  { name: "Leninism", stats: { econ: 100, dipl: 40, govt: 20, scty: 70 } },
  { name: "Stalinism/Maoism", stats: { econ: 100, dipl: 20, govt: 0, scty: 60 } },
  { name: "Religious Communism", stats: { econ: 100, dipl: 50, govt: 30, scty: 30 } },
  { name: "State Socialism", stats: { econ: 80, dipl: 30, govt: 30, scty: 70 } },
  { name: "Theocratic Socialism", stats: { econ: 80, dipl: 50, govt: 30, scty: 20 } },
  { name: "Religious Socialism", stats: { econ: 80, dipl: 50, govt: 70, scty: 20 } },
  { name: "Democratic Socialism", stats: { econ: 80, dipl: 50, govt: 50, scty: 80 } },
  { name: "Revolutionary Socialism", stats: { econ: 80, dipl: 20, govt: 50, scty: 70 } },
  { name: "Libertarian Socialism", stats: { econ: 80, dipl: 80, govt: 80, scty: 80 } },
  { name: "Anarcho-Syndicalism", stats: { econ: 80, dipl: 50, govt: 100, scty: 80 } },
  { name: "Left-Wing Populism", stats: { econ: 60, dipl: 40, govt: 30, scty: 70 } },
  { name: "Theocratic Distributism", stats: { econ: 60, dipl: 40, govt: 30, scty: 20 } },
  { name: "Distributism", stats: { econ: 60, dipl: 50, govt: 50, scty: 20 } },
  { name: "Social Liberalism", stats: { econ: 60, dipl: 60, govt: 60, scty: 80 } },
  { name: "Christian Democracy", stats: { econ: 60, dipl: 60, govt: 50, scty: 30 } },
  { name: "Social Democracy", stats: { econ: 60, dipl: 70, govt: 60, scty: 80 } },
  { name: "Progressivism", stats: { econ: 60, dipl: 80, govt: 60, scty: 100 } },
  { name: "Anarcho-Mutualism", stats: { econ: 60, dipl: 50, govt: 100, scty: 70 } },
  { name: "National Totalitarianism", stats: { econ: 50, dipl: 20, govt: 0, scty: 50 } },
  { name: "Global Totalitarianism", stats: { econ: 50, dipl: 80, govt: 0, scty: 50 } },
  { name: "Technocracy", stats: { econ: 60, dipl: 60, govt: 20, scty: 70 } },
  { name: "Centrist", stats: { econ: 50, dipl: 50, govt: 50, scty: 50 } },
  { name: "Liberalism", stats: { econ: 50, dipl: 60, govt: 60, scty: 60 } },
  { name: "Religious Anarchism", stats: { econ: 50, dipl: 50, govt: 100, scty: 20 } },
  { name: "Right-Wing Populism", stats: { econ: 40, dipl: 30, govt: 30, scty: 30 } },
  { name: "Moderate Conservatism", stats: { econ: 40, dipl: 40, govt: 50, scty: 30 } },
  { name: "Reactionary", stats: { econ: 40, dipl: 40, govt: 40, scty: 10 } },
  { name: "Social Libertarianism", stats: { econ: 60, dipl: 70, govt: 80, scty: 70 } },
  { name: "Libertarianism", stats: { econ: 40, dipl: 60, govt: 80, scty: 60 } },
  { name: "Anarcho-Egoism", stats: { econ: 40, dipl: 50, govt: 100, scty: 50 } },
  { name: "Autocracy", stats: { econ: 50, dipl: 20, govt: 20, scty: 50 } },
  { name: "Fascism", stats: { econ: 40, dipl: 20, govt: 20, scty: 20 } },
  { name: "Capitalist Fascism", stats: { econ: 20, dipl: 20, govt: 20, scty: 20 } },
  { name: "Conservatism", stats: { econ: 30, dipl: 40, govt: 40, scty: 20 } },
  { name: "Neo-Liberalism", stats: { econ: 30, dipl: 30, govt: 50, scty: 60 } },
  { name: "Classical Liberalism", stats: { econ: 30, dipl: 60, govt: 60, scty: 80 } },
  { name: "Authoritarian Capitalism", stats: { econ: 20, dipl: 30, govt: 20, scty: 40 } },
  { name: "State Capitalism", stats: { econ: 20, dipl: 50, govt: 30, scty: 50 } },
  { name: "Neo-Conservatism", stats: { econ: 20, dipl: 20, govt: 40, scty: 20 } },
  { name: "Fundamentalism", stats: { econ: 20, dipl: 30, govt: 30, scty: 5 } },
  { name: "Libertarian Capitalism", stats: { econ: 20, dipl: 50, govt: 80, scty: 60 } },
  { name: "Market Anarchism", stats: { econ: 20, dipl: 50, govt: 100, scty: 50 } },
  { name: "Objectivism", stats: { econ: 10, dipl: 50, govt: 90, scty: 40 } },
  { name: "Totalitarian Capitalism", stats: { econ: 0, dipl: 30, govt: 0, scty: 50 } },
  { name: "Ultra-Capitalism", stats: { econ: 0, dipl: 40, govt: 50, scty: 50 } },
  { name: "Anarcho-Capitalism", stats: { econ: 0, dipl: 50, govt: 100, scty: 50 } }
];

export default function App() {
  const [qn, setQn] = useState(0);
  const [scores, setScores] = useState({ econ: 0, dipl: 0, govt: 0, scty: 0 });
  const [showResults, setShowResults] = useState(false);
  const [maxScores, setMaxScores] = useState({ econ: 0, dipl: 0, govt: 0, scty: 0 });

  useEffect(() => {
    const max = { econ: 0, dipl: 0, govt: 0, scty: 0 };
    questions.forEach(q => {
      max.econ += Math.abs(q.effect.econ);
      max.dipl += Math.abs(q.effect.dipl);
      max.govt += Math.abs(q.effect.govt);
      max.scty += Math.abs(q.effect.scty);
    });
    setMaxScores(max);
  }, []);

  const handleAnswer = (mult) => {
    const effect = questions[qn].effect;
    setScores({
      econ: scores.econ + mult * effect.econ,
      dipl: scores.dipl + mult * effect.dipl,
      govt: scores.govt + mult * effect.govt,
      scty: scores.scty + mult * effect.scty
    });

    if (qn < questions.length - 1) {
      setQn(qn + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (qn > 0) {
      setQn(qn - 1);
    }
  };

  const calcScore = (score, max) => {
    return ((100 * (max + score)) / (2 * max)).toFixed(1);
  };

  const getClosestIdeology = () => {
    const finalScores = {
      econ: parseFloat(calcScore(scores.econ, maxScores.econ)),
      dipl: parseFloat(calcScore(scores.dipl, maxScores.dipl)),
      govt: parseFloat(calcScore(scores.govt, maxScores.govt)),
      scty: parseFloat(calcScore(scores.scty, maxScores.scty))
    };

    let closest = ideologies[0];
    let minDistance = Infinity;

    ideologies.forEach(ideology => {
      const distance = Math.sqrt(
        Math.pow(ideology.stats.econ - finalScores.econ, 2) +
        Math.pow(ideology.stats.dipl - finalScores.dipl, 2) +
        Math.pow(ideology.stats.govt - finalScores.govt, 2) +
        Math.pow(ideology.stats.scty - finalScores.scty, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closest = ideology;
      }
    });

    return { ideology: closest, scores: finalScores };
  };

  const getAxisLabel = (score, leftLabel, rightLabel) => {
    if (score > 60) return leftLabel;
    if (score < 40) return rightLabel;
    return 'Neutral';
  };

  if (showResults) {
    const { ideology, scores: finalScores } = getClosestIdeology();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Liquid Glass Card */}
          <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Animated gradient background */}
            <div className="absolute inset-0 rounded-3xl opacity-30 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 animate-pulse"></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white text-center mb-2">Your Results</h1>
              <h2 className="text-2xl font-semibold text-purple-200 text-center mb-8">{ideology.name}</h2>

              {/* Score Bars */}
              <div className="space-y-6">
                {[
                  { key: 'econ', label: 'Economic', left: 'Equality', right: 'Markets', color: 'from-red-500 to-blue-500' },
                  { key: 'dipl', label: 'Diplomatic', left: 'World', right: 'Nation', color: 'from-green-500 to-purple-500' },
                  { key: 'govt', label: 'Government', left: 'Liberty', right: 'Authority', color: 'from-yellow-500 to-pink-500' },
                  { key: 'scty', label: 'Society', left: 'Progress', right: 'Tradition', color: 'from-cyan-500 to-orange-500' }
                ].map(axis => (
                  <div key={axis.key}>
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span>{axis.left}</span>
                      <span className="font-semibold text-white">{axis.label}: {finalScores[axis.key]}%</span>
                      <span>{axis.right}</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                      <div 
                        className={`h-full bg-gradient-to-r ${axis.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${finalScores[axis.key]}%` }}
                      />
                    </div>
                    <div className="text-center text-sm text-purple-200 mt-1">
                      {getAxisLabel(finalScores[axis.key], axis.left, axis.right)}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setQn(0);
                  setScores({ econ: 0, dipl: 0, govt: 0, scty: 0 });
                  setShowResults(false);
                }}
                className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Take Quiz Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Liquid Glass Card */}
        <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Animated gradient background */}
          <div className="absolute inset-0 rounded-3xl opacity-30 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 animate-pulse"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">8values Quiz</h1>
              <p className="text-xl text-purple-200">
                Question {qn + 1} of {questions.length}
              </p>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${((qn + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <p className="text-xl text-white text-center leading-relaxed">
                {questions[qn].question}
              </p>
            </div>

            {/* Answer Buttons */}
            <div className="space-y-3">
              {[
                { label: 'Strongly Agree', value: 1.0, color: 'from-green-500 to-emerald-600' },
                { label: 'Agree', value: 0.5, color: 'from-green-400 to-green-500' },
                { label: 'Neutral/Unsure', value: 0.0, color: 'from-gray-400 to-gray-500' },
                { label: 'Disagree', value: -0.5, color: 'from-orange-400 to-orange-500' },
                { label: 'Strongly Disagree', value: -1.0, color: 'from-red-500 to-red-600' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full py-4 px-6 bg-gradient-to-r ${option.color} text-white font-semibold rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Back Button */}
            {qn > 0 && (
              <button
                onClick={handleBack}
                className="w-full mt-4 py-3 px-6 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}