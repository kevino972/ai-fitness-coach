
import { useState } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function FitnessCoachApp() {
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
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">AI Fitness Coach</h1>

      {step === 1 && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <Input
              placeholder="Fitness level (e.g., beginner, intermediate)"
              value={formData.fitnessLevel}
              onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
            />
            <Input
              placeholder="Weekly training time (in hours)"
              value={formData.weeklyHours}
              onChange={(e) => setFormData({ ...formData, weeklyHours: e.target.value })}
            />
            <Input
              placeholder="Your goal (Stay fit and healthy, Be strong, Be competitive)"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            />
            <Textarea
              placeholder="Injuries or limitations (optional)"
              value={formData.injury}
              onChange={(e) => setFormData({ ...formData, injury: e.target.value })}
            />
            <Button onClick={() => setStep(2)}>Next</Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <p className="text-lg">Ready to generate your plan?</p>
            <Button onClick={generatePlan}>Generate Plan</Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="space-y-4 p-4 whitespace-pre-wrap">
            <p className="text-lg font-semibold">Your Plan:</p>
            <pre>{plan}</pre>
            <Button onClick={() => setStep(1)}>Start Over</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
