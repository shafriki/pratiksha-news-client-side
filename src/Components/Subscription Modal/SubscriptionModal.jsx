import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const SubscriptionModal = ({ isOpen, setIsOpen }) => {

    function closeModal() {
        setIsOpen(false); 
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-opacity-70 bg-[#037269] p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white"
                                >
                                    Premium Subscription
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-xs text-justify text-white">
                                    আপনি কি আমাদের প্রিমিয়াম সংবাদ পরিষেবায় সদস্যপদ নিতে চান? আমাদের প্রিমিয়াম সাবস্ক্রিপশনের মাধ্যমে আপনি বিশেষ প্রতিবেদন এবং ট্রেন্ডিং আর্টিকেলসমূহ উপভোগ করতে পারবেন। সাবস্ক্রাইব করতে এখনই নিচের বাটনে ক্লিক করুন।

                                    </p>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <Link to='/subscriptions'
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-[#FF6F61] px-4 py-2 text-sm font-medium text-white hover:bg-[#d35b50] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        সাবস্ক্রাইব করুন
                                    </Link>
                                    {/* Close button */}
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 inline-flex justify-center rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
                                        onClick={closeModal} 
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SubscriptionModal;
