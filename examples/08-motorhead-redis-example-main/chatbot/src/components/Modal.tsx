import { Fragment, ReactNode, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  children: ReactNode;
  header?: ReactNode;
  onClose: (open: boolean) => void
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  open: boolean
  actionLabel?: string;
  action?: () => void;
  secondAction?: () => void;
  secondActionLabel?: string;
  hideAction?: boolean;
}

export default function Modal({ hideAction, children, header, size = 'sm', onClose, open, actionLabel = 'Continue', action, secondAction, secondActionLabel }: ModalProps) {
  const [confirm, setConfirm] = useState(false)

  const handleClose = () => {
    setConfirm(false)
    onClose(true)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${size === '3xl' ? 'sm:max-w-3xl' : size === '2xl' ? 'sm:max-w-2xl' : 'sm:max-w-sm'} sm:p-6`}>
                {header}
                <div className="mt-5 sm:mt-6">
                  {children}
                  {!hideAction && <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => action ? action() : handleClose()}
                  >
                    {actionLabel}
                  </button>}
                  {secondAction &&
                    <button
                      type="button"
                      className={`mt-3 inline-flex w-full justify-center rounded-md ${confirm ? 'bg-red-600' : 'bg-red-400'} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
                      onClick={!confirm ? () => setConfirm(true) : secondAction}
                    >
                      {confirm ? 'CONFIRM' : secondActionLabel}
                    </button>
                  }
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
