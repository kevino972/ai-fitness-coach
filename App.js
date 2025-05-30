
import { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fitnessLevel: '',
    weeklyHours: '',
    goal: '',
    injury: '',
  });
  const [plan, setPlan] = useState('');

  const generatePlan = () => {
    const { fitnessLevel, weeklyHours, goal, injury } = formData;
    let basePlan = `Your AI-generated weekly plan:`;
    basePlan += `\n- Fitness Level: ${fitnessLevel}`;
    basePlan += `\n- Weekly Time: ${weeklyHours} hours`;
    basePlan += `\n- Goal: ${goal}`;

    if (injury.toLowerCase().includes("back")) {
      basePlan += `\n- Avoid spinal loading. Focus on pilates, core stability, and bodyweight push/pull.`;
    } else if (injury) {
      basePlan += `\n- Modified exercises due to injury: ${injury}`;
    }

    if (goal === "Stay fit and healthy") {
      basePlan += `\n- 3x/week full-body strength\n- 2x mobility & pilates\n- 1x light cardio (optional)`;
    } else if (goal === "Be strong") {
      basePlan += `\n- 4x strength training (upper/lower split)\n- 1x mobility\n- 1x core/pilates`;
    } else if (goal === "Be competitive") {
      basePlan += `\n- 5x/week training\n- Focus: progressive overload, bodyweight strength, active recovery\n- Prioritize recovery and intensity control`;
    }

    setPlan(basePlan);
    setStep(3);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>AI Fitness Coach</h1>

      {step === 1 && (
        <div>
          <input
            placeholder="Fitness level (e.g., beginner, intermediate)"
            value={formData.fitnessLevel}
            onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
          />
          <input
            placeholder="Weekly training time (in hours)"
            value={formData.weeklyHours}
            onChange={(e) => setFormData({ ...formData, weeklyHours: e.target.value })}
          />
          <input
            placeholder="Your goal (Stay fit and healthy, Be strong, Be competitive)"
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          />
          <textarea
            placeholder="Injuries or limitations (optional)"
            value={formData.injury}
            onChange={(e) => setFormData({ ...formData, injury: e.target.value })}
          />
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p>Ready to generate your plan?</p>
          <button onClick={generatePlan}>Generate Plan</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Your Plan:</h2>
          <pre>{plan}</pre>
          <button onClick={() => setStep(1)}>Start Over</button>
        </div>
      )}
    </div>
  );
}

export default App;
