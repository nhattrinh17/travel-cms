'use client';

import { HeaderContent } from '@/components/HeaderContent';
import { useAppDispatch } from '@/lib';
import { setLimitOrPageBookingCruise } from '@/lib/redux/app/bookingCruise.slice';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { useBookingCruise } from '@/utils/handleBookingCruise';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind({});

export function BookingCruiseSection(): JSX.Element {
  const { data, pagination } = useBookingCruise();
  const [idEdit, setIdEdit] = useState<number>();
  const bookingById = data.find((i) => i.id == idEdit);
  const dispatch = useAppDispatch();

  const setPageBookingCruise = (page: number) => {
    dispatch(setLimitOrPageBookingCruise({ page: page }));
  };

  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Name cruise',
      name: 'nameCuise',
      readOnly: true,
      type: 'text',
      value: bookingById?.nameCruise || '',
      canUpdate: false,
    },
    {
      label: 'Type Itineraries',
      name: 'typeItineraries',
      readOnly: true,
      type: 'text',
      value: bookingById?.typeItineraries || '',
      canUpdate: false,
    },
    {
      label: 'Type Itineraries',
      name: 'typeItineraries',
      readOnly: true,
      type: 'editor',
      value: bookingById?.detail || '',
      canUpdate: false,
    },
  ];

  return (
    <main className="relative min-h-full">
      <HeaderContent path="cruise/booking" title="Manage booking Cruise" />
      {/* <h2 className="font-medium text-base">Manage Config Cruise</h2> */}
      <div className="p-3 ">
        <div className={cx('min-h-full flex-1')}>
          <Table
            //
            columnNotShow={['slug', 'detail', 'cruise', 'createdAt', 'totalChildren', 'totalAdult']}
            textColor="black"
            data={data}
            columnDelete={false}
            columnEdit={false}
            moreColumnsOptions={[
              {
                icon: faCircleInfo,
                name: 'Detail',
                handleClick(item) {
                  setIdEdit(item.id);
                },
              },
            ]}
            handleEdit={(id) => {}}
          />
          <Pagination count={pagination.total} limit={pagination.limit} page={pagination.page} setPage={setPageBookingCruise} />
        </div>
        {idEdit && (
          <PopupEditOrAddV1
            title={'Detail Booking'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
            }}
            id={idEdit}
            onSubmitCreate={(data, dispatch) => {}}
            position={'fixed'}
            maxWidth={'100%'}
          />
        )}
      </div>
    </main>
  );
}
