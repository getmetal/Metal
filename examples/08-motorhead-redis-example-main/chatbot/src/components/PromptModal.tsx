import { useState } from 'react';
import Modal from '@/components/Modal';
import { DEFAULT_PROMPT } from '@/helpers/prompts';
import { Dialog } from '@headlessui/react'
import { AcademicCapIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface PromptModalProps {
  open: boolean;
  onClose: () => void;
  onPrompt: (prompt: string) => void;
}

const prompts = [
  {
    title: 'Default',
    text: DEFAULT_PROMPT,
  },
];


const PromptModal = ({ open, onClose, onPrompt }: PromptModalProps) => {
  const [prompt, setPrompt] = useState<string>('');

  const handleClose = () => {
    setPrompt('');
    onClose();
  }

  const handlePrompt = () => {
    onPrompt(prompt);
    onClose();
  }

  return (
    <Modal hideAction={!prompt} actionLabel="Update Prompt" action={handlePrompt} open={open} onClose={handleClose} size="3xl" header={< div >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-300">
        <AcademicCapIcon className="h-6 w-6 text-green-900" aria-hidden="true" />
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-100">
          Prompts Library
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Please select a prompt to continue.
          </p>
        </div>
      </div>
    </div >}>
      <div className="w-full mb-5">
        {prompt ?
          <textarea
            rows={16}
            name="prompt"
            id="prompt"
            className="block w-full rounded-md border-0 px-2 py-1.5 font-light shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent text-white"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask any question to the chatbot."
          />
          :
          <ul
            role="list"
            className="divide-y divide-gray-500 overflow-hidden bg-gray-800 shadow-sm ring-1 ring-gray-900/5 sm:rounded-md"
          >
            {prompts.map((prompt) => (
              <li onClick={() => setPrompt(prompt.text)} key={prompt.title} className="cursor-pointer relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-700 sm:px-6">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-200">
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {prompt.title}
                    </p>
                  </div>
                </div>
                {/* <p className="text-sm leading-6 text-gray-400">{prompt.text}</p> */}
                <div className="flex items-center gap-x-4">
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        }
      </div>
    </Modal >
  )
}


export default PromptModal;
