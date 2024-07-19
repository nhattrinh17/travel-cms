'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Table from '@/uiCore/Table';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { handleCreateDestination, handleUpdateDestination, useDestination } from '@/utils/handleDestination';
import { upLoadOneFile } from '@/share/upLoadFile';
import { useAppDispatch } from '@/lib';
import { resetDataDestination } from '@/lib/redux/app/destination.slice';

const cx = classNames.bind(styles);

export function DestinationComponent({ onCancel }: { onCancel: () => void }): JSX.Element {
  const [isCreate, setIsCreate] = useState(false);
  const { data } = useDestination();
  const [idEdit, setIdEdit] = useState<number>();
  const dispatch = useAppDispatch();

  const subjectById = data.find((i) => i.id == idEdit);
  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Name ',
      name: 'name',
      type: 'text',
      readOnly: false,
      value: subjectById?.name || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Title ',
      name: 'title',
      type: 'text',
      readOnly: false,
      value: subjectById?.title || '',
      canUpdate: true,
      placeholder: 'Enter title...',
    },
    {
      label: 'Description',
      name: 'description',
      type: 'editor',
      readOnly: false,
      value: subjectById?.description || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Image ',
      name: 'image',
      type: 'image',
      readOnly: false,
      value: subjectById?.image || '',
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
          <h2 className="font-medium">Manage Destination</h2>
          <FontAwesomeIcon className="text-xl cursor-pointer" icon={faXmark} onClick={onCancel} />
        </div>
        <p className="text-sm underline">Click update to see destination description</p>
        <div className="mt-2 px-3 py-[6px] border-[1px] rounded-2xl w-fit cursor-pointer hover:bg-[#a27cff63] transition-all" onClick={() => setIsCreate(true)}>
          <span className="mr-1 text-base">Add Destination</span>
          <FontAwesomeIcon className="text-xs" icon={faPlus} onClick={() => {}} />
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
            onSubmitCreate={handleCreateDestination}
            onSubmit={handleUpdateDestination}
            position={'fixed'}
            maxWidth={'60%'}
            handleUploadOneFile={(file) => upLoadOneFile('image', file)}
          />
        )}
      </div>
    </div>
  );
}
