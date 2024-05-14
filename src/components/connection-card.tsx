import { Input } from "./ui/input"

export default function ConnectionCard({ apiKey }: { apiKey: string }) {
  return (
    <div className="plasmo-w-full plasmo-bg-green-800 plasmo-border plasmo-border-green-500 plasmo-rounded-lg plasmo-p-4 plasmo-text-sm plasmo-flex-col plasmo-items-center">
      <div className="plasmo-flex plasmo-items-center plasmo-gap-2">
        <span className="plasmo-relative plasmo-flex plasmo-h-3 plasmo-w-3">
          <span className="plasmo-animate-ping plasmo-absolute plasmo-inline-flex plasmo-h-3 plasmo-w-3 plasmo-rounded-full plasmo-bg-green-300 plasmo-opacity-75"></span>
          <span className="plasmo-relative plasmo-inline-flex plasmo-rounded-full plasmo-h-3 plasmo-w-3 plasmo-bg-green-300"></span>
        </span>
        API is Connected
      </div>
      <Input
        disabled
        autoCorrect="off"
        autoCapitalize="off"
        className="plasmo-mt-4 plasmo-overflow-ellipsis"
        value={apiKey}></Input>
    </div>
  )
}
