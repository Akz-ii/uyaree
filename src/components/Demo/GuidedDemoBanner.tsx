import React, { useState } from 'react';
import { DEMO_NARRATIVE_STEPS } from '../../services/mockData';
import { TabView } from '../Dashboard/HeaderNav';
import { Sparkles, ChevronRight, ChevronLeft, X, Play, CheckCircle2 } from 'lucide-react';

interface GuidedDemoBannerProps {
  onNavigateTab: (tab: TabView) => void;
  onSelectComponent?: (systemId: any) => void;
  onCloseDemo: () => void;
}

export const GuidedDemoBanner: React.FC<GuidedDemoBannerProps> = ({
  onNavigateTab,
  onSelectComponent,
  onCloseDemo,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const step = DEMO_NARRATIVE_STEPS[currentStepIdx];
  const totalSteps = DEMO_NARRATIVE_STEPS.length;

  const handleNextStep = () => {
    if (currentStepIdx < totalSteps - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      const nextStep = DEMO_NARRATIVE_STEPS[nextIdx];
      onNavigateTab(nextStep.activeTab);
      if (nextStep.highlightComponent && onSelectComponent) {
        onSelectComponent(nextStep.highlightComponent);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      const prevStep = DEMO_NARRATIVE_STEPS[prevIdx];
      onNavigateTab(prevStep.activeTab);
      if (prevStep.highlightComponent && onSelectComponent) {
        onSelectComponent(prevStep.highlightComponent);
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl px-4 animate-slideUp">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/60 rounded-2xl p-4 shadow-2xl shadow-cyan-500/20 glow-cyan">
        {/* Banner Top Row */}
        <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Sparkles className="w-4 h-4 fill-current" />
            </span>
            <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider">
              UYAREE DEMO STORY MODE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 font-bold">
              STEP {step.step} OF {totalSteps}
            </span>
          </div>

          <button
            onClick={onCloseDemo}
            className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            title="Exit Demo Story Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Banner Content Step Info */}
        <div className="mb-3">
          <h4 className="text-sm font-bold text-slate-100 font-mono mb-1">{step.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{step.description}</p>
        </div>

        {/* Progress Bar & Navigation Controls */}
        <div className="flex items-center justify-between gap-4 pt-1">
          {/* Progress Segment Dots */}
          <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
            {DEMO_NARRATIVE_STEPS.map((s, idx) => (
              <div
                key={s.step}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIdx
                    ? 'w-8 bg-cyan-400'
                    : idx < currentStepIdx
                    ? 'w-3 bg-emerald-400'
                    : 'w-3 bg-slate-800'
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIdx === 0}
              className={`p-1.5 rounded-lg text-xs font-mono transition-all ${
                currentStepIdx === 0
                  ? 'text-slate-600 bg-slate-950/40 cursor-not-allowed'
                  : 'text-slate-300 bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIdx === totalSteps - 1}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                currentStepIdx === totalSteps - 1
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
              }`}
            >
              <span>{currentStepIdx === totalSteps - 1 ? 'Demo Completed!' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
