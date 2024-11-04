'use client';

import { useAppDispatch } from '@/lib';
import { handleUpdateAccompaniedServiceCruise, handleUpdateAccompaniedServiceTour, handleUpdateBookingServiceCruise, useAccompaniedService, useOtherServiceBooking } from '@/utils/handleService';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState } from 'react';

export function UpdateServiceCruiseAndTour({
  //
  idCruiseOrTour,
  isForTour,
  onCancel,
  serviceSelectInit,
  otherServiceInit,
}: {
  onCancel: () => void;
  isForTour?: boolean;
  idCruiseOrTour: number;
  serviceSelectInit: number[];
  otherServiceInit: number[];
}): JSX.Element {
  const { data } = useAccompaniedService(100);
  const { data: dataOtherService } = useOtherServiceBooking(100);
  const [serviceSelect, setServiceSelect] = useState<number[]>(serviceSelectInit);
  const [otherService, setOtherService] = useState<number[]>(otherServiceInit);

  const dispatch = useAppDispatch();

  return (
    <div className="text-black absolute top-0 left-0 bottom-0 right-0 bg-[#dadae178] flex justify-center items-center">
      <div className="bg-white p-4 rounded-md relative ">
        <div
          className={classNames({
            'min-w-[600px]': !isForTour,
            'min-w-[400px]': !isForTour,
          })}>
          <h3>{isForTour ? 'Update Accompanied Service' : 'Update Accompanied Service And Other Booking Service'}</h3>
          <FontAwesomeIcon onClick={onCancel} icon={faXmark} className="absolute top-5 right-5 cursor-pointer" />
        </div>
        <div className="pt-3">
          <h4
            className={classNames({
              hidden: isForTour,
            })}>
            1. Accompanied Service
          </h4>
          <ul className="pb-3 overflow-auto max-h-[200px] grid grid-cols-2">
            {data.map((service, index) => (
              <li key={index} className="flex py-2 cursor-pointer">
                <input
                  onChange={() => {
                    setServiceSelect((pre) => {
                      if (pre.includes(service.id)) {
                        return pre.filter((i) => i != service.id);
                      } else {
                        return [...pre, service.id];
                      }
                    });
                  }}
                  id={`accompanied-service-${index}`}
                  defaultChecked={serviceSelect.includes(service.id)}
                  type="checkbox"
                  className="mr-5"
                />
                <label htmlFor={`accompanied-service-${index}`} className="flex-1">
                  {service.name}
                </label>
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
        <div className="pt-3">
          <h4
            className={classNames({
              hidden: isForTour,
            })}>
            2. Other Booking service
          </h4>
          <ul className="pb-3 overflow-auto max-h-[200px] grid grid-cols-2">
            {dataOtherService.map((service, index) => (
              <li key={index} className="flex py-2 cursor-pointer">
                <input
                  onChange={() => {
                    setOtherService((pre) => {
                      if (pre.includes(service.id)) {
                        return [...pre.filter((i) => i != service.id)];
                      } else {
                        return [...pre, service.id];
                      }
                    });
                  }}
                  id={`other-service-${index}`}
                  defaultChecked={otherService.includes(service.id)}
                  type="checkbox"
                  className="mr-5"
                />
                <label htmlFor={`other-service-${index}`} className="flex-1">
                  {service.name}
                </label>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <button
              onClick={async () => {
                if (isForTour) {
                } else {
                  await handleUpdateBookingServiceCruise(idCruiseOrTour, otherService, dispatch);
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
    </div>
  );
}
