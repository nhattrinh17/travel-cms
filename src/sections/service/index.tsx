'use client';

import { HeaderContent } from '@/components/HeaderContent';
import { setLimitOrPageAccompaniedService } from '@/lib/redux/app/accompaniedService.slice';
import { setLimitOrPageSpecialOffer } from '@/lib/redux/app/specialOffer.slice';
import { upLoadOneFile } from '@/share/upLoadFile';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { handleCreateAccompaniedService, handleCreateSpecialService, handleUpdateAccompaniedService, handleUpdateSpecialService, useAccompaniedService, useSpecialOffer } from '@/utils/handleService';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export function ServiceSection(): JSX.Element {
  const [category, setCategory] = useState('offer');
  const [showCreate, setShowCreate] = useState(false);
  const [idEdit, setIdEdit] = useState('');
  const { data, pagination } = useSpecialOffer();
  const { data: dataAccompaniedService, pagination: paginationAccompaniedService } = useAccompaniedService();
  const dispatch = useDispatch();
  const specialOfferById = data.find((i) => i.id == +idEdit);
  const accompaniedServiceById = dataAccompaniedService.find((i) => i.id == +idEdit);

  const setPageOffer = (page: number) => {
    dispatch(setLimitOrPageSpecialOffer({ page }));
  };

  const setPageAccompanied = (page: number) => {
    dispatch(setLimitOrPageAccompaniedService({ page }));
  };

  const specialDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Tên',
      name: 'name',
      readOnly: false,
      type: 'text',
      value: specialOfferById?.name || '',
      canUpdate: true,
    },
    {
      label: 'Nội dung',
      name: 'content',
      readOnly: false,
      type: 'editor',
      value: specialOfferById?.content || '',
      canUpdate: true,
    },
  ];

  const accompaniedDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Tên',
      name: 'name',
      readOnly: false,
      type: 'text',
      value: accompaniedServiceById?.name || '',
      canUpdate: true,
    },
    {
      label: 'slug(mã icon)',
      name: 'slug',
      readOnly: false,
      type: 'text',
      value: accompaniedServiceById?.slug || '',
      canUpdate: true,
    },
  ];

  return (
    <div className="h-full">
      <HeaderContent path="service" title="Manage offer & service" />
      <div className="p-5 h-full">
        <div className="mb-3 flex items-end">
          <div className="mr-3">
            <h3 className="mb-2">Category</h3>
            <select
              //
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block px-5 py-1 rounded-md border-[1px] border-[#ccc] outline-none">
              <option value={'offer'}>Offer</option>
              <option value={'service'}>Service</option>
            </select>
          </div>
          <div className="mt-2 px-3 h-fit bg-white flex items-center py-1 border-[1px] border-[#ccc] rounded-lg w-fit cursor-pointer hover:bg-[var(--primary-bg)] transition-all" onClick={() => setShowCreate(true)}>
            <span className="mr-1 text-base">{category == 'offer' ? 'Add Offer' : 'Add Service'}</span>
            <FontAwesomeIcon className="text-xs" icon={faPlus} />
          </div>
        </div>
        <div className=" flex-1">
          <div>
            {category == 'offer' ? (
              <Table
                textColor="black"
                data={data}
                columnDelete={false}
                columnEdit
                handleDelete={(id) => {}}
                handleEdit={(id) => {
                  setIdEdit(String(id));
                }}
              />
            ) : (
              <Table
                textColor="black"
                data={dataAccompaniedService}
                columnDelete={false}
                columnEdit
                handleDelete={(id) => {}}
                handleEdit={(id) => {
                  setIdEdit(String(id));
                }}
              />
            )}
            <div>{category == 'offer' ? <Pagination count={pagination.total} page={pagination.page} limit={pagination.limit} setPage={setPageOffer} /> : <Pagination count={paginationAccompaniedService.total} page={paginationAccompaniedService.page} limit={paginationAccompaniedService.limit} setPage={setPageAccompanied} />}</div>
          </div>
          {showCreate || idEdit ? (
            <PopupEditOrAddV1
              title={showCreate ? 'Thêm mới' : 'Cập nhật thông tin'}
              id={+idEdit}
              data={category == 'offer' ? specialDto : accompaniedDto}
              onCancel={() => setShowCreate(false)}
              onSubmit={(id, data, dispatch) => {
                category == 'offer' ? handleUpdateSpecialService(id, data, dispatch) : handleUpdateAccompaniedService(id, data, dispatch);
                setIdEdit('');
              }}
              onSubmitCreate={category == 'offer' ? handleCreateSpecialService : handleCreateAccompaniedService}
              maxWidth={'60%'}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
