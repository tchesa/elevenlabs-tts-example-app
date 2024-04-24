import { useCallback, useEffect, useRef, useState } from "react";
import TextMessage, { type Props as TextMessageProps } from "./text-message";
import { Play, Pause } from "lucide-react";

type Props = Pick<TextMessageProps, "side"> & {
  url: string;
};

const AudioMessage = ({ url, ...textMessageProps }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const updateProgress = () => {
      setProgress(audioRef.current?.currentTime || 0);
    };

    const updatePlaying = () => {
      setIsPlaying(!audioRef.current?.paused || false);
    };

    audioRef.current?.addEventListener("timeupdate", updateProgress);
    audioRef.current?.addEventListener("play", updatePlaying);
    audioRef.current?.addEventListener("pause", updatePlaying);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateProgress);
      audioRef.current?.removeEventListener("play", updatePlaying);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current?.removeEventListener("pause", updatePlaying);
    };
  }, [audioRef]);

  const handlePlay = useCallback(() => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [audioRef]);

  const handleUpdateProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));

    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);

      if (audioRef.current.paused) {
        audioRef.current.play();
      }
    }
  };

  return (
    <TextMessage {...textMessageProps}>
      <div>
        <button type="button" onClick={handlePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <input
          type="range"
          value={progress}
          max={audioRef.current?.duration}
          onChange={handleUpdateProgress}
        />
      </div>
      <audio
        src={url}
        controls
        autoPlay
        ref={audioRef}
        style={{ display: "none" }}
      ></audio>
    </TextMessage>
  );
};

export default AudioMessage;
