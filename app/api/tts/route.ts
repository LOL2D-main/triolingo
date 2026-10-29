import { NextRequest, NextResponse } from "next/server";
import { EdgeTTS } from "@andresaya/edge-tts";

// In-memory cache for synthesized audio to ensure instant replay
const audioCache = new Map<string, Buffer>();

// Map character personas to premium Microsoft Azure Neural voices
const SPEAKER_VOICE_MAP: Record<
  string,
  { voice: string; pitch?: string; rate?: string }
> = {
  woman: { voice: "en-US-JennyNeural", pitch: "+0Hz", rate: "+0%" },
  man: { voice: "en-US-GuyNeural", pitch: "+0Hz", rate: "+0%" },
  girl: { voice: "en-US-AnaNeural", pitch: "+5Hz", rate: "+0%" },
  boy: { voice: "en-US-EricNeural", pitch: "+5Hz", rate: "+0%" },
  mascot: { voice: "en-US-AriaNeural", pitch: "+2Hz", rate: "+2%" },
  robot: { voice: "en-US-GuyNeural", pitch: "+15Hz", rate: "+10%" },
  zombie: { voice: "en-US-GuyNeural", pitch: "-20Hz", rate: "-25%" },
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text")?.trim();
    const speaker = searchParams.get("speaker") || "mascot";
    const slow = searchParams.get("slow") === "true";

    if (!text) {
      return new NextResponse("Text is required", { status: 400 });
    }

    // Limit length to avoid abuse
    const cleanText = text.slice(0, 300);

    const voiceConfig = SPEAKER_VOICE_MAP[speaker] || SPEAKER_VOICE_MAP.mascot;
    const rate = slow ? "-25%" : voiceConfig.rate || "+0%";
    const pitch = voiceConfig.pitch || "+0Hz";

    const cacheKey = `${speaker}:${slow ? "slow" : "normal"}:${cleanText}`;

    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      return new NextResponse(new Uint8Array(cached), {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=86400, immutable",
        },
      });
    }

    const tts = new EdgeTTS();
    const result = await tts.generate(cleanText, voiceConfig.voice, {
      rate,
      pitch,
    });

    if (!result?.audio) {
      return new NextResponse("Failed to synthesize audio", { status: 500 });
    }

    // Cache up to 500 audio snippets
    if (audioCache.size > 500) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, result.audio);

    return new NextResponse(new Uint8Array(result.audio), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("TTS synthesis error:", error);
    return new NextResponse("TTS Error", { status: 500 });
  }
}
