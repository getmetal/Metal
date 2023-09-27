import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface ErrorProps {
  message: string
  onDismiss: () => void
}

export default function Error({ message, onDismiss }: ErrorProps) {
  return (
    <div className="rounded-md bg-red-100 p-3 absolute top-2 right-2 block w-96 min-w-96 z-50">
      <div className='flex flex-col'>
        <div className="flex">
          <div className="flex flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400 mr-2" aria-hidden="true" />
            <h3 className="text-sm font-bold text-red-800">Error</h3>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onDismiss}
                type="button"
                className="inline-flex rounded-md bg-red-100 p-1.5 text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="ml-3 overflow-auto break-words">
          <div className="mt-1 text-sm text-red-700">
            {message}
          </div>
        </div>
      </div>
    </div>

  )
}
