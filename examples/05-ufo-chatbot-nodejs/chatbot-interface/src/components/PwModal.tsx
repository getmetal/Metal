import { Dialog } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Modal from '@/components/Modal';


interface PwModalProps {
  open: boolean;
  pw: string;
  onClose: (open: boolean) => void;
  onPw: (pw: string) => void;
  onSubmit: () => void;
}

const PwModal = ({ open, pw, onClose, onPw, onSubmit }: PwModalProps) => {
  return (
    <Modal action={onSubmit} open={open} onClose={onClose} header={<div>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-300">
        <LockClosedIcon className="h-6 w-6 text-green-900" aria-hidden="true" />
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-100">
          Password Protected Demo
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Please enter the password to continue.
          </p>
        </div>
      </div>
    </div>}>
      <div className="w-full mb-5">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-300"
        >
          Password
        </label>
        <input className="block w-full rounded-md border-0 py-1.5 px-2 font-light shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent text-white"
          value={pw}
          onChange={(e) => onPw(e.target.value)}
          placeholder="Enter password to access demo"
          type="password"
        />
      </div>
    </Modal>
  );
}

export default PwModal;
