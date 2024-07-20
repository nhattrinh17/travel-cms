'use client';

import { upLoadFiles } from '@/share/upLoadFile';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Table from '@/uiCore/Table';
import { addOrUpdateRoomCruise } from '@/utils/api';
import { useRoomCruise } from '@/utils/handleCruise';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function RoomCruise({
  //
  onCancel,
  idCruise,
}: {
  onCancel: () => void;
  idCruise: number;
}): JSX.Element {
  const [refreshData, setRefreshData] = useState(true);
  const dataRoom = useRoomCruise(idCruise, refreshData);
  const [idEdit, setIdEdit] = useState<number>();
  const [isCreate, setIsCreate] = useState(false);
  const roomById = dataRoom.find((i) => i.id == idEdit);

  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Name ',
      name: 'name',
      type: 'text',
      readOnly: false,
      value: roomById?.name || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Price',
      name: 'price',
      type: 'number',
      readOnly: false,
      value: roomById?.price || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Total room',
      name: 'totalRooms',
      type: 'number',
      readOnly: false,
      value: roomById?.totalRooms || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Max person',
      name: 'maxPerson',
      type: 'number',
      readOnly: false,
      value: roomById?.maxPerson || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Type Bed',
      name: 'typeBed',
      type: 'string',
      readOnly: false,
      value: roomById?.typeBed || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'View Ocean',
      name: 'isViewOcean',
      type: 'checkbox',
      readOnly: false,
      value: roomById?.isViewOcean || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Acreage',
      name: 'acreage',
      type: 'number',
      readOnly: false,
      value: roomById?.acreage || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Location',
      name: 'location',
      type: 'text',
      readOnly: false,
      value: roomById?.location || 0,
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'SpecialService (Separated by "*_*")',
      name: 'specialService',
      type: 'textarea',
      readOnly: false,
      value: roomById?.specialService || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Amenities (Separated by "*_*")',
      name: 'amenities',
      type: 'textarea',
      readOnly: false,
      value: roomById?.amenities || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Detail',
      name: 'content',
      type: 'editor',
      readOnly: false,
      value: roomById?.content || '',
      canUpdate: true,
      placeholder: '',
    },
    {
      label: 'Image ',
      name: 'images',
      type: 'images',
      readOnly: false,
      value: roomById?.images || '',
      canUpdate: true,
    },
  ];

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#dadae178] flex justify-center items-center">
      <div className="bg-white p-4 rounded-md relative w-[75%]">
        <div className="">
          <h3>Update Accompanied Special Offer</h3>
          <FontAwesomeIcon onClick={onCancel} icon={faXmark} className="absolute top-5 right-5 cursor-pointer" />
        </div>
        <div className="py-3">
          <div className="py-2 px-3 border-[1px] bg-white border-[#ccc] rounded-2xl w-fit cursor-pointer transition-all" onClick={() => setIsCreate(true)}>
            <span className="mr-1 text-base">Add Room</span>
            <FontAwesomeIcon className="text-xs" icon={faPlus} />
          </div>
        </div>
        <Table
          //
          columnNotShow={['cruiseId', 'images', 'amenities', 'content', 'specialService']}
          columnDelete={false}
          columnEdit
          data={dataRoom}
          handleEdit={(id) => setIdEdit(id)}
        />
        {(idEdit || isCreate) && (
          <PopupEditOrAddV1
            title={isCreate ? 'Add Destination' : 'Update Destination'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
              setIsCreate(false);
            }}
            id={idEdit}
            onSubmitCreate={async (data, dispatch) => {
              data.cruiseId = idCruise;
              const res = await addOrUpdateRoomCruise(data);
              if (res.data) {
                setRefreshData((pre) => !pre);
              }
            }}
            onSubmit={async (id, data, dispatch) => {
              data.cruiseId = idCruise;
              data.roomId = idEdit;
              const res = await addOrUpdateRoomCruise(data);
              if (res.data) {
                setRefreshData((pre) => !pre);
              }
            }}
            position={'fixed'}
            maxWidth={'70%'}
            handleUpLoadFiles={(file) => upLoadFiles('image', file)}
          />
        )}
      </div>
    </div>
  );
}
