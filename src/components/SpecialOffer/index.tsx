'use client';

import { useAppDispatch } from '@/lib';
import { handleUpdateSpecialOfferCruise, handleUpdateSpecialOfferTour, useSpecialOffer } from '@/utils/handleService';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function UpdateSpecialOfferCruiseAndTour({
  //
  idCruiseOrTour,
  isForTour,
  onCancel,
  specialOfferInit,
}: {
  onCancel: () => void;
  isForTour?: boolean;
  idCruiseOrTour: number;
  specialOfferInit: number[];
}): JSX.Element {
  const { data } = useSpecialOffer(100);
  const [specialOfferSelect, setSpecialOfferSelect] = useState<number[]>(specialOfferInit);
  const dispatch = useAppDispatch();

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#dadae178] flex justify-center items-center">
      <div className="bg-white p-4 rounded-md relative ">
        <div className="min-w-[400px]">
          <h3>Update Accompanied Special Offer</h3>
          <FontAwesomeIcon onClick={onCancel} icon={faXmark} className="absolute top-5 right-5 cursor-pointer" />
        </div>
        <ul className="py-3 overflow-auto max-h-[200px]">
          {data.map((SpecialOffer, index) => (
            <li
              key={index}
              onClick={() => {
                setSpecialOfferSelect((pre) => {
                  if (pre.includes(SpecialOffer.id)) {
                    return pre.filter((i) => i != SpecialOffer.id);
                  } else {
                    return [...pre, SpecialOffer.id];
                  }
                });
              }}
              className="flex py-2 cursor-pointer">
              <input defaultChecked={specialOfferSelect.includes(SpecialOffer.id)} type="checkbox" className="mr-5" />
              <p className="flex-1">{SpecialOffer.name}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            onClick={async () => {
              if (isForTour) {
                await handleUpdateSpecialOfferTour(idCruiseOrTour, specialOfferSelect, dispatch);
              } else {
                await handleUpdateSpecialOfferCruise(idCruiseOrTour, specialOfferSelect, dispatch);
              }
              onCancel();
            }}
            type="submit"
            className="py-2 px-7 rounded-lg text-white font-medium bg-[var(--primary-color)]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
