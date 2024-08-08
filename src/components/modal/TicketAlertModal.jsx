import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
// import usePrmcStore from "../../zustand/usePrmcStore";
// import { useFetchLikePrmcs } from "../../hooks/useLikePrmcs";
import { Link } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/outline";

export default function TicketAlertModal({ open, onClose }) {
  // const { data: likePrmcs, isLoading, isError, error } = useFetchLikePrmcs();
  // const { likePrmc, setLikePrmc } = usePrmcStore((state) => ({
  //   likePrmc: state.likePrmc,
  //   setLikePrmc: state.setLikePrmc,
  // }));

  // useEffect(() => {
  //   likePrmc;
  //   likePrmcs;
  //   setLikePrmc;
  //   // Log likePrmc after it has been updated
  //   console.log(likePrmcs, likePrmc);
  // });

  const calculateDday = (ticketDate) => {
    const today = new Date();
    const ticketDateObj = new Date(ticketDate);

    if (isNaN(ticketDateObj.getTime())) {
      console.error("Invalid date format:", ticketDate);
      return NaN;
    }

    const timeDiff = ticketDateObj - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  // const sortedPrmcs = Array.isArray(likePrmcs)
  //   ? likePrmcs
  //       .slice()
  //       .sort((a, b) => new Date(a.ticketDate) - new Date(b.ticketDate))
  //   : [];

  const handleClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // if (isLoading || isLoading) return <p>Loading...</p>;
  // if (isError || isError) return <p>Error: {error.message}</p>;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 m-4">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    {/* <XMarkIcon aria-hidden="true" className="h-6 w-6" /> */}
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl rounded-lg">
                <div className="px-4 sm:px-6">
                  <div className="flex items-center mt-4 px-4 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="rgb(255,255,255)"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="rgb(138,14,196)"
                      className="size-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                      />
                    </svg>
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      티켓팅 일정 목록
                    </DialogTitle>
                  </div>
                  <div
                    style={{
                      padding: ".75rem 1rem",
                      fontSize: ".75rem",
                      backgroundColor: "rgb(245,245,245)",
                      marginBottom: "1rem",
                      borderRadius: "4px",
                    }}
                  >
                    <p>'user'님이 좋아하는 공연의 티켓팅 일정 목록입니다.</p>
                    <p>공연을 클릭하면 예매 사이트로 이동합니다.</p>
                  </div>
                </div>
                <div className="relative mx-4 mb-4 flex-1 px-4 sm:px-6 ">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 absolute inset-0 overflow-y-auto"
                  >
                    {/* {sortedPrmcs.map((prmc) => (
                      <li
                        key={prmc.id}
                        className="flex justify-between gap-x-6 py-5 px-3 mx-4 items-center transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md hover:scale-105 cursor-pointer"
                        onClick={() => handleClick(prmc.link)}
                      >
                        <div className="flex min-w-0 gap-x-4 items-center	">
                          <img
                            alt={prmc.title}
                            src={prmc.image}
                            className="h-16 w-16 flex-none rounded-full bg-gray-50"
                          />
                          <div className="min-w-0 flex-auto items-center	">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {prmc.title}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {prmc.theater}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p
                            className="text-m leading-6"
                            style={
                              calculateDday(prmc.ticketDate) <= 5
                                ? {
                                    color: "rgb(138,14,196)",
                                    // fontSize: "1.25rem",
                                    fontFamily: "WavvePADO-Regular",
                                  }
                                : {
                                    color: "rgb(107, 114, 128)",
                                    fontFamily: "WavvePADO-Regular",
                                  }
                            }
                          >
                            D - {calculateDday(prmc.ticketDate)} day
                          </p>
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            {prmc.ticketDate}
                            <time dateTime={prmc.lastSeenDateTime}>
                            {prmc.ticketDate}
                            </time>
                          </p>
                        </div>
                      </li>
                    ))} */}
                  </ul>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
