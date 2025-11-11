import { useState, useCallback } from 'react';

export function useAudio() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const playAudio = useCallback((url: string, onError?: (error: string) => void) => {
    if (audioPlaying || !url) return;
    
    setAudioPlaying(true);
    const audio = new Audio(url);
    audio.play()
      .catch(err => {
        console.error('Audio playback failed:', err);
        onError?.('Audio playback unavailable');
      })
      .finally(() => setAudioPlaying(false));
  }, [audioPlaying]);

  const speakWord = useCallback((text: string) => {
    if (speaking || !('speechSynthesis' in window)) return;
    
    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [speaking]);

  return {
    audioPlaying,
    speaking,
    playAudio,
    speakWord
  };
}

