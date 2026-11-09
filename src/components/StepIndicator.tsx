import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  onGoToStep: (step: number) => void;
  canNavigateTo: (step: number) => boolean;
}

const STEP_LABELS = [
  { step: 1, label: 'Kondisi' },
  { step: 2, label: 'Fokus' },
  { step: 3, label: 'Cerita' },
  { step: 4, label: 'Harapan' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onGoToStep,
  canNavigateTo,
}) => {
  const progressPercent = currentStep * 25;

  return (
    <div id="stepIndicatorContainer" className="mb-8">
      <div className="bg-white rounded-2xl p-4 card-shadow border border-slate-100">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-undip-navy flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-undip-gold" />
            Progres Cerita
          </span>
          <span
            id="stepCounterText"
            className="text-xs font-bold text-undip-orange bg-undip-gold/15 px-2.5 py-0.5 rounded-full"
          >
            Langkah {currentStep} dari 4
          </span>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4 p-0.5 border border-slate-200/60">
          <div
            id="progressBar"
            className="bg-gradient-to-r from-undip-navy via-undip-blue to-undip-gold h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Pills / Breadcrumb */}
        <div className="grid grid-cols-4 gap-2 text-center" role="tablist">
          {STEP_LABELS.map(({ step, label }) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            const isAccessible = canNavigateTo(step);

            let circleClass =
              'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ';
            let labelClass = 'text-[11px] mt-1.5 transition-colors ';

            if (isCompleted) {
              circleClass += 'bg-emerald-500 text-white shadow-sm';
              labelClass += 'font-semibold text-emerald-600';
            } else if (isCurrent) {
              circleClass += 'bg-undip-navy text-white shadow-sm ring-2 ring-undip-navy/20';
              labelClass += 'font-semibold text-undip-navy';
            } else {
              circleClass +=
                'bg-slate-100 text-slate-400 group-hover:bg-slate-200 ' +
                (isAccessible ? 'cursor-pointer' : '');
              labelClass += 'font-medium text-slate-400 group-hover:text-slate-600';
            }

            return (
              <button
                key={step}
                type="button"
                id={`stepTab-${step}`}
                onClick={() => isAccessible && onGoToStep(step)}
                disabled={!isAccessible}
                aria-current={isCurrent ? 'step' : undefined}
                className={`step-tab flex flex-col items-center group focus:outline-none ${
                  isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
                }`}
              >
                <span className={circleClass}>{isCompleted ? '✓' : step}</span>
                <span className={labelClass}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
