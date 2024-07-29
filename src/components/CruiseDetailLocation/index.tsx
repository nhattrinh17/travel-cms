'use client';

import { useAppDispatch } from '@/lib';
import { resetDataDetailLocation } from '@/lib/redux/app/detailLocation.slice';
import { useDestination } from '@/utils/handleDestination';
import { handleUpdateCruiseDetailLocation, useDetailLocation } from '@/utils/handleDetailLoaction';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export function UpdateCruiseDetailLocation({
  //
  idCruise,
  onCancel,
  detailLocationInit,
  idDestination,
}: {
  onCancel: () => void;
  idCruise: number;
  detailLocationInit: number[];
  idDestination: number;
}): JSX.Element {
  const { data } = useDetailLocation(idDestination, 20);
  const [detailLocation, setDetailLocation] = useState<number[]>(detailLocationInit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetDataDetailLocation());
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#dadae178] flex justify-center items-center">
      <div className="bg-white p-4 rounded-md relative ">
        <div className="min-w-[400px]">
          <h3>Update Detail Destination</h3>
          <FontAwesomeIcon onClick={onCancel} icon={faXmark} className="absolute top-5 right-5 cursor-pointer" />
        </div>

        <ul className="py-3 overflow-auto max-h-[200px]">
          {data.map((SpecialOffer, index) => (
            <li key={index} className="flex py-2 cursor-pointer">
              <input
                onChange={() => {
                  setDetailLocation((pre) => {
                    if (pre.includes(SpecialOffer.id)) {
                      return pre.filter((i) => i != SpecialOffer.id);
                    } else {
                      return [...pre, SpecialOffer.id];
                    }
                  });
                }}
                id={`special-offer-${index}`}
                checked={detailLocation.includes(SpecialOffer.id)}
                type="checkbox"
                className="mr-5"
              />
              <label htmlFor={`special-offer-${index}`} className="flex-1">
                {SpecialOffer.name}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            onClick={async () => {
              await handleUpdateCruiseDetailLocation(idCruise, detailLocation, dispatch);
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
