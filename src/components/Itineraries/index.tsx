'use client';

import { upLoadFiles } from '@/share/upLoadFile';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Table from '@/uiCore/Table';
import { addOrUpdateItinerariesCruise, addOrUpdateItinerariesTour } from '@/utils/api';
import { useItinerariesCruise } from '@/utils/handleCruise';
import { useItinerariesTour } from '@/utils/handleTour';
import { faBed, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { RoomCruise } from '../RoomCruise';

export function ItinerariesCruiseAndTour({
  //
  onCancel,
  idCruiseOrTour,
  isForTour,
}: {
  onCancel: () => void;
  idCruiseOrTour: number;
  isForTour?: boolean;
}): JSX.Element {
  const [refreshData, setRefreshData] = useState(true);
  const dataItineraries = isForTour ? useItinerariesTour(idCruiseOrTour, refreshData) : useItinerariesCruise(idCruiseOrTour, refreshData);
  const [idEdit, setIdEdit] = useState<number>();
  const [isCreate, setIsCreate] = useState(false);
  const itinerariesId = dataItineraries.find((i) => i.id == idEdit);
  const [showTypeRoom, setShowTypeRoom] = useState(false);
  const [idSelect, setIdSelect] = useState<number>(0);

  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Name ',
      name: 'name',
      type: 'text',
      readOnly: false,
      value: itinerariesId?.name || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Day',
      name: 'day',
      type: 'number',
      readOnly: false,
      value: itinerariesId?.day || 1,
      canUpdate: true,
      placeholder: 'Enter day...',
    },
    {
      label: 'Description (optional)',
      name: 'description',
      type: 'textarea',
      readOnly: false,
      value: itinerariesId?.description || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Detail',
      name: 'content',
      type: 'editor',
      readOnly: false,
      value: itinerariesId?.content || '',
      canUpdate: true,
      placeholder: '',
    },
  ];

  return (
    <div className="text-black absolute top-0 left-0 bottom-0 right-0 bg-[#dadae178] flex justify-center items-center">
      <div className="bg-white p-4 rounded-md relative w-[75%]">
        <div className="">
          <h3>Update Itineraries</h3>
          <FontAwesomeIcon onClick={onCancel} icon={faXmark} className="absolute top-5 right-5 cursor-pointer" />
        </div>
        <div className="py-3">
          <div className="py-2 px-3 border-[1px] bg-white border-[#ccc] rounded-2xl w-fit cursor-pointer transition-all" onClick={() => setIsCreate(true)}>
            <span className="mr-1 text-base">Add itineraries</span>
            <FontAwesomeIcon className="text-xs" icon={faPlus} />
          </div>
        </div>
        <Table
          //
          columnNotShow={['cruiseId', 'images', 'amenities', 'content', 'specialService']}
          columnDelete={false}
          columnEdit
          data={dataItineraries}
          handleEdit={(id) => setIdEdit(id)}
          moreColumnsOptions={
            !isForTour
              ? [
                  {
                    name: 'Type Room',
                    icon: faBed,
                    handleClick(item) {
                      setIdSelect(item.id);
                      setShowTypeRoom(true);
                    },
                  },
                ]
              : []
          }
        />
        {(idEdit || isCreate) && (
          <PopupEditOrAddV1
            title={isCreate ? 'Add itineraries' : 'Update itineraries'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
              setIsCreate(false);
            }}
            id={idEdit}
            onSubmitCreate={async (data, dispatch) => {
              if (isForTour) {
                data.tourId = idCruiseOrTour;
                const res = await addOrUpdateItinerariesTour(data);
                if (res.data) {
                  setRefreshData((pre) => !pre);
                }
              } else {
                data.cruiseId = idCruiseOrTour;
                const res = await addOrUpdateItinerariesCruise(data);
                if (res.data) {
                  setRefreshData((pre) => !pre);
                }
              }
            }}
            onSubmit={async (id, data, dispatch) => {
              data.itinerariesId = idEdit;
              if (isForTour) {
                data.tourId = idCruiseOrTour;
                const res = await addOrUpdateItinerariesTour(data);
                if (res.data) {
                  setRefreshData((pre) => !pre);
                }
              } else {
                data.cruiseId = idCruiseOrTour;
                const res = await addOrUpdateItinerariesCruise(data);
                if (res.data) {
                  setRefreshData((pre) => !pre);
                }
              }
            }}
            position={'fixed'}
            maxWidth={'70%'}
            handleUpLoadFiles={(file) => upLoadFiles('image', file)}
          />
        )}
      </div>
      {showTypeRoom ? <RoomCruise idCruise={idCruiseOrTour} itinerariesId={idSelect} onCancel={() => setShowTypeRoom(false)} /> : <></>}
    </div>
  );
}
