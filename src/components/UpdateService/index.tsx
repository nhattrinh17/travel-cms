'use client';

import { useAppDispatch } from '@/lib';
import { handleUpdateAccompaniedServiceCruise, handleUpdateAccompaniedServiceTour, useAccompaniedService } from '@/utils/handleService';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function UpdateServiceCruiseAndTour({
  //
  idCruiseOrTour,
  isForTour,
  onCancel,
  serviceSelectInit,
}: {
  onCancel: () => void;
  isForTour?: boolean;
  idCruiseOrTour: number;
  serviceSelectInit: number[];
}): JSX.Element {
  const { data } = useAccompaniedService(100);
  const [serviceSelect, setServiceSelect] = useState<number[]>(serviceSelectInit);
  const dispatch = useAppDispatch();

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#dadae178] flex justify-center items-center">
      <div className="bg-white p-4 rounded-md relative ">
        <div className="min-w-[400px]">
          <h3>Update Accompanied Service</h3>
          <FontAwesomeIcon onClick={onCancel} icon={faXmark} className="absolute top-5 right-5 cursor-pointer" />
        </div>
        <ul className="py-3 overflow-auto max-h-[200px]">
          {data.map((service, index) => (
            <li
              key={index}
              onClick={() => {
                setServiceSelect((pre) => {
                  if (pre.includes(service.id)) {
                    return pre.filter((i) => i != service.id);
                  } else {
                    return [...pre, service.id];
                  }
                });
              }}
              className="flex py-2 cursor-pointer">
              <input defaultChecked={serviceSelect.includes(service.id)} type="checkbox" className="mr-5" />
              <p className="flex-1">{service.name}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            onClick={async () => {
              if (isForTour) {
                await handleUpdateAccompaniedServiceTour(idCruiseOrTour, serviceSelect, dispatch);
              } else {
                await handleUpdateAccompaniedServiceCruise(idCruiseOrTour, serviceSelect, dispatch);
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
