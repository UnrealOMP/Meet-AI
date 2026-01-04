import sys
import io
from faster_whisper import WhisperModel

# ✅ Force UTF-8 output (CRITICAL on Windows)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

audio_path = sys.argv[1]

# ✅ Use base model for better speed/accuracy balance
model = WhisperModel("base", device="cpu")

segments, _ = model.transcribe(audio_path)

full_text = []
for segment in segments:
    full_text.append(segment.text)

# ✅ Output as UTF-8 safely
output = "\n".join(full_text)
print(output)
