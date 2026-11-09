import React, { useState, useEffect } from 'react';
import { EmotionKey, FeedbackData, CommunityStory } from './types';
import {
  validateStep1,
  validateStep2,
  validateStep3,
  generateTicketId,
  formatTimeWIB,
  playGentleSound,
  getStoredStories,
  saveStoryLocally,
  EMOTIONS,
} from './utils/logic';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StepIndicator } from './components/StepIndicator';
import { Step1Emotion } from './components/Step1Emotion';
import { Step2Focus } from './components/Step2Focus';
import { Step3Story } from './components/Step3Story';
import { Step4Hope } from './components/Step4Hope';
import { SuccessCard } from './components/SuccessCard';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { CommunityWallModal } from './components/CommunityWallModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isCommunityWallOpen, setIsCommunityWallOpen] = useState<boolean>(false);

  // Form State
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    emotion: null,
    emotionLabel: '',
    categories: [],
    story: '',
    hope: '',
  });

  const [ticketId, setTicketId] = useState<string>('#MKSI-8821');
  const [savedTime, setSavedTime] = useState<string>('Baru saja');
  const [errors, setErrors] = useState<{ [key: number]: boolean }>({});
  const [communityStories, setCommunityStories] = useState<CommunityStory[]>([]);

  // Load stored community stories & handle URL query parameters (e.g., autostart=1 or step=2)
  useEffect(() => {
    setCommunityStories(getStoredStories());

    try {
      const params = new URLSearchParams(window.location.search);
      const urlStep = parseInt(params.get('step') || '', 10);
      if (urlStep >= 1 && urlStep <= 4) {
        // Pre-populate sensible sample data if jumping directly via url
        setFeedbackData({
          emotion: 'overwhelmed',
          emotionLabel: '😫 Overwhelmed (Kewalahan)',
          categories: ['Tesis / Publikasi'],
          story: 'Contoh cerita simulasi perkuliahan...',
          hope: 'Bimbingan daring fleksibel...',
        });
        setCurrentStep(urlStep);
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const triggerSound = (type: 'click' | 'success' = 'click') => {
    playGentleSound(type, soundEnabled);
  };

  const handleSelectEmotion = (emotionKey: EmotionKey) => {
    triggerSound('click');
    const emotionObj = EMOTIONS.find((e) => e.key === emotionKey);
    setFeedbackData((prev) => ({
      ...prev,
      emotion: emotionKey,
      emotionLabel: emotionObj ? `${emotionObj.emoji} ${emotionObj.title}` : emotionKey,
    }));
    setErrors((prev) => ({ ...prev, 1: false }));
  };

  const handleToggleCategory = (category: string) => {
    triggerSound('click');
    setFeedbackData((prev) => {
      const exists = prev.categories.includes(category);
      const updated = exists
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: updated };
    });
    setErrors((prev) => ({ ...prev, 2: false }));
  };

  const handleInsertStoryPrompt = (text: string) => {
    triggerSound('click');
    setFeedbackData((prev) => ({
      ...prev,
      story: prev.story.trim() ? `${prev.story.trim()} ${text}` : text,
    }));
    setErrors((prev) => ({ ...prev, 3: false }));
  };

  const handleSelectHopeSuggestion = (text: string) => {
    triggerSound('click');
    setFeedbackData((prev) => ({ ...prev, hope: text }));
  };

  const canNavigateTo = (targetStep: number): boolean => {
    if (targetStep === 1) return true;
    if (targetStep === 2) return validateStep1(feedbackData.emotion);
    if (targetStep === 3)
      return validateStep1(feedbackData.emotion) && validateStep2(feedbackData.categories);
    if (targetStep === 4)
      return (
        validateStep1(feedbackData.emotion) &&
        validateStep2(feedbackData.categories) &&
        validateStep3(feedbackData.story)
      );
    return false;
  };

  const handleNextFromStep1 = () => {
    if (!validateStep1(feedbackData.emotion)) {
      setErrors((prev) => ({ ...prev, 1: true }));
      return;
    }
    triggerSound('click');
    setErrors((prev) => ({ ...prev, 1: false }));
    setCurrentStep(2);
    scrollToCard();
  };

  const handleNextFromStep2 = () => {
    if (!validateStep2(feedbackData.categories)) {
      setErrors((prev) => ({ ...prev, 2: true }));
      return;
    }
    triggerSound('click');
    setErrors((prev) => ({ ...prev, 2: false }));
    setCurrentStep(3);
    scrollToCard();
  };

  const handleNextFromStep3 = () => {
    if (!validateStep3(feedbackData.story)) {
      setErrors((prev) => ({ ...prev, 3: true }));
      return;
    }
    triggerSound('click');
    setErrors((prev) => ({ ...prev, 3: false }));
    setCurrentStep(4);
    scrollToCard();
  };

  const handleGoToStep = (step: number) => {
    if (canNavigateTo(step)) {
      triggerSound('click');
      setCurrentStep(step);
      scrollToCard();
    }
  };

  const scrollToCard = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handleSubmitStory = () => {
    triggerSound('click');
    setIsSubmitting(true);

    // Simulated safe submission with generated anonymous ticket
    setTimeout(() => {
      const newTicketId = generateTicketId();
      const timeStr = formatTimeWIB();

      setTicketId(newTicketId);
      setSavedTime(timeStr);

      const savedItem = saveStoryLocally(feedbackData, newTicketId);
      setCommunityStories((prev) => [savedItem, ...prev]);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowConfetti(true);
      triggerSound('success');

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }

      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 5000);
    }, 1200);
  };

  const handleResetForm = () => {
    triggerSound('click');
    setFeedbackData({
      emotion: null,
      emotionLabel: '',
      categories: [],
      story: '',
      hope: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
    setShowConfetti(false);
    setCurrentStep(1);
    scrollToCard();
  };

  return (
    <div className="bg-mesh min-h-screen text-slate-800 flex flex-col justify-between selection:bg-undip-gold/30 selection:text-undip-navy">
      {/* Confetti celebration canvas */}
      <ConfettiCanvas active={showConfetti} />

      {/* Header and top announcement */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          setSoundEnabled((prev) => {
            const next = !prev;
            if (next) triggerSound('click');
            return next;
          });
        }}
        onReset={handleResetForm}
        onOpenCommunityWall={() => setIsCommunityWallOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Hero />

        {/* Wizard or Success Screen */}
        {!isSubmitted ? (
          <div>
            <StepIndicator
              currentStep={currentStep}
              onGoToStep={handleGoToStep}
              canNavigateTo={canNavigateTo}
            />

            <form onSubmit={(e) => e.preventDefault()} noValidate>
              {currentStep === 1 && (
                <Step1Emotion
                  selectedEmotion={feedbackData.emotion}
                  onSelectEmotion={handleSelectEmotion}
                  onNext={handleNextFromStep1}
                  hasError={!!errors[1]}
                />
              )}

              {currentStep === 2 && (
                <Step2Focus
                  selectedCategories={feedbackData.categories}
                  onToggleCategory={handleToggleCategory}
                  onBack={() => {
                    triggerSound('click');
                    setCurrentStep(1);
                    scrollToCard();
                  }}
                  onNext={handleNextFromStep2}
                  hasError={!!errors[2]}
                />
              )}

              {currentStep === 3 && (
                <Step3Story
                  story={feedbackData.story}
                  onChangeStory={(val) => {
                    setFeedbackData((prev) => ({ ...prev, story: val }));
                    if (val.trim().length >= 10) {
                      setErrors((prev) => ({ ...prev, 3: false }));
                    }
                  }}
                  onInsertPrompt={handleInsertStoryPrompt}
                  onBack={() => {
                    triggerSound('click');
                    setCurrentStep(2);
                    scrollToCard();
                  }}
                  onNext={handleNextFromStep3}
                  hasError={!!errors[3]}
                />
              )}

              {currentStep === 4 && (
                <Step4Hope
                  hope={feedbackData.hope}
                  onChangeHope={(val) => setFeedbackData((prev) => ({ ...prev, hope: val }))}
                  onSelectSuggestion={handleSelectHopeSuggestion}
                  selectedEmotion={feedbackData.emotion}
                  selectedCategories={feedbackData.categories}
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmitStory}
                  onBack={() => {
                    triggerSound('click');
                    setCurrentStep(3);
                    scrollToCard();
                  }}
                />
              )}
            </form>
          </div>
        ) : (
          <SuccessCard
            ticketId={ticketId}
            savedTime={savedTime}
            onReset={handleResetForm}
            onOpenCommunityWall={() => setIsCommunityWallOpen(true)}
            onPlayClickSound={() => triggerSound('click')}
          />
        )}
      </main>

      {/* Community Wall Modal */}
      <CommunityWallModal
        isOpen={isCommunityWallOpen}
        onClose={() => setIsCommunityWallOpen(false)}
        stories={communityStories}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
