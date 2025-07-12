/** biome-ignore-all lint/suspicious/noConsole: dev */
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

const RECORDING_NOT_SUPPORTED_MESSAGE = 'Recording is not supported in this browser'

type RecordRoomAudioParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RecordRoomAudioParams>()

  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)

  async function startRecording() {
    if (!isRecordingSupported) {
      alert(RECORDING_NOT_SUPPORTED_MESSAGE)
      return
    }

    setIsRecording(true)

    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      })

      recorder.current = new MediaRecorder(audio, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 64_000,
      })

      recorder.current.ondataavailable = event => {
        if (event.data.size > 0) {
          uploadAudio(event.data)
        }
      }

      recorder.current.onstart = () => {
        console.log('Recording started')
      }

      recorder.current.onstop = () => {
        console.log('Recording stopped')
      }

      recorder.current.start()
    } catch {
      alert('An error occurred while trying to start the recording.')
      setIsRecording(false)
    }
  }

  function stopRecording() {
    if (!isRecordingSupported) {
      alert(RECORDING_NOT_SUPPORTED_MESSAGE)
      return
    }

    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    console.log('Audio uploaded:', result)
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording} variant="destructive">
          Stop Recording
        </Button>
      ) : (
        <Button onClick={startRecording}>Start Recording</Button>
      )}
      {isRecording ? <p>Recording...</p> : <p>Click the button to start recording</p>}
    </div>
  )
}
