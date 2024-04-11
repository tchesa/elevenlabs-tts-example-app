import client from "./client";

const textToSpeech = async (text: string): Promise<unknown> => {
  console.log("ELEVENLABS_VOICE_ID", process.env.REACT_APP_ELEVENLABS_VOICE_ID);
  const response = await client.post(
    `/v1/text-to-speech/${process.env.REACT_APP_ELEVENLABS_VOICE_ID}`,
    {
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    },
    { responseType: "blob" }
  );

  const file = new File([response.data], "audio.mp3", { type: "audio/mpeg" });

  const url = URL.createObjectURL(file);
  return new Audio(url).play();
};

export default textToSpeech;
