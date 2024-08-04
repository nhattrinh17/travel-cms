'use client';

import { HeaderContent } from '@/components/HeaderContent';
import { RoomCruise } from '@/components/RoomCruise';
import { UpdateSpecialOfferCruiseAndTour } from '@/components/SpecialOffer';
import { UpdateServiceCruiseAndTour } from '@/components/UpdateService';
import { PacketTourComponent } from '@/components/tour/PacketTour';
import { upLoadFiles } from '@/share/upLoadFile';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Table from '@/uiCore/Table';
import { usePacketTour } from '@/utils/handlePacketTour';
import { faUps } from '@fortawesome/free-brands-svg-icons';
import { faBed, faComment, faGift, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { handleCreateTour, handleUpdateTour, useTour } from '@/utils/handleTour';
import Pagination from '@/uiCore/Pagination';
import { setLimitOrPageTour } from '@/lib/redux/app/tour.slice';
import { useAppDispatch } from '@/lib';
import { ItinerariesCruiseAndTour } from '@/components/Itineraries';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { ReviewComponent } from '@/components/Review-Man';

const cx = classNames.bind({});

export function TourManageSection(): JSX.Element {
  const [showPacketTour, setShowPacketTour] = useState(false);
  const { data: dataPacketTour } = usePacketTour(100);
  const [idPacketTour, setIdPacketTour] = useState<number>(0);
  const [typeTour, setTypeTour] = useState<number>();

  const [idEdit, setIdEdit] = useState<number>();
  const [isCreate, setIsCreate] = useState(false);

  const dispatch = useAppDispatch();
  const { data, pagination } = useTour(idPacketTour, typeTour);
  const tourById = data.find((i) => i.id == idEdit);
  // Option
  const [idSelect, setIdSelect] = useState<number>(0);
  const [showService, setShowService] = useState(false);
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);
  const [showItineraries, setShowItineraries] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const setPageTour = (page: number) => {
    dispatch(
      setLimitOrPageTour({
        page: page,
      }),
    );
  };

  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Packet tour',
      name: 'packetTourId',
      readOnly: false,
      type: 'options',
      value: tourById?.packetTourId || 0,
      canUpdate: true,
      dataOption: [
        { text: '--Packet tour--', value: 0 },
        ...dataPacketTour.map((i) => {
          return {
            text: i.name,
            value: i.id,
          };
        }),
      ],
    },
    {
      label: 'Type tour',
      name: 'type',
      readOnly: false,
      type: 'options',
      value: tourById?.type || 0,
      canUpdate: true,
      dataOption: [
        { text: 'Packet tour', value: 0 },
        { text: 'Daily tour', value: 1 },
      ],
    },
    {
      label: 'Name ',
      name: 'name',
      type: 'text',
      readOnly: false,
      value: tourById?.name || '',
      canUpdate: true,
      required: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Content brief(show when introduced)',
      name: 'contentBrief',
      type: 'textarea',
      readOnly: false,
      value: tourById?.contentBrief || '',
      required: true,
      canUpdate: true,
      placeholder: 'Enter ...',
    },
    {
      label: 'Detail',
      name: 'detail',
      type: 'editor',
      readOnly: false,
      value: tourById?.detail || 'Enter detail...',
      required: true,
      canUpdate: true,
      placeholder: 'Enter ...',
    },
    {
      label: 'Price',
      name: 'price',
      type: 'number',
      readOnly: false,
      value: tourById?.price || '',
      canUpdate: true,
      required: true,
      placeholder: '',
    },
    {
      label: 'Stars',
      name: 'stars',
      type: 'number',
      required: true,
      readOnly: false,
      value: tourById?.stars || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Discount (%)',
      name: 'discount',
      type: 'number',
      readOnly: false,
      value: tourById?.discount || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Flash Sale',
      name: 'isFlashSale',
      type: 'checkbox',
      readOnly: false,
      value: Number(tourById?.isFlashSale) || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Traveler loves (Separated by "*_*")',
      name: 'travelerLoves',
      type: 'textarea',
      readOnly: false,
      value: tourById?.travelerLoves || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Image ',
      name: 'images',
      type: 'images',
      readOnly: false,
      value: tourById?.images || '',
      canUpdate: true,
    },
  ];

  return (
    <main className="relative min-h-full">
      <HeaderContent path="cruise" title="Manage Cruise" />
      <div className="p-3 ">
        <div className="">
          <h2 className="font-medium text-base">Manage Config Cruise</h2>
          <div className="mt-2">
            <button onClick={() => setShowPacketTour(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
              List of packet tour
            </button>
          </div>
          {showPacketTour ? <PacketTourComponent onCancel={() => setShowPacketTour(false)} /> : <></>}
        </div>
        <div className="my-3">
          <h3 className="font-medium text-base">Filter Tour</h3>

          <div className="flex items-center mt-2">
            <select defaultValue={idPacketTour} onChange={(e) => setIdPacketTour(+e.target.value)} className="mr-5 outline-none border-[1px] rounded-2xl py-2 px-3">
              <option>--Select PacketTour--</option>
              {dataPacketTour.map((d, index) => (
                <option value={d.id} key={index}>
                  {d.name}
                </option>
              ))}
            </select>

            <select defaultValue={typeTour} onChange={(e) => setTypeTour(+e.target.value)} className="mr-5 outline-none border-[1px] rounded-2xl py-2 px-3">
              <option value={undefined}>--Select Detail PacketTour--</option>
              <option value={0}>Packet tour</option>
              <option value={1}>Daily tour</option>
            </select>

            <div className="py-2 px-3 border-[1px] bg-white border-[#ccc] rounded-2xl w-fit cursor-pointer transition-all" onClick={() => setIsCreate(true)}>
              <span className="mr-1 text-base">Add Tour</span>
              <FontAwesomeIcon className="text-xs" icon={faPlus} />
            </div>
          </div>
        </div>
        <div className={cx('min-h-full flex-1')}>
          <Table
            columnNotShow={['slug', 'detail', 'contentBrief', 'images', 'travelerLoves', 'accompaniedServices', 'specialOffers', 'packetTourId', 'type']}
            textColor="black"
            data={data}
            columnDelete={false}
            columnEdit={true}
            moreColumnsOptions={[
              {
                name: 'serrvice',
                icon: faUps,
                handleClick(item) {
                  setIdSelect(item.id);
                  setShowService(true);
                },
              },
              {
                name: 'Special offer',
                icon: faGift,
                handleClick(item) {
                  setIdSelect(item.id);
                  setShowSpecialOffer(true);
                },
              },
              {
                name: 'Itineraries',
                icon: faRectangleList,
                handleClick(item) {
                  setIdSelect(item.id);
                  setShowItineraries(true);
                },
              },
              {
                name: 'Review',
                icon: faComment,
                handleClick(item) {
                  setIdSelect(item.id);
                  setShowReview(true);
                },
              },
            ]}
            handleEdit={(id) => {
              setIdEdit(id);
            }}
          />
          <Pagination count={pagination.total} limit={pagination.limit} page={pagination.page} setPage={setPageTour} />
        </div>

        {(idEdit || isCreate) && (
          <PopupEditOrAddV1
            title={isCreate ? 'Add PacketTour' : 'Update PacketTour'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
              setIsCreate(false);
            }}
            id={idEdit}
            onSubmitCreate={(data, dispatch) => {
              if (!(Number(data.packetTourId) >= 1)) delete data.packetTourId;
              handleCreateTour(data, dispatch);
            }}
            onSubmit={(id, data, dispatch) => {
              if (!(Number(data.packetTourId) >= 1)) delete data.packetTourId;
              handleUpdateTour(id, data, dispatch);
            }}
            position={'fixed'}
            maxWidth={'90%'}
            handleUpLoadFiles={(file) => upLoadFiles('image', file)}
          />
        )}

        {showService ? (
          <UpdateServiceCruiseAndTour
            idCruiseOrTour={idSelect}
            isForTour
            onCancel={() => {
              setShowService(false);
            }}
            otherServiceInit={[]}
            serviceSelectInit={data.find((i) => i.id == idSelect)?.accompaniedServices.map((i) => i.id) || []}
          />
        ) : (
          <></>
        )}

        {showSpecialOffer ? (
          <UpdateSpecialOfferCruiseAndTour
            idCruiseOrTour={idSelect}
            isForTour
            onCancel={() => {
              setShowSpecialOffer(false);
            }}
            specialOfferInit={data.find((i) => i.id == idSelect)?.specialOffers.map((i) => i.id) || []}
          />
        ) : (
          <></>
        )}
        {showItineraries ? <ItinerariesCruiseAndTour isForTour idCruiseOrTour={idSelect} onCancel={() => setShowItineraries(false)} /> : <></>}
        {showReview ? <ReviewComponent idTour={idSelect} idCruise={0} onCancel={() => setShowReview(false)} /> : <></>}
      </div>
    </main>
  );
}
