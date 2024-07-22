'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Table from '@/uiCore/Table';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { handleCreateReview, handleUpdateReview, useReview } from '@/utils/handleReview';

import { useAppDispatch } from '@/lib';

import { upLoadFiles } from '@/share/upLoadFile';
import { resetDataReview } from '@/lib/redux/app/review.slice';

const cx = classNames.bind(styles);

export function ReviewComponent({ onCancel, idCruise, idTour }: { onCancel: () => void; idCruise: number; idTour: number }): JSX.Element {
  const [isCreate, setIsCreate] = useState(false);
  const { data } = useReview(idCruise, idTour);
  const [idEdit, setIdEdit] = useState<number>();
  const dispatch = useAppDispatch();

  const subjectById = data.find((i) => i.id == idEdit);
  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Title ',
      name: 'title',
      type: 'text',
      readOnly: false,
      value: subjectById?.title || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Name ',
      name: 'fullName',
      type: 'text',
      readOnly: false,
      value: subjectById?.fullName || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Date ',
      name: 'date',
      type: 'date',
      readOnly: false,
      value: subjectById?.date || '',
      canUpdate: true,
      placeholder: 'Enter title...',
    },
    {
      label: 'Avatar (optional)',
      name: 'image',
      type: 'image',
      readOnly: false,
      value: subjectById?.image || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Content',
      name: 'description',
      type: 'textarea',
      readOnly: false,
      value: subjectById?.description || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Star (max 5)',
      name: 'star',
      type: 'number',
      readOnly: false,
      value: subjectById?.star || '',
      canUpdate: true,
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(resetDataReview());
    };
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div>
        <div className="flex justify-between">
          <h2 className="font-medium">Manage Review</h2>
          <FontAwesomeIcon className="text-xl cursor-pointer" icon={faXmark} onClick={onCancel} />
        </div>
        <p className="text-sm underline">Click update to see Review description</p>
        <div className="mt-2 px-3 py-[6px] border-[1px] rounded-2xl w-fit cursor-pointer hover:bg-[#a27cff63] transition-all" onClick={() => setIsCreate(true)}>
          <span className="mr-1 text-base">Add Review</span>
          <FontAwesomeIcon className="text-xs" icon={faPlus} onClick={() => {}} />
        </div>

        <div className={cx('min-h-full flex-1')}>
          <Table
            columnNotShow={['slug', 'description', 'createdAt']}
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
        </div>

        {(idEdit || isCreate) && (
          <PopupEditOrAddV1
            title={isCreate ? 'Add Review' : 'Update Review'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
              setIsCreate(false);
            }}
            id={idEdit}
            onSubmitCreate={(data, dispatch) => {
              if (idCruise) data.cruiseId = idCruise;
              if (idTour) data.tourId = idTour;
              handleCreateReview(data, dispatch);
            }}
            onSubmit={handleUpdateReview}
            position={'fixed'}
            maxWidth={'60%'}
            handleUpLoadFiles={(file) => upLoadFiles('image', file, true)}
          />
        )}
      </div>
    </div>
  );
}
