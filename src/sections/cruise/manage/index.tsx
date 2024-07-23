'use client';

import { UpdateCruiseDetailLocation } from '@/components/CruiseDetailLocation';
import { HeaderContent } from '@/components/HeaderContent';
import { ItinerariesCruiseAndTour } from '@/components/Itineraries';
import { ReviewComponent } from '@/components/Review-Man';
import { RoomCruise } from '@/components/RoomCruise';
import { UpdateSpecialOfferCruiseAndTour } from '@/components/SpecialOffer';
import { UpdateServiceCruiseAndTour } from '@/components/UpdateService';
import { DestinationComponent } from '@/components/cruise/Destination';
import { DetailLocationComponent } from '@/components/cruise/DetailLocation';
import { useAppDispatch } from '@/lib';
import { setLimitOrPageCruise } from '@/lib/redux/app/cruise.slice';
import { upLoadFiles } from '@/share/upLoadFile';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { handleCreateCruise, handleUpdateCruise, useCruise } from '@/utils/handleCruise';
import { useDestination } from '@/utils/handleDestination';
import { useDetailLocation } from '@/utils/handleDetailLoaction';
import { faUps } from '@fortawesome/free-brands-svg-icons';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faBed, faComment, faGift, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind({});

export function CruiseManageSection(): JSX.Element {
  const [showDestination, setShowDestination] = useState(false);
  const [showDetailLocation, setShowDetailLocation] = useState(false);
  const { data: dataDestination } = useDestination(100);
  const [idDestination, setIdDestination] = useState<number>(0);
  const { data: dataDetailLocation } = useDetailLocation(idDestination);
  const [idDetailLocation, setIdDetailLocation] = useState<number>(0);
  const [idEdit, setIdEdit] = useState<number>();
  const [isCreate, setIsCreate] = useState(false);

  const dispatch = useAppDispatch();
  const { data, pagination } = useCruise(idDestination, idDetailLocation);
  const cruiseById = data.find((i) => i.id == idEdit);
  // Option
  const [idSelect, setIdSelect] = useState<number>(0);
  const [showService, setShowService] = useState(false);
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);
  const [showTypeRoom, setShowTypeRoom] = useState(false);
  const [showItineraries, setShowItineraries] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showLocationCruise, setShowLocationCruise] = useState(false);

  const setPageTour = (page: number) => {
    dispatch(
      setLimitOrPageCruise({
        page: page,
      }),
    );
  };

  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Destination',
      name: 'destinationId',
      readOnly: !!cruiseById,
      type: 'options',
      value: cruiseById?.destinationId || dataDestination[0]?.id,
      canUpdate: !cruiseById,
      dataOption: [
        ...dataDestination.map((i) => {
          return {
            text: i.name,
            value: i.id,
          };
        }),
      ],
    },
    {
      label: 'Name ',
      name: 'name',
      type: 'text',
      readOnly: false,
      value: cruiseById?.name || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Style ',
      name: 'styleCruise',
      type: 'text',
      readOnly: false,
      value: cruiseById?.styleCruise || '',
      canUpdate: true,
      placeholder: 'Enter style...',
    },
    {
      label: 'Content brief(show when introduced)',
      name: 'contentBrief',
      type: 'textarea',
      readOnly: false,
      value: cruiseById?.contentBrief || '',
      canUpdate: true,
      placeholder: 'Enter ...',
    },
    {
      label: 'Detail',
      name: 'detail',
      type: 'editor',
      readOnly: false,
      value: cruiseById?.detail || '',
      canUpdate: true,
      placeholder: 'Enter ...',
    },
    {
      label: 'Price',
      name: 'price',
      type: 'number',
      readOnly: false,
      value: cruiseById?.price || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Link tripadvisor',
      name: 'linkTripadvisor',
      type: 'text',
      readOnly: false,
      value: cruiseById?.linkTripadvisor || '',
      canUpdate: true,
      placeholder: 'Enter link...',
    },
    {
      label: 'Total review tripadvisor',
      name: 'reviewTripadvisor',
      type: 'number',
      readOnly: false,
      value: cruiseById?.reviewTripadvisor || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Discount (%)',
      name: 'discount',
      type: 'number',
      readOnly: false,
      value: cruiseById?.discount || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Flash Sale',
      name: 'isFlashSale',
      type: 'checkbox',
      readOnly: false,
      value: Number(cruiseById?.isFlashSale) || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Total room',
      name: 'totalRoom',
      type: 'number',
      readOnly: false,
      value: cruiseById?.totalRoom || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Time launched',
      name: 'timeLaunched',
      type: 'number',
      readOnly: false,
      value: cruiseById?.timeLaunched || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Traveler loves (Separated by "*_*")',
      name: 'travelerLoves',
      type: 'textarea',
      readOnly: false,
      value: cruiseById?.travelerLoves || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Image ',
      name: 'images',
      type: 'images',
      readOnly: false,
      value: cruiseById?.images || '',
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
            <button onClick={() => setShowDestination(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
              List of destinations
            </button>
            <button onClick={() => setShowDetailLocation(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
              List of detail destination
            </button>
          </div>
          {showDestination ? <DestinationComponent onCancel={() => setShowDestination(false)} /> : <></>}
          {showDetailLocation ? <DetailLocationComponent onCancel={() => setShowDetailLocation(false)} /> : <></>}
        </div>
        <div className="my-3">
          <h3 className="font-medium text-base">Filter Cruise</h3>
          {/* <p className="text-red-500 mt-1">
            Please selected <span className="underline">Destination</span> and <span className="underline">Detail Destination</span> before add cruise
          </p> */}
          <div className="flex items-center mt-2">
            <select defaultValue={idDestination} onChange={(e) => setIdDestination(+e.target.value)} className="mr-5 outline-none border-[1px] rounded-2xl py-2 px-3">
              <option>--Select Destination--</option>
              {dataDestination.map((d, index) => (
                <option value={d.id} key={index}>
                  {d.name}
                </option>
              ))}
            </select>

            <select defaultValue={idDetailLocation} onChange={(e) => setIdDetailLocation(+e.target.value)} className="mr-5 outline-none border-[1px] rounded-2xl py-2 px-3">
              <option>--Select Detail Destination--</option>
              {dataDetailLocation.map((d, index) => (
                <option value={d.id} key={index}>
                  {d.name}
                </option>
              ))}
            </select>

            <div className="py-2 px-3 border-[1px] bg-white border-[#ccc] rounded-2xl w-fit cursor-pointer transition-all" onClick={() => setIsCreate(true)}>
              <span className="mr-1 text-base">Add Cruise</span>
              <FontAwesomeIcon className="text-xs" icon={faPlus} />
            </div>
          </div>
        </div>
        <div className={cx('min-h-full flex-1')}>
          <Table
            columnNotShow={['slug', 'linkTripadvisor', 'detailLocations', 'reviewTripadvisor', 'detail', 'destinationId', 'detailLocationId', 'contentBrief', 'images', 'travelerLoves', 'accompaniedServices', 'specialOffers', 'otherServiceBookings', 'timeLaunched']}
            textColor="black"
            data={data}
            columnDelete={false}
            columnEdit={true}
            moreColumnsOptions={[
              {
                name: 'service',
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
                name: 'Location',
                icon: faLocationDot,
                handleClick(item) {
                  setIdSelect(item.id);
                  setShowLocationCruise(true);
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
                name: 'Type Room',
                icon: faBed,
                handleClick(item) {
                  setIdSelect(item.id);
                  setShowTypeRoom(true);
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
            title={isCreate ? 'Add Destination' : 'Update Destination'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
              setIsCreate(false);
            }}
            id={idEdit}
            onSubmitCreate={(data, dispatch) => {
              handleCreateCruise(data, dispatch);
            }}
            onSubmit={handleUpdateCruise}
            position={'fixed'}
            maxWidth={'90%'}
            handleUpLoadFiles={(file) => upLoadFiles('image', file)}
          />
        )}

        {showService ? (
          <UpdateServiceCruiseAndTour
            idCruiseOrTour={idSelect}
            onCancel={() => {
              setShowService(false);
            }}
            serviceSelectInit={data.find((i) => i.id == idSelect)?.accompaniedServices.map((i) => i.id) || []}
            otherServiceInit={data.find((i) => i.id == idSelect)?.otherServiceBookings.map((i) => i.id) || []}
          />
        ) : (
          <></>
        )}

        {showSpecialOffer ? (
          <UpdateSpecialOfferCruiseAndTour
            idCruiseOrTour={idSelect}
            onCancel={() => {
              setShowSpecialOffer(false);
            }}
            specialOfferInit={data.find((i) => i.id == idSelect)?.specialOffers.map((i) => i.id) || []}
          />
        ) : (
          <></>
        )}

        {showTypeRoom ? <RoomCruise idCruise={idSelect} onCancel={() => setShowTypeRoom(false)} /> : <></>}
        {showItineraries ? <ItinerariesCruiseAndTour idCruiseOrTour={idSelect} onCancel={() => setShowItineraries(false)} /> : <></>}
        {showReview ? <ReviewComponent idCruise={idSelect} idTour={0} onCancel={() => setShowReview(false)} /> : <></>}
        {showLocationCruise ? <UpdateCruiseDetailLocation idDestination={data.find((i) => i.id == idSelect)?.destinationId || 0} detailLocationInit={data.find((i) => i.id == idSelect)?.detailLocations.map((i) => i.id) || []} idCruise={idSelect} onCancel={() => setShowLocationCruise(false)} /> : <></>}
      </div>
    </main>
  );
}
