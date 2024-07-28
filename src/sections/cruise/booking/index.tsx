'use client';

import { HeaderContent } from '@/components/HeaderContent';
import { useAppDispatch } from '@/lib';
import { setLimitOrPageBookingCruise } from '@/lib/redux/app/bookingCruise.slice';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { contactCustomerCruise } from '@/utils/api';
import { useBookingCruise } from '@/utils/handleBookingCruise';
import { faCircleInfo, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

const cx = classNames.bind({});

export function BookingCruiseSection(): JSX.Element {
  const { data, pagination } = useBookingCruise();
  const idEdit = useRef<number>();
  const [openContact, setOpenContact] = useState<boolean>();
  const [openDetail, setOpenDetail] = useState<boolean>();
  const bookingById = data.find((i) => i.id == idEdit.current);
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

  const dataSendMail: ItemAddOrUpdateDto[] = [
    {
      label: 'Name cruise',
      name: 'nameCruise',
      readOnly: true,
      type: 'text',
      value: bookingById?.nameCruise || '',
      canUpdate: false,
    },
    {
      label: 'Send to',
      name: 'sendTo',
      readOnly: true,
      type: 'text',
      value: bookingById?.email || '',
      canUpdate: true,
    },
    {
      label: 'Subject',
      name: 'subject',
      readOnly: false,
      required: true,
      type: 'text',
      value: '',
      canUpdate: true,
    },
    {
      label: 'Content',
      name: 'content',
      readOnly: true,
      type: 'editor',
      value: bookingById?.detail || '',
      canUpdate: true,
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
                  idEdit.current = item.id;
                  setOpenDetail(true);
                },
              },
              {
                icon: faPaperPlane,
                name: 'Contact',
                handleClick(item) {
                  idEdit.current = item.id;
                  setOpenContact(true);
                },
              },
            ]}
            handleEdit={(id) => {}}
          />
          <Pagination count={pagination.total} limit={pagination.limit} page={pagination.page} setPage={setPageBookingCruise} />
        </div>
        {openDetail && (
          <PopupEditOrAddV1
            title={'Detail Booking'}
            data={dataDto}
            onCancel={() => {
              setOpenDetail(false);
            }}
            onSubmitCreate={(data, dispatch) => {}}
            position={'fixed'}
            maxWidth={'100%'}
          />
        )}
        {openContact && (
          <PopupEditOrAddV1
            title={'Contact Customer'}
            data={dataSendMail}
            onCancel={() => {
              setOpenContact(false);
            }}
            onSubmitCreate={async (data, dispatch) => {
              const res = await contactCustomerCruise(data);
              if (res) {
                setOpenContact(false);
              }
            }}
            position={'fixed'}
            maxWidth={'100%'}
          />
        )}
      </div>
    </main>
  );
}
