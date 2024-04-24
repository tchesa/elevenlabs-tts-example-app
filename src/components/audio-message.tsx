import TextMessage, { type Props as TextMessageProps } from "./text-message";

type Props = Pick<TextMessageProps, "side"> & {
  url: string;
};

const AudioMessage = ({ url, ...textMessageProps }: Props) => {
  return (
    <TextMessage {...textMessageProps}>
      <audio src={url} controls autoPlay></audio>
    </TextMessage>
  );
};

export default AudioMessage;
