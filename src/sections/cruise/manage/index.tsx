'use client';

import { HeaderContent } from '@/components/HeaderContent';
import { DestinationComponent } from '@/components/cruise/Destination';
import { DetailLocationComponent } from '@/components/cruise/DetailLocation';
import { upLoadFiles } from '@/share/upLoadFile';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Table from '@/uiCore/Table';
import { handleCreateCruise, handleUpdateCruise, useCruise } from '@/utils/handleCruise';
import { useDestination } from '@/utils/handleDestination';
import { useDetailLocation } from '@/utils/handleDetailLoaction';
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

  const { data } = useCruise(idDestination, idDetailLocation);
  const cruiseById = data.find((i) => i.id == idEdit);

  const dataDto: ItemAddOrUpdateDto[] = [
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
        <div className="mt-3">
          <h3 className="font-medium text-base">Filter Cruise</h3>

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
          </div>
        </div>
        <div className={cx('min-h-full flex-1')}>
          {data.length ? (
            <Table
              columnNotShow={['slug', 'description']}
              textColor="black"
              data={data}
              columnDelete={false}
              columnEdit={true}
              // handleDelete={(id) => {
              //   handleDeleteBankPayment(idPayment, id, dispatch);
              // }}
              handleEdit={(id) => {
                setIdEdit(id);
              }}
            />
          ) : (
            <h2 className="text-center text-xl text-gray-700">Không có dữ liệu phù hợp !!</h2>
          )}
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
              data.destinationId = idDestination;
              data.detailLocationId = idDetailLocation;
              handleCreateCruise(data, dispatch);
            }}
            onSubmit={handleUpdateCruise}
            position={'fixed'}
            maxWidth={'60%'}
            handleUpLoadFiles={(file) => upLoadFiles('image', file)}
          />
        )}
      </div>
    </main>
  );
}
