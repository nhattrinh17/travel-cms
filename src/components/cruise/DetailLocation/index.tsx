'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Table from '@/uiCore/Table';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { useDestination } from '@/utils/handleDestination';
import { upLoadFiles } from '@/share/upLoadFile';
import { useAppDispatch } from '@/lib';
import { resetDataDestination } from '@/lib/redux/app/destination.slice';
import { handleCreateDetailLocation, handleUpdateDetailLocation, useDetailLocation } from '@/utils/handleDetailLoaction';

const cx = classNames.bind(styles);

export function DetailLocationComponent({ onCancel }: { onCancel: () => void }): JSX.Element {
  const [isCreate, setIsCreate] = useState(false);
  const { data: dataDestination } = useDestination(100);
  const [idDetail, setIdDetail] = useState<number>(0);
  const { data: dataDetail } = useDetailLocation(idDetail);
  const [idEdit, setIdEdit] = useState<number>();
  const dispatch = useAppDispatch();

  const detailLocationById = dataDetail.find((i) => i.id == idEdit);
  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Name ',
      name: 'name',
      type: 'text',
      readOnly: false,
      value: detailLocationById?.name || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Title ',
      name: 'title',
      type: 'text',
      readOnly: false,
      value: detailLocationById?.title || '',
      canUpdate: true,
      placeholder: 'Enter title...',
    },
    {
      label: 'Description',
      name: 'description',
      type: 'editor',
      readOnly: false,
      value: detailLocationById?.description || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Image ',
      name: 'images',
      type: 'images',
      readOnly: false,
      value: detailLocationById?.images || '',
      canUpdate: true,
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(resetDataDestination());
    };
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div>
        <div className="flex justify-between">
          <h2 className="font-medium">Manage detail Destination</h2>
          <FontAwesomeIcon className="text-xl cursor-pointer" icon={faXmark} onClick={onCancel} />
        </div>
        <p className="text-sm underline">Click update to see destination description</p>
        <div className="flex items-center mt-2">
          <select defaultValue={idDetail} onChange={(e) => setIdDetail(+e.target.value)} className="mr-5 outline-none border-[1px] rounded-2xl py-2 px-3">
            <option>--Select Destination--</option>
            {dataDestination.map((d, index) => (
              <option value={d.id} key={index}>
                {d.name}
              </option>
            ))}
          </select>
          <div className=" px-3 py-[6px] border-[1px] rounded-2xl w-fit cursor-pointer hover:bg-[#a27cff63] transition-all" onClick={() => setIsCreate(true)}>
            <span className="mr-1 text-base">Add Destination</span>
            <FontAwesomeIcon className="text-xs" icon={faPlus} onClick={() => {}} />
          </div>
        </div>

        <div className={cx('min-h-full flex-1')}>
          {dataDetail.length ? (
            <Table
              columnNotShow={['slug', 'description', 'images']}
              textColor="black"
              data={dataDetail}
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
            title={isCreate ? `Add Detail Destination` : 'Update Detail Destination'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
              setIsCreate(false);
            }}
            id={idEdit}
            onSubmitCreate={(data, dispatch) => {
              data.destinationId = idDetail;
              handleCreateDetailLocation(data, dispatch);
            }}
            onSubmit={handleUpdateDetailLocation}
            position={'fixed'}
            maxWidth={'60%'}
            handleUpLoadFiles={(file) => upLoadFiles('image', file)}
          />
        )}
      </div>
    </div>
  );
}
